import React, { useState } from 'react'
import blogService from '../services/blogs'
import notifyWith from '../utils/notifyWith'

const Blog = ({ blog, blogs, setBlogs, setNotification, user }) => {
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

  const handleRemove = () => {
    if (window.confirm(`Delete '${blog.title}' ?`)) {
      blogService.deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
          notifyWith(
            `'${blog.title}' removed`,
            'removeNotification',
            setNotification
          )
        }).catch(() => notifyWith(
          `'${blog.title}' can't be deleted`,
          'error',
          setNotification
        ))
    }
  }

  return (
    <div className="blog">
      {!visible ?
        (
          <div>
            <strong>{blog.title}</strong><span> - {blog.author}</span>
            <button className='viewButton' onClick={() => setVisible(true)}>View</button>
          </div>
        ) :
        (
          <div id={blog.id}>
            <div>
              <strong>{blog.title}</strong>
              <span> - {blog.author}</span>
              <button className='hideButton' onClick={() => setVisible(false)}>Hide</button>
            </div>
            
            <div>URL: {blog.url}</div>
            <div className='likes'>
              Likes: {likes - 1}
              <button className='likeButton' onClick={handleLikes}>Like</button>
            </div>
            <div>{blog.user.username}</div>
            {(user.username === blog.user.username) ?
              (
                <div>
                  <button className='removeButton' onClick={handleRemove}>Remove</button>
                </div>
              ) : ''
            }

          </div>
        )}
    </div>
  )
}
export default Blog
