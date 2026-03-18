import axios from "axios"
import { summarizeText } from "../services/aiService"
import dotenv from "dotenv"

dotenv.config()

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  }
})

export async function summarizePullRequest(
  owner: string,
  repo: string,
  pull_number: number
) {

  const res = await github.get(
    `/repos/${owner}/${repo}/pulls/${pull_number}`
  )

  const pr = res.data

  const text = `
Title: ${pr.title}

Description: ${pr.body}
`

  const summary = await summarizeText(text)

  return {
    title: pr.title,
    summary
  }
}