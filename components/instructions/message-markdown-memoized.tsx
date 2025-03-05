import { FC, memo } from "react"
import ReactMarkdown, { Options } from "react-markdown"

interface MessageMarkdownMemoizedProps extends Options {
  className?: string
}

export const MessageMarkdownMemoized: FC<MessageMarkdownMemoizedProps> = memo(
  function MessageMarkdownMemoized({ className, ...props }) {
    // Wrap react-markdown in a <div> so we can safely set className
    return (
      <div className={className}>
        <ReactMarkdown {...props} />
      </div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
