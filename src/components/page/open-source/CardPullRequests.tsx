import { z } from 'astro/zod'
import React, { useEffect, useState } from 'react'
import { GitHubLogoIcon, Link1Icon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
import { Skeleton } from '@/components/ui/skeleton'

const SProps = z.object({
  className: z.string().optional(),
  repository: z.string().url(),
  author: z.string(),
  pageSize: z.number().default(10).optional(),
})
const SPullRequest = SProps.extend({})
const SPullRequestItem = z.object({
  title: z.string(),
  url: z.string().url(),
  number: z.number(),
  mergedAt: z.string().optional(),

})

type IProps = z.infer<typeof SProps>
type IPullRequest = z.infer<typeof SPullRequest>
type IPullRequestItem = z.infer<typeof SPullRequestItem>

const CardPullRequests: React.FC<IProps> = ({ repository, author, pageSize = 10, className }) => {
  const repositoryPath = repository.split('/').slice(-2).join('/')
  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <h3 className="text-base">
          {repositoryPath}
        </h3>
        <a href={repository} target="_blank" rel="noreferrer">
          <GitHubLogoIcon />
        </a>
      </div>
      <ListPullRequests repository={repository} author={author} pageSize={pageSize} />
    </div>
  )
}

export default CardPullRequests

function ListPullRequests(props: IPullRequest): React.ReactElement {
  const [loading, setLoading] = useState<boolean>(true)
  const [pullRequests, setPullRequests] = useState<IPullRequestItem[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const repositoryPath = props.repository.split('/').slice(-2).join('/')
    const url = `https://api.github.com/search/issues?q=repo:${repositoryPath}+author:${props.author}+is:merged&per_page=${props.pageSize}&page=1`

    const fetchPullRequests = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }
        const data = await response.json()
        const newPullRequests = data.items.map((item: any) => ({
          title: item.title,
          url: item.html_url,
          number: item.number,
          mergedAt: item?.pull_request?.merged_at,
        }))
        setPullRequests(newPullRequests)
      }
      catch (error) {
        setError((error as Error).message)
      }
      finally {
        setLoading(false)
      }
    }

    fetchPullRequests()
  }, [props.repository, props.author, props.pageSize])
  return (
    <div>
      {loading
      && (
        <div>
          <Skeleton className="h-4 mt-2" />
          <Skeleton className="h-4 mt-2" />
        </div>
      )}

      {error && (
        <div>
          Error:
          {error}
        </div>
      )}
      {pullRequests.map(pullRequest => (
        <div key={pullRequest.url} className="p-2">
          <a href={pullRequest.url} target="_blank" rel="noreferrer" className="text-sm flex items-center space-x-1">
            <span>
              {pullRequest.title}
            </span>
            {' '}
            <Link1Icon />
            {' '}
          </a>
          {' '}

          <div className="flex space-x-2 text-xs text-slate-500">
            <div>
              #
              {pullRequest.number}
            </div>
            <span className="text-[var(--fgColor-done)]">
              Merged on
              {' '}
              {dayjs(pullRequest.mergedAt).format('YYYY-MM-DD')}
            </span>
          </div>

        </div>
      ))}
      <div className="ml-2">
        count:
        {' '}
        {pullRequests.length}
      </div>
    </div>
  )
}
