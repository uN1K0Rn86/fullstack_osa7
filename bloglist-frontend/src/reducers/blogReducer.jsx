import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

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
    const response = await blogService.create(newBlog)
    dispatch(appendBlog(response.data))
  }
}

export default blogSlice.reducer
