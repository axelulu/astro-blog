interface StrokeTextProps {
  children: React.ReactNode
  className?: string
}

export default function StrokeText({ children, className }: StrokeTextProps): React.ReactElement {
  return (
    <span className={`font-bold dark:stroke-text-[#73706E] stroke-text-[#A6A6A6] ${className}`}>
      {children}
    </span>
  )
}
