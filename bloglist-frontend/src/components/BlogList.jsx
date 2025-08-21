import { useDispatch, useSelector } from "react-redux"
import Blog from "./Blog"
import PropTypes from "prop-types"
import { useEffect } from "react"
import { initializeBlogs } from "../reducers/blogReducer"

const BlogList = ({ like, username, remove }) => {
  const blogs = useSelector(state => state.blogs)

  const columnStyle = {
    minWidth: "250px",
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={columnStyle}>Info</th>
            <th>Author</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} like={like} username={username} remove={remove} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

BlogList.propTypes = {
  like: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
}

export default BlogList
