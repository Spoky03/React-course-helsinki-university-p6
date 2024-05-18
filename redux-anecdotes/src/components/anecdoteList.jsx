import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export const AnecdoteList = () => {

    const sortByVotesHelper = (a, b) => {return b.votes - a.votes}

      const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
          return state.anecdotes.map(anecdote => anecdote).sort(sortByVotesHelper)
        }
        else {
          return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).map(anecdote => anecdote).sort(sortByVotesHelper)
        }
      })
      const dispatch = useDispatch()

      const voteOn = (id) => {
          dispatch(voteAnecdote(id))
          dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`, 5))
          
        }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{ marginBottom: 16 }}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteOn(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
