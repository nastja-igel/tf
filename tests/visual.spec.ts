import { test, expect } from '@playwright/test'

/**
 * Visual regression tests.
 * Each story is rendered in an isolated iframe and compared to a stored
 * PNG snapshot. Failures mean something changed visually — review the diff
 * and either fix the bug or update the snapshot with --update-snapshots.
 */

// ── Helpers ───────────────────────────────────────────────────────────────

async function storyPage(page: import('@playwright/test').Page, storyId: string) {
  await page.goto(`/iframe.html?id=${storyId}&viewMode=story&globals=backgrounds.value:!hex(ffffff)`)
  // Wait for fonts and CSS transitions
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(300)
}

// ── Foundations ───────────────────────────────────────────────────────────

test.describe('Foundations — Icons', () => {
  test('gallery', async ({ page }) => {
    await storyPage(page, 'foundations-icons--gallery')
    await expect(page).toHaveScreenshot('icons-gallery.png', { fullPage: true })
  })

  test('sizes', async ({ page }) => {
    await storyPage(page, 'foundations-icons--sizes')
    await expect(page).toHaveScreenshot('icons-sizes.png')
  })

  test('colors', async ({ page }) => {
    await storyPage(page, 'foundations-icons--colors')
    await expect(page).toHaveScreenshot('icons-colors.png')
  })
})

test.describe('Foundations — Button', () => {
  test('all variants', async ({ page }) => {
    await storyPage(page, 'foundations-buttons-button--all-variants')
    await expect(page).toHaveScreenshot('button-all-variants.png')
  })

  test('all sizes', async ({ page }) => {
    await storyPage(page, 'foundations-buttons-button--all-sizes')
    await expect(page).toHaveScreenshot('button-all-sizes.png')
  })

  test('icon left', async ({ page }) => {
    await storyPage(page, 'foundations-buttons-button--icon-left')
    await expect(page).toHaveScreenshot('button-icon-left.png')
  })

  test('loading', async ({ page }) => {
    await storyPage(page, 'foundations-buttons-button--loading')
    await expect(page).toHaveScreenshot('button-loading.png')
  })
})

// ── Feedback ──────────────────────────────────────────────────────────────

test.describe('Feedback — StatusChip', () => {
  test('icon variants', async ({ page }) => {
    await storyPage(page, 'feedback-statuschip--all-icon-variants')
    await expect(page).toHaveScreenshot('statuschip-icons.png')
  })
})

test.describe('Feedback — AlertBanner', () => {
  test('all variants', async ({ page }) => {
    await storyPage(page, 'feedback-alertbanner--all-variants')
    await expect(page).toHaveScreenshot('alert-banner.png')
  })
})

// ── Table components ──────────────────────────────────────────────────────

test.describe('Table — ActionBtn', () => {
  test('row actions', async ({ page }) => {
    await storyPage(page, 'table-actionbtn--table-row-actions')
    await expect(page).toHaveScreenshot('actionbtn-row.png')
  })
})

// ── Navigation ────────────────────────────────────────────────────────────

test.describe('Navigation — NavItem', () => {
  test('active with count', async ({ page }) => {
    await storyPage(page, 'navigation-navitem--active-count')
    await expect(page).toHaveScreenshot('navitem-active.png')
  })
})

// ── Inputs ────────────────────────────────────────────────────────────────

test.describe('Inputs — Input', () => {
  test('all states', async ({ page }) => {
    await storyPage(page, 'inputs-input--all-states')
    await expect(page).toHaveScreenshot('input-states.png')
  })
})

// ── Pages ─────────────────────────────────────────────────────────────────

test.describe('Pages — Login', () => {
  test('default', async ({ page }) => {
    await page.goto('/iframe.html?id=pages-login--default&viewMode=story')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500) // extra wait for glassmorphic background
    await expect(page).toHaveScreenshot('page-login.png', { fullPage: true })
  })
})
