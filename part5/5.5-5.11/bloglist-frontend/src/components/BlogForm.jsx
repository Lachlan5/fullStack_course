import { useState } from "react"

const BlogForm = ({ createBlog, setNotificationMessage, setNotificationType }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNotificationMessage(`a new blog ${newTitle} by ${newAuthor} added`)
    setNotificationType('alert')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:<input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        author:<input
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <div>
          url:<input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm