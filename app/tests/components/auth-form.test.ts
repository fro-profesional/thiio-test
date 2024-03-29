// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AuthForm from '~/components/auth-form.vue'

describe('AuthForm', async () => {
  it('renders', async () => {
    const component = await mountSuspended(AuthForm)
    const html = component.html()
    expect(html).toContain('Welcome to "fro-thiio"')
    expect(html).toContain('Register or login with')
    expect(html).toContain('GitHub')
  })
})