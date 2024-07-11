import { addVote } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from "react-redux"
import { notificationChange, notificationReset } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = async (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(notificationChange(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(notificationReset())
    }, 5000);

  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList