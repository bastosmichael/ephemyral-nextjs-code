"use server"

import { auth } from "@clerk/nextjs/server"
import { Octokit } from "@octokit/rest"

const IS_SIMPLE_MODE = process.env.NEXT_PUBLIC_APP_MODE === "simple"
const SIMPLE_USER_ID = "simple_user_1"

export async function getUserId() {
  if (IS_SIMPLE_MODE) {
    return SIMPLE_USER_ID
  }

  const { userId } = auth()

  if (!userId) {
    throw new Error("User not authenticated")
  }

  return userId
}

export async function getGitHubToken() {
  if (IS_SIMPLE_MODE) {
    return process.env.GITHUB_PAT
  }

  const { getToken } = auth()
  const token = await getToken({ template: "github" })

  if (!token) {
    throw new Error("GitHub token not found")
  }

  return token
}

export async function getGitHubClient() {
  const token = await getGitHubToken()
  return new Octokit({ auth: token })
}
