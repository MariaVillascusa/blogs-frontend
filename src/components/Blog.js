import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes + 1)

  const handleLikes = () => {
    setLikes(likes + 1)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes
    }
    blogService.update(blog.id, updatedBlog)
  }

  return (
    <div className="blog">
      {!visible ?
        (
          <div>
            <strong>{blog.title}</strong>
            <button className='viewButton' onClick={() => setVisible(true)}>View</button>
          </div>
        ) :
        (
          <div id={blog.id}>
            <div>
              <strong>{blog.title}</strong>
              <button className='hideButton' onClick={() => setVisible(false)}>Hide</button>
            </div>
            <div>Author: {blog.author}</div>
            <div>URL: {blog.url}</div>
            <div className='likes'>
              Likes: {likes - 1}
              <button className='likeButton' onClick={handleLikes}>Like</button>
            </div>
          </div>
        )}
    </div>
  )
}
export default Blog
