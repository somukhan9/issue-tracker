import { Button } from '@radix-ui/themes'
import Link from 'next/link'

export default async function IssuesPage() {
  const response = await fetch('http://localhost:3000/api/issues', {
    method: 'GET',
  })
  const { issues } = await response.json()

  console.log(issues)

  return (
    <section>
      <Button>
        <Link href="/issues/create">Create Issue</Link>
      </Button>
      {issues.map((issue: any) => (
        <p key={issue.id}>{issue.title}</p>
      ))}
    </section>
  )
}
