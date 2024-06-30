import Togglable from "./Togglable"

const Blog = ({ blog, handleLike, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const like = () => {
    const newBlogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    handleLike(newBlogObject)
  }

  const remove = () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    const id = blog.id
    handleRemove(id)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="show" buttonCloseLabel="hide">
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={like}>like</button></div>
        <div>{blog.user[0].name || blog.user[0].username}</div>
        <button onClick={remove}>remove</button>
      </Togglable>
    </div>
  )
    
}

export default Blog