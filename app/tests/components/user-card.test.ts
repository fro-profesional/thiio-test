// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import UserCard from '~/components/user-card.vue'

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

describe('UserCard', async () => {

  it('renders', async () => {
    const component = await mountSuspended(UserCard, {
      global: {
        stubs: {
          'v-btn': mockVBtn
        }
      },
      props: {
        user: {
          id: 1,
          email: "test2@email.com",
          created_at: "2021-10-10T00:00:00",
        }
      }
    })
    const html = component.html()
    expect(html).toContain('Update')
    expect(html).toContain('Remove')
  })

  it('renders without delete button', async () => {
    const component = await mountSuspended(UserCard, {
      global: {
        stubs: {
          'v-btn': mockVBtn
        }
      },
      props: {
        user: {
          id: 1,
          email: "test@email.com",
          created_at: "2021-10-10T00:00:00",
        }
      }
    })
    const html = component.html()
    expect(html).toContain('Update')
    expect(html).not.toContain('Remove')
  })
})