import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = newBlog => {
  return async dispatch => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(returnedBlog.data))
      dispatch(
        setNotification(
          `Blog '${returnedBlog.data.title}' by ${returnedBlog.data.author} successfully added.`,
          "success"
        )
      )
    } catch (exception) {
      let exceptionMessage = "Unable to add blog"
      if (exception.response.data) {
        exceptionMessage = exception.response.data.error || exceptionMessage
      }

      dispatch(setNotification(exceptionMessage, "error"))
    }
  }
}

export default blogSlice.reducer
