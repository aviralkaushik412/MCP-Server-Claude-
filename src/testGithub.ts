import { summarizePullRequest } from "./tools/pullRequest"

async function test() {
  const res = await summarizePullRequest("facebook", "react", 1)
  console.log(res)
}

test()