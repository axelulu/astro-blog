import React from 'react'
import { SIGNATURE_QUENTIN_HSU } from '@/constants/svg'

function SVGSignature(): React.ReactElement {
  return (
    <div className="flex justify-center items-center mx-auto h-[90px] w-full">
      <svg className="w-full h-full" viewBox="0 0 950 300" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <path
          d={SIGNATURE_QUENTIN_HSU}
          stroke="currentColor"
          strokeWidth="2"
          style={{
            strokeDasharray: '2400',
            strokeDashoffset: '2400',
          }}
          className="fill-transparent animate-draw-signature"
        />
      </svg>
    </div>
  )
}

export default SVGSignature
