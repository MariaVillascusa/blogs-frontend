import React from 'react'

const blogForm = ({ addBlog }) => (
  <form onSubmit={addBlog} className="blogForm">
    <h3>Create a blog</h3>
    <div>
      <div className="label">Title</div>
      <input type="text" name="title" className="title" />
    </div>
    <div>
      <div className="label">Author</div>
      <input type="text" name="author" className="author" />
    </div>
    <div>
      <div className="label">URL</div>
      <input type="text" name="url" className="url" />
    </div>
    <button type="submit" className="create-btn">Create</button>
  </form>)

export default blogForm