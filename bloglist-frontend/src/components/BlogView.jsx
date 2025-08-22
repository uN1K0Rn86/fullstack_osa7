import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { likeBlog, commentBlog } from "../reducers/blogReducer"

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const handleLike = () => {
    const likedBlog = { ...blog }
    likedBlog.likes = blog.likes + 1
    dispatch(likeBlog(likedBlog))
  }

  const handleAddComment = event => {
    event.preventDefault()
    const text = event.target.comment.value
    dispatch(commentBlog(blog.id, text))
    event.target.comment.value = ""
  }

  const formstyle = {
    display: "flex",
    gap: "10px",
  }

  if (!blog) return <div>Loading...</div>

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes
        <button type='submit' onClick={handleLike} style={{ marginLeft: "8px" }}>
          Like
        </button>
      </div>
      {blog.user && <div>Added by {blog.user.username}</div>}
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment} style={formstyle}>
          <input type='text' name='comment'></input>
          <button type='submit'>Comment</button>
        </form>
        <ul>
          {blog.comments.map(c => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <Link to='/'>Front page</Link>
      </div>
    </div>
  )
}

export default BlogView
