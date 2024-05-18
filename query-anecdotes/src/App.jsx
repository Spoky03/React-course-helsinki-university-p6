import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, updateAnecdote } from './requests' 
import { useContext } from 'react'
import  MessageContext  from './messageContext'

const App = () => {
  
  const [message, dispatchMessage] = useContext(MessageContext)

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(updatedAnecdote)
  }

  const queryClient = useQueryClient()

  const anecdotesQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      dispatchMessage({ type: 'SET', data: `you voted '${updatedAnecdote.content}'` })
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  console.log(JSON.parse(JSON.stringify(anecdotesQuery)))

  if (anecdotesQuery.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = anecdotesQuery.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {anecdotesQuery.isError ?
        <div>error fetching data</div>
        :
        <>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </>
      }
    </div>
  )
}

export default App
