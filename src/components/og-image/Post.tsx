import dayjs from 'dayjs'
import type React from 'react'

interface Props {
  title: string
  description: string
  site: string
  createdTime: Date
  author: string
}
export default function OGImagePost(props: Props): React.ReactElement {
  const { title, description, site, createdTime } = props
  return (
    <div className="w-full h-full p-3 dark:bg-grid-[#ddd] bg-grid-[#1c1c1c] bg-[hsl(var(--background))]">
      <div className="w-full h-full p-3 rounded-lg border-2 border-solid dark:border-[#ddd] border-[#1c1c1c] ">
        {/* header */}
        <div className="flex justify-between mb-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#ff5a5f] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffbd2e] rounded-full ml-1"></div>
            <div className="w-3 h-3 bg-[#27c93f] rounded-full ml-1"></div>
          </div>
          <div className="text-xs w-fit bg-[hsl(var(--background))] px-1 rounded-sm">
            {site}
          </div>
        </div>
        {/* body */}
        <div className="h-20">
          <h1 className="w-fit text-base bg-[hsl(var(--background))] px-1 rounded-sm">
            {title}
          </h1>
          <div className="text-xs mt-2 w-fit bg-[hsl(var(--background))] px-1 rounded-sm">
            {description}
          </div>
        </div>
        {/* footer */}
        <div>
          <div className="flex justify-between mt-2">
            <div className="text-xs w-fit bg-[hsl(var(--background))] px-1 rounded-sm">
              {dayjs(createdTime).format('YYYY-MM-DD')}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
