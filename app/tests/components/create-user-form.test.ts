// @vitest-environment nuxt

import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CreateUsersForm from '~/components/create-user-form.vue'

const mockVBtn = {
  name: 'VBtn',
  template: '<button @click="$emit(\'click\')"><slot></slot></button>'
}

describe('CreateUserForm', async () => {

  it('renders', async () => {
    const component = await mountSuspended(CreateUsersForm, {
      global: {
        stubs: {
          'v-btn': mockVBtn
        }
      }
    })
    const html = component.html()
    expect(html).toContain('Create')
    expect(html).toContain('Email')
    expect(html).toContain('User name')
  })
})