import { expect, test } from '@playwright/test'

const SESSION_KEY = 'abl_travels_auth_session'
const CUSTOMER = {
  id: 'usr_b2c_2045',
  name: 'Tanvir Hossain',
  email: 'traveler@gmail.com',
  role: 'B2C',
  initials: 'TH',
  phone: '+880 1812-345678',
}

// Demo links and the details that belong to each (src/services/visaStatus.mock.js)
const FIXTURES = [
  { ref: 'demo-submitted', passport: 'A12345671', headline: 'Application Submitted' },
  { ref: 'demo-processing', passport: 'A12345672', headline: 'Under Process' },
  { ref: 'demo-approved', passport: 'A12345678', headline: 'Visa Approved' },
  { ref: 'demo-ready', passport: 'A12345674', headline: 'Ready for Pickup' },
  { ref: 'demo-collected', passport: 'A12345675', headline: 'Collected' },
  { ref: 'demo-docs', passport: 'A12345676', headline: 'Documents Required' },
  { ref: 'demo-on_hold', passport: 'A12345677', headline: 'On Hold' },
  { ref: 'demo-rejected', passport: 'A12345679', headline: 'Visa Rejected' },
]
const APPROVED = FIXTURES[2]

// The phone that goes with a fixture passport: A12345678 -> 1712345678
const phoneFor = (passport) => `17${passport.slice(1)}`

const signIn = (page) =>
  page.addInitScript(([key, value]) => localStorage.setItem(key, value), [SESSION_KEY, JSON.stringify(CUSTOMER)])

const openLink = async (page, ref) => {
  await signIn(page)
  await page.goto(`/visa-status/${ref}`)
  await expect(page.getByRole('heading', { name: 'Track Your Visa Status' })).toBeVisible()
  await expect(page.getByLabel('Passport Number')).toBeVisible()
}

const sendOtp = async (page, { passport, phone }) => {
  await page.getByLabel('Passport Number').fill(passport)
  await page.getByLabel('Phone Number').fill(phone)
  await page.getByRole('button', { name: 'Send OTP' }).click()
  await expect(page.getByText(/We have sent a 6-digit OTP/)).toBeVisible()
}

const checkStatus = async (page, otp = '123456') => {
  await page.keyboard.type(otp)
  await page.getByRole('button', { name: 'Check Visa Status' }).click()
}

const lookUp = async (page, fixture, otp) => {
  await sendOtp(page, { passport: fixture.passport, phone: phoneFor(fixture.passport) })
  await checkStatus(page, otp)
}

test.describe('login gate', () => {
  test('a logged-out visitor is sent to login and returns to the link afterwards', async ({ page }) => {
    await page.goto(`/visa-status/${APPROVED.ref}`)
    await expect(page).toHaveURL(/\/login\?next=%2Fvisa-status%2Fdemo-approved$/)

    await page.getByRole('button', { name: 'Login', exact: true }).click()
    await expect(page).toHaveURL(`/visa-status/${APPROVED.ref}`)
    await expect(page.getByLabel('Full Name')).toHaveValue(/\S+/)
  })

  for (const next of ['https://evil.example/phish', '//evil.example/phish', '/\\evil.example']) {
    test(`a ?next= that leaves the site is ignored: ${next}`, async ({ page }) => {
      await page.goto(`/login?next=${encodeURIComponent(next)}`)
      await page.getByRole('button', { name: 'Login', exact: true }).click()
      await expect(page).toHaveURL('/')
    })
  }

  test('the full name comes from the login and cannot be edited', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    const name = page.getByLabel('Full Name')
    await expect(name).toHaveValue(CUSTOMER.name)
    await expect(name).toHaveAttribute('readonly', '')
  })

  test('an unknown link shows a clear message and no form', async ({ page }) => {
    await signIn(page)
    await page.goto('/visa-status/not-a-real-link')
    await expect(page.getByRole('heading', { name: 'This link is not valid' })).toBeVisible()
    await expect(page.getByLabel('Passport Number')).toHaveCount(0)
  })
})

test.describe('hidden from the website', () => {
  for (const path of ['/', '/visa', '/contact']) {
    test(`${path} never links to the page`, async ({ page }) => {
      await signIn(page)
      await page.goto(path)
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('a[href*="visa-status"]')).toHaveCount(0)
    })
  }

  test('robots.txt keeps crawlers out and the page asks not to be indexed', async ({ page, request }) => {
    const robots = await request.get('/robots.txt')
    expect(await robots.text()).toContain('Disallow: /visa-status/')

    await openLink(page, APPROVED.ref)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow')
    await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer')

    await page.getByRole('link', { name: 'Home' }).first().click()
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0)
  })
})

test.describe('lookup form', () => {
  test('step 2 is locked and Send OTP is off until the details are valid', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await expect(page.getByRole('button', { name: 'Send OTP' })).toBeDisabled()
    await expect(page.getByLabel('Digit 1 of 6')).toBeDisabled()
    await expect(page.getByRole('button', { name: 'Check Visa Status' })).toBeDisabled()

    await page.getByLabel('Passport Number').fill('zz')
    await page.getByLabel('Passport Number').blur()
    await expect(page.getByText('Passport numbers have 6 to 9 letters and digits.')).toBeVisible()

    await page.getByLabel('Passport Number').fill(APPROVED.passport)
    await page.getByLabel('Phone Number').fill('12345')
    await page.getByLabel('Phone Number').blur()
    await expect(page.getByText('Enter a valid phone number for the selected country.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Send OTP' })).toBeDisabled()

    await page.getByLabel('Phone Number').fill('01712345678')
    await expect(page.getByRole('button', { name: 'Send OTP' })).toBeEnabled()
  })

  test('the passport is shown in capitals', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await page.getByLabel('Passport Number').fill('a12345678')
    const transform = await page.getByLabel('Passport Number').evaluate((el) => getComputedStyle(el).textTransform)
    expect(transform).toBe('uppercase')
  })

  test('the country code can be changed', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await page.getByRole('button', { name: /Country code/ }).click()
    await page.getByRole('button', { name: 'China (+86)' }).click()
    await expect(page.getByRole('button', { name: /Country code, China/ })).toContainText('+86')
  })

  test('details that match no application are refused without saying which one is wrong', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await page.getByLabel('Passport Number').fill('Z99999999')
    await page.getByLabel('Phone Number').fill('01712345678')
    await page.getByRole('button', { name: 'Send OTP' }).click()
    await expect(page.getByRole('alert').filter({ hasText: "couldn't find an application" })).toBeVisible()
    await expect(page.getByLabel('Digit 1 of 6')).toBeDisabled()
  })

  test('the code timer counts down and Resend stays off until it ends', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    await expect(page.getByRole('button', { name: 'Resend OTP' })).toBeDisabled()
    await expect(page.getByText(/\(00:4\d\)/)).toBeVisible()
    await expect(page.getByLabel('Digit 1 of 6')).toBeFocused()
  })

  test('changing the phone after sending cancels the code', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    await page.getByLabel('Phone Number').fill('01712345600')
    await expect(page.getByLabel('Digit 1 of 6')).toBeDisabled()
    await expect(page.getByText(/We will send a 6-digit OTP/)).toBeVisible()
  })

  test('a pasted code fills every box', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })

    await page.getByLabel('Digit 1 of 6').evaluate((input) => {
      const data = new DataTransfer()
      data.setData('text', '123456')
      input.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }))
    })
    for (let index = 1; index <= 6; index += 1) {
      await expect(page.getByLabel(`Digit ${index} of 6`)).toHaveValue(String(index))
    }
    await expect(page.getByRole('button', { name: 'Check Visa Status' })).toBeEnabled()
  })

  test('backspace walks back through the boxes', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    await page.keyboard.type('12')
    await expect(page.getByLabel('Digit 3 of 6')).toBeFocused()
    await page.keyboard.press('Backspace')
    await expect(page.getByLabel('Digit 2 of 6')).toBeFocused()
    await expect(page.getByLabel('Digit 2 of 6')).toHaveValue('')
  })

  test('a wrong code is refused, the boxes clear, and the right code then works', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED, '111111')
    await expect(page.getByRole('alert').filter({ hasText: 'That code is incorrect' })).toBeVisible()
    await expect(page.getByLabel('Digit 1 of 6')).toHaveValue('')
    await expect(page.getByLabel('Digit 1 of 6')).toBeFocused()

    await checkStatus(page)
    await expect(page.getByRole('dialog', { name: 'Visa Status' })).toBeVisible()
  })

  test('an expired code asks for a new one and frees Resend', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED, '000000')
    await expect(page.getByRole('alert').filter({ hasText: 'That code has expired' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Resend OTP' })).toBeEnabled()
  })

  test('five wrong codes lock the form', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await checkStatus(page, '111111')
      if (attempt < 4) await expect(page.getByLabel('Digit 1 of 6')).toBeFocused()
    }
    await expect(page.getByRole('alert').filter({ hasText: 'Too many attempts' })).toContainText('15 minutes')
    await expect(page.getByRole('button', { name: 'Check Visa Status' })).toBeDisabled()
  })

  test('Enter in the code boxes checks the status', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    await page.keyboard.type('123456')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('dialog', { name: 'Visa Status' })).toBeVisible()
  })
})

test.describe('result', () => {
  test('shows the approved application the way the design does', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED)

    const dialog = page.getByRole('dialog', { name: 'Visa Status' })
    await expect(dialog.getByText('Visa Approved', { exact: true }).first()).toBeVisible()
    await expect(dialog.getByText('Md. Arif Hossain')).toBeVisible()
    await expect(dialog.getByText('ABL20250812001')).toBeVisible()
    await expect(dialog.getByText('China', { exact: true })).toBeVisible()

    const steps = dialog.getByRole('list', { name: 'Application timeline' }).getByRole('listitem')
    await expect(steps).toHaveCount(5)
    await expect(steps.nth(0)).toContainText('12 Aug 2025, 10:30 AM')
    await expect(steps.nth(2)).toContainText('20 Aug 2025, 11:15 AM')
    await expect(steps.nth(2)).toContainText('Completed')
    await expect(steps.nth(3)).toContainText('Pending')
    await expect(steps.nth(4)).toContainText('Pending')
  })

  for (const fixture of FIXTURES) {
    test(`renders the ${fixture.headline} state`, async ({ page }) => {
      await openLink(page, fixture.ref)
      await lookUp(page, fixture)

      const dialog = page.getByRole('dialog', { name: 'Visa Status' })
      await expect(dialog.getByRole('heading', { name: fixture.headline, level: 3 })).toBeVisible()
      await expect(dialog.getByText('Important Information')).toBeVisible()
    })
  }

  test('a rejected application ends the timeline at the rejection', async ({ page }) => {
    const rejected = FIXTURES.find((item) => item.ref === 'demo-rejected')
    await openLink(page, rejected.ref)
    await lookUp(page, rejected)

    const steps = page.getByRole('list', { name: 'Application timeline' }).getByRole('listitem')
    await expect(steps).toHaveCount(3)
    await expect(steps.last()).toContainText('Visa Rejected')
    await expect(steps.last()).toContainText('Stopped')
  })

  test('Escape closes the dialog and focus lands back on the form', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED)
    await expect(page.getByRole('dialog', { name: 'Visa Status' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(page.getByLabel('Passport Number')).toBeFocused()
    // The code was used up: the form is back at step 1
    await expect(page.getByLabel('Digit 1 of 6')).toBeDisabled()
  })

  test('Tab stays inside the dialog and the page behind cannot scroll', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED)
    const dialog = page.getByRole('dialog', { name: 'Visa Status' })
    await expect(dialog).toBeVisible()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')

    for (let press = 0; press < 6; press += 1) await page.keyboard.press('Tab')
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true)
    for (let press = 0; press < 6; press += 1) await page.keyboard.press('Shift+Tab')
    expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true)
  })

  test('the close button and a click outside both close it', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED)
    await page.getByRole('button', { name: 'Close' }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)

    await sendOtp(page, { passport: APPROVED.passport, phone: phoneFor(APPROVED.passport) })
    await checkStatus(page)
    await expect(page.getByRole('dialog', { name: 'Visa Status' })).toBeVisible()
    await page.mouse.click(5, 300)
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })

  test('Print and Download open the print dialog with a file name, and the paper version is clean', async ({ page }) => {
    await openLink(page, APPROVED.ref)
    await lookUp(page, APPROVED)
    await page.evaluate(() => {
      window.__printed = []
      window.print = () => window.__printed.push(document.title)
    })

    await page.getByRole('button', { name: 'Download Details' }).click()
    await page.getByRole('button', { name: 'Print' }).click()
    expect(await page.evaluate(() => window.__printed)).toEqual([
      'ABL-Visa-Status-ABL20250812001',
      'ABL-Visa-Status-ABL20250812001',
    ])
    await page.evaluate(() => window.dispatchEvent(new Event('afterprint')))
    expect(await page.title()).toBe('Track Your Visa Status | ABL Travels')

    const paper = page.locator('#printable-visa-status')
    await expect(paper).toBeHidden()
    await page.emulateMedia({ media: 'print' })
    await expect(paper).toBeVisible()
    await expect(paper).toContainText('Visa Status Report')
    await expect(paper).toContainText('Md. Arif Hossain')
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(page.getByRole('button', { name: 'Print' })).toBeHidden()
  })
})

test.describe('small screens', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('the form and the result fit a phone without sideways scrolling', async ({ page }) => {
    const fitsWidth = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)

    await openLink(page, APPROVED.ref)
    expect(await fitsWidth()).toBe(true)
    await lookUp(page, APPROVED)

    const dialog = page.getByRole('dialog', { name: 'Visa Status' })
    await expect(dialog).toBeVisible()
    expect(await fitsWidth()).toBe(true)
    await dialog.getByRole('button', { name: 'Download Details' }).scrollIntoViewIfNeeded()
    await expect(dialog.getByRole('button', { name: 'Download Details' })).toBeInViewport()
  })
})
