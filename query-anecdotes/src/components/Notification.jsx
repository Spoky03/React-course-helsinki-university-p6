import { useContext } from 'react'
import  MessageContext  from '../messageContext'
import { useEffect } from 'react'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [message, dispatch] = useContext(MessageContext)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
    return () => clearTimeout(timer)
  }, [message, dispatch])

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
