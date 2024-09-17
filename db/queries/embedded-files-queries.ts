"use server"

import { getUserId } from "@/actions/auth/auth"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../db"
import {
  InsertEmbeddedFile,
  embeddedFilesTable
} from "../schema/embedded-files-schema"

export async function createEmbeddedFiles(
  data: Omit<InsertEmbeddedFile, "userId">[]
) {
  const userId = await getUserId()

  try {
    const batchSize = 100 // Adjust this value based on your database limits
    const results = []

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)
      const result = await db.insert(embeddedFilesTable).values(
        batch.map(file => ({
          ...file,
          userId
        }))
      )
      results.push(result)
    }

    revalidatePath("/")
    return results.flat()
  } catch (error) {
    console.error("Error inserting records into embedded_files:", error)
    throw error
  }
}

export async function deleteAllEmbeddedFilesByEmbeddedBranchId(
  embeddedBranchId: string
) {
  try {
    await db
      .delete(embeddedFilesTable)
      .where(eq(embeddedFilesTable.embeddedBranchId, embeddedBranchId))
    revalidatePath("/")
  } catch (error) {
    console.error("Error deleting records from embedded_files:", error)
    throw error
  }
}
