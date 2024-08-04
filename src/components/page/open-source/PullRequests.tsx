import React from 'react'
import CardPullRequests from './CardPullRequests'
import OcticonGitMerge from '@/components/icon/OctionGitMerge'

export default function PullRequests(): React.ReactElement {
  return (
    <div className="w-full py-4">
      <div className="flex items-center">
        <OcticonGitMerge className="text-[var(--fgColor-done)] w-5" />
        <h2 className="text-xl ml-2">Pull Requests</h2>
      </div>
      <div className="p-2">
        <CardPullRequests className="mt-2" repository="https://github.com/Calcium-Ion/new-api" author="QuentinHsu" pageSize={50} />
        <CardPullRequests className="mt-4" repository="https://github.com/ccbikai/Sink" author="QuentinHsu" pageSize={50} />
        <CardPullRequests className="mt-4" repository="https://github.com/1Panel-dev/1Panel" author="QuentinHsu" pageSize={50} />
        <CardPullRequests className="mt-4" repository="https://github.com/Tencent/tdesign-mobile-vue" author="QuentinHsu" pageSize={50} />
        <CardPullRequests className="mt-4" repository="https://github.com/lobehub/lobe-chat" author="QuentinHsu" pageSize={50} />
      </div>
    </div>
  )
}
