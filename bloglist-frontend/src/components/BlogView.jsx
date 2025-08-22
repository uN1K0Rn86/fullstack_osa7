import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { likeBlog } from "../reducers/blogReducer"

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
        <Link to='/'>Front page</Link>
      </div>
    </div>
  )
}

export default BlogView
