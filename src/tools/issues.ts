import { getIssues } from "../services/githubService"

export async function listOpenIssues(owner: string, repo: string) {

  const issues = await getIssues(owner, repo)

  return issues.slice(0, 5).map((issue: any) => ({
    title: issue.title,
    url: issue.html_url,
    state: issue.state
  }))
}