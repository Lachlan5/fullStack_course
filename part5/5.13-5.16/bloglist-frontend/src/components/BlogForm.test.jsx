/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('<BlogForm /> calls event handler with right details', async () => {
  const createBlog = vi.fn()
  const notiMock = vi.fn()
  const notiTypeMock = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} setNotificationMessage={notiMock} setNotificationType={notiTypeMock} />)

  const title = screen.getByPlaceholderText('enter title')
  const author = screen.getByPlaceholderText('enter author')
  const url = screen.getByPlaceholderText('enter url')
  const save = screen.getByText('create')

  await user.type(title, 'test title')
  await user.type(author, 'test author')
  await user.type(url, 'test url')
  await user.click(save)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})