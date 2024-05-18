import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import  MessageContext  from '../messageContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [message, dispatchMessage] = useContext(MessageContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => dispatchMessage({ type: 'SET', data: error.response.data.error })
  })


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
