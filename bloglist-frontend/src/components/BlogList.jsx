import { useSelector } from "react-redux"
import Blog from "./Blog"
import PropTypes from "prop-types"

const BlogList = ({ username }) => {
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
            <Blog key={blog.id} blog={blog} username={username} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

BlogList.propTypes = {
  username: PropTypes.string.isRequired,
}

export default BlogList
