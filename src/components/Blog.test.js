import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done',
    author: 'Test',
    url: 'http://test.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done')
  expect(div).toHaveTextContent('Test')
  expect(div).not.toHaveTextContent('http://test.com')
  expect(div).not.toHaveTextContent(0)
})