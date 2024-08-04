import React from 'react'

interface Props {
  className?: string
}
export default function OcticonGitMerge(
  { className = '' }: Props,
): React.ReactElement {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      version="1.1"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z">
      </path>
    </svg>
  )
}
