import { FC } from "react"

interface MessageProps {
  message: string
}
const Message: FC<MessageProps> = (props) => {
  return (
    <div >{props.message}</div>
  )
}

export default Message