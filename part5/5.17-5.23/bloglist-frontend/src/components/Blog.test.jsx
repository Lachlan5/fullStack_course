/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  const user = [
    {
      name: 'test user',
      username: 'test username'
    }
  ]
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 2,
    user,
  }

  let container

  const handleLike = (e) => {
    return
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLike={handleLike} />
    ).container
  })

  test('title displayed', () => {
    const p = container.querySelector('.title')
    expect(p).not.toHaveStyle('display: none')
  })

  test('author displayed', () => {
    const p = container.querySelector('.author')
    expect(p).not.toHaveStyle('display: none')
  })

  test('url not displayed', () => {
    const div = container.querySelector('.togglable')
    expect(div).toHaveStyle('display: none')
  })

  test('url displayed when "show" is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.url')
    expect(div).toBeDefined()
  })

  test('likes displayed when "show" is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.likes')
    expect(div).toBeDefined()
  })
})

test('clicking "like" twice causes two event submissions', async () => {
  const user = [
    {
      name: 'test user',
      username: 'test username'
    }
  ]
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 2,
    user,
  }

  const mockHandler = vi.fn()
  const userBot = userEvent.setup()

  render(<Blog blog={blog} handleLike={mockHandler} />)
  const showButton = screen.getByText('show')
  await userBot.click(showButton)

  const likeButton = screen.getByText('like')
  await userBot.click(likeButton)
  await userBot.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})