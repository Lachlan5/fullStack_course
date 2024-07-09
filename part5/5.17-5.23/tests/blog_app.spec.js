const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset/all')
    await request.post('/api/users', {
      data: {
        name: 'test user',
        username: 'testUser',
        password: 'password'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'password')
      await expect(page.getByText('test user logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'wrong')
      await expect(page.getByText('test user logged-in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'test title', 'test author', 'test url')
      const alertDiv = await page.locator('.alert')
      await expect(alertDiv).toContainText('a new blog test title by test author added')
    })

    // test('blogs are arranged by likes', async ({ page }) => {
    //   for (let i = 0; i < 10; i++) {
    //     createBlog(page, `title ${i}`, `author ${i}`, `url ${i}`)
    //   }
    // })

    describe('and a blog exists', () => {
      beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset/blogs')
        createBlog(page, 'test title', 'test author', 'test url')
        await page.getByRole('button', { name: 'show' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        const likeP = await page.locator('.likes')
        await expect(likeP).toContainText('0')
        await page.getByRole('button', { name: 'like' }).click()
        await expect(likeP).toContainText('1')
      })

      test.only('blog can be deleted', async ({ page }) => {
        // page.once('dialog', dialog => dialog.accept())
        // await page.getByRole('button', { name: 'remove' }).click()
        // const alertDiv = await page.locator('.alert')
        // await expect(alertDiv).toContainText('Blog deleted')
        await page.getByRole('button', { name: 'hide' }).click()
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('test title')).not.toBeVisible()
      })

      test('blog delete button only displayed to origianl poster', async ({ page, request }) => {
        await request.post('/api/users', {
          data: {
            name: 'different user',
            username: 'differentUser',
            password: 'password'
          }
        })

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'differentUser', 'password')
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
  })

})
