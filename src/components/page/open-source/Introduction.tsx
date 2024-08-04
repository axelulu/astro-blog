import React from 'react'
import { classnames, lineHeight, padding, width } from 'tailwindcss-classnames'
import StrokeText from '@/components/text/StrokeText'

export default function Introduction(): React.ReactElement {
  const styleParagraph = classnames(
    width('w-full'),
    padding('pb-5', 'py-5'),
    lineHeight('leading-7'),
  )
  return (
    <div className="w-full pt-12">
      <div className="absolute flex justify-start items-center mb-5 mt-[-2rem] md:ml-[-3rem] ml-[-0.5rem]">
        <StrokeText className="text-8xl opacity-40">GitHub</StrokeText>
      </div>
      <div className="relative">
        <p className={styleParagraph}>
          🧑‍💻 我喜爱和感谢开源社区带来的一切，也在竭尽所能贡献自己的力量。并鼓励身边的朋友积极参加与贡献开源。
        </p>
      </div>
    </div>
  )
}
