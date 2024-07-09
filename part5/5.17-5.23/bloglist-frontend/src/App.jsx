import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(InitialBlogs => {
      InitialBlogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
      setBlogs(InitialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogsList = () => (
    <>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} currentUser={user.name} />
      )}
    </>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(e => {
        setNotificationMessage(`Error: ${e.response.data.error}. Blog not created.`)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const handleLike = (blogObject) => {
    blogService
      .addLike(blogObject)
      .then(returnedBlog => {
        blogService
          .getAll()
          .then(returnedBlogs => {
            returnedBlogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
            setBlogs(returnedBlogs)
          })
      })
      .catch(e => {
        setNotificationMessage(`Error: ${e.response.data.error}. Blog not updated.`)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const handleRemove = (blogId) => {
    blogService
      .remove(blogId)
      .then(res => {
        blogService
          .getAll()
          .then(returnedBlogs => {
            returnedBlogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
            setBlogs(returnedBlogs)
          })
        setNotificationMessage('Blog deleted')
        setNotificationType('alert')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(e => {
        setNotificationMessage(`Error: ${e.response.data.error}. Blog not deleted.`)
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogsList()}
        </div>
      }
    </div>
  )
}

export default App