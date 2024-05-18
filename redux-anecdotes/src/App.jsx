import { AnecdoteForm } from './components/anecdoteForm'
import { AnecdoteList } from './components/anecdoteList'
import { AnecdoteFilterName } from './components/AnecdoteFilterName'
import { Notification } from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
  

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilterName />
      <AnecdoteList />
      <AnecdoteForm  />
    </div>
  )
}

export default App