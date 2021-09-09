import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  return (
    <div className="blog">
      {!visible ?
        (
          <div>
            <strong>{blog.title}</strong>
            <button className='viewButton' onClick={() => setVisible(true)}>View</button>
          </div>) :
        (
          <div>
            <div>
              <strong>{blog.title}</strong>
              <button className='hideButton' onClick={() => setVisible(false)}>Hide</button>
            </div>
            <div>Author: {blog.author}</div>
            <div>URL: {blog.url}</div>
            <div className='likes'>
              Likes: {blog.likes}
              <button className='likeButton'>Like</button>
            </div>
          </div>
        )}
    </div>
  )
}
export default Blog
