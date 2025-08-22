const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: [
      {
        text: { type: String, required: true },
      },
    ],
    default: [],
  },
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.comments) {
      returnedObject.comments = returnedObject.comments.map((c) => {
        c.id = c._id.toString()
        delete c._id
        return c
      })
    }
  },
})

module.exports = mongoose.model("Blog", blogSchema)
