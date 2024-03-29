// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import LogoutForm from '~/components/logout-form.vue'

const mockVBtn = {
  name: 'VBtn',
  template: '<button @click="$emit(\'click\')"><slot></slot></button>'
}

mockNuxtImport("useUserStore", () => {
  return () => ({
    user: {
      email: "test@email.com",
    }
  })
})
describe('LogoutForm', async () => {

  it('renders', async () => {
    const component = await mountSuspended(LogoutForm, {
      global: {
        stubs: {
          'v-btn': mockVBtn
        }
      }
    })
    const html = component.html()
    expect(html).toContain('test@email.com')
    expect(html).toContain('(you)')
    expect(html).toContain('Logout')
  })
})