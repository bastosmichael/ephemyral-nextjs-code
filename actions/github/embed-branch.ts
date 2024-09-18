"use server"

import { fetchFiles } from "@/actions/github/fetch-files"
import {
  createEmbeddedFiles,
  deleteAllEmbeddedFilesByEmbeddedBranchId
} from "@/db/queries/embedded-files-queries"
import { embedFiles } from "./embed-files"
import { fetchCodebaseForBranch } from "./fetch-codebase"
import { tokenizeFiles } from "./tokenize-files"
import { sanitizeFileContent } from "@/lib/utils"
import {
  MAX_RETRY_ATTEMPTS,
  RETRY_DELAY
} from "@/lib/constants/ephemyral-code-config"

export async function embedBranch(data: {
  projectId: string
  githubRepoFullName: string
  branchName: string
  embeddedBranchId: string
  installationId: number | null
}) {
  const {
    projectId,
    githubRepoFullName,
    branchName,
    embeddedBranchId,
    installationId
  } = data

  try {
    // clear branch embeddings
    await deleteAllEmbeddedFilesByEmbeddedBranchId(embeddedBranchId)

    // fetch codebase for branch
    const codebase = await fetchCodebaseForBranch({
      githubRepoFullName,
      path: "",
      branch: branchName,
      installationId
    })

    // fetch file content
    const files = await fetchFiles(installationId, codebase)

    // tokenize files
    const tokenizedFiles = await tokenizeFiles(files)

    // sanitize and embed files
    const sanitizedFiles = tokenizedFiles.map(file => ({
      ...file,
      content: sanitizeFileContent(file.content)
    }))

    const embeddedFiles = await embedFiles(sanitizedFiles)

    // insert embedded files with data
    let retryCount = 0
    while (retryCount < MAX_RETRY_ATTEMPTS) {
      try {
        await createEmbeddedFiles(
          embeddedFiles.map(file => ({
            ...file,
            projectId,
            embeddedBranchId,
            githubRepoFullName
          }))
        )
        break
      } catch (error) {
        console.error(
          `Error inserting embedded files (attempt ${retryCount + 1}):`,
          error
        )
        retryCount++
        if (retryCount < MAX_RETRY_ATTEMPTS) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
        } else {
          throw error
        }
      }
    }
  } catch (error) {
    console.error("Error in embedBranch:", error)
    throw error
  }
}
