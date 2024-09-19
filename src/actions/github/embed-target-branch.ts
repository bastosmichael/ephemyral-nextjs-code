"use server"

import { embedBranch } from "@/actions/github/embed-branch"
import {
  createEmbeddedBranch,
  findEmbeddedBranch,
  updateEmbeddedBranchById
} from "@/db/queries/embedded-branches-queries"
import { getAuthenticatedOctokit } from "./auth"
import {
  MAX_RETRY_ATTEMPTS,
  RETRY_DELAY
} from "@/src/lib/constants/ephemyral-code-config"

interface EmbedTargetBranchParams {
  projectId: string
  githubRepoFullName: string
  branchName: string
  installationId: number | null
}

export async function embedTargetBranch({
  projectId,
  githubRepoFullName,
  branchName,
  installationId
}: EmbedTargetBranchParams) {
  try {
    const [owner, repo] = githubRepoFullName.split("/")
    const octokit = await getAuthenticatedOctokit(installationId)

    // Fetch the latest commit hash
    const { data: branchData } = await octokit.repos.getBranch({
      owner,
      repo,
      branch: branchName
    })
    const latestCommitHash = branchData.commit.sha

    let embeddedBranch = await findEmbeddedBranch({
      projectId,
      githubRepoFullName,
      branchName
    })

    if (!embeddedBranch) {
      embeddedBranch = await createEmbeddedBranch({
        projectId,
        githubRepoFullName,
        branchName,
        lastEmbeddedCommitHash: null
      })
    }

    // Check if the branch needs updating
    if (embeddedBranch.lastEmbeddedCommitHash !== latestCommitHash) {
      console.warn("Branch needs updating")

      let retryCount = 0
      while (retryCount < MAX_RETRY_ATTEMPTS) {
        try {
          await embedBranch({
            projectId,
            githubRepoFullName,
            branchName,
            embeddedBranchId: embeddedBranch.id,
            installationId
          })
          break
        } catch (error) {
          console.error(
            `Error embedding branch (attempt ${retryCount + 1}):`,
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

      await updateEmbeddedBranchById(embeddedBranch.id, {
        lastEmbeddedCommitHash: latestCommitHash
      })
    }

    return embeddedBranch
  } catch (error) {
    console.error("Error embedding target branch:", error)
    throw error
  }
}
