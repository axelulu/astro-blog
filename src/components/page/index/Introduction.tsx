import React from 'react'
import { classnames, lineHeight, margin, padding, width } from 'tailwindcss-classnames'
import SignatureQuentinHsu from '@/components/animata/signature/QuentinHsu.tsx'

export default function Introduction(): React.ReactElement {
  const styleParagraph = classnames(
    width('w-full'),
    padding('px-5'),
    lineHeight('leading-7'),
    margin('mb-4'),
  )
  return (
    <div className="w-full py-12">
      <div className="flex justify-start items-center mb-10">
        <span className="text-4xl animate-wave origin-wave">
          👋
        </span>
        <div className="md:px-4 px-2 text-4xl">
          I'm
        </div>
        <div className="flex justify-center items-center w-60">
          <SignatureQuentinHsu />
        </div>
      </div>
      <p className={styleParagraph}>
        🧑‍💻 I am a developer and an
        {' '}
        <a href="/open-source">open-source</a>
        {' '}
        enthusiast
        {' '}

        .
      </p>
      <p className={styleParagraph}>
        🕹️ I am primarily a web front-end developer, with a tech stack mainly focused on Vue. Of course, I also enjoy working with React. I am particularly fascinated by TypeScript, although I am still learning and practicing it. When it comes to code, I prefer explicit and controllable approaches, and dislike implicit and uncontrollable ones. I enjoy experimenting with new things and sharing my findings.
      </p>
      <p className={styleParagraph}>
        📍 Currently residing in Chengdu, Sichuan, and planning to move to other cities in the future, such as Guangzhou or Shenzhen, in order to seek better career prospects. Also, open to remote job opportunities.
      </p>
    </div>
  )
}
