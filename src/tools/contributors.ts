import { getContributors } from "../services/githubService"

export async function getRepoContributors(owner: string, repo: string) {

  const contributors = await getContributors(owner, repo)

  return contributors.slice(0, 5).map((c: any) => ({
    username: c.login,
    contributions: c.contributions
  }))
}