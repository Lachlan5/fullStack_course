const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes

  let likes = 0
  for (let blog of blogs) {
    likes += blog.likes
  }
  return likes
}

const favoriteBlog = (blogs) => {
  let topBlog = blogs[0]
  for (let blog of blogs) {
    if (blog.likes > topBlog.likes) topBlog = blog
  }

  return topBlog
}

const mostBlogs = (blogs) => {

  const authorList = blogs.map(blog => blog.author)
  const authorBlogs = new Map()
  for (let key of authorList) {
    authorBlogs.set(key, authorBlogs.has(key) ? authorBlogs.get(key) + 1 : 1)
  }

  let mostBlogs = 
  {
    author: blogs[0].author,
    blogs: 0,
  }

  for (let entry of authorBlogs) {
    if (entry[1] > mostBlogs.blogs)
      mostBlogs = 
        {
          author: entry[0], //map containing all author names as entry[0]
          blogs: entry[1],  //map containing all author blog count as entry[1]
        }
  }

  return mostBlogs
}

const mostLikes = (blogs) => {
  const authorLikes = new Map()
  for (let blog of blogs) {
    //if author in map add likes to total, else set likes to current blog element likes
    const key = blog.author
    authorLikes.set(key, authorLikes.has(key) ? authorLikes.get(key) + blog.likes : blog.likes)
  }

  let mostLikes = 
  {
    author: blogs[0].author,
    likes: 0,
  }

  for (let entry of authorLikes) {
    if (entry[1] > mostLikes.likes)
      mostLikes = 
        {
          author: entry[0], //map containing all author names as entry[0]
          likes: entry[1],  //map containing all author like total as entry[1]
        }
  }

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}