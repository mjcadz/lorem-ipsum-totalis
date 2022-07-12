import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from '../Button.vue'

describe('Button.vue', () => {
  it('should render', async () => {
    const wrapper = mount(Button, {
      props: { uid: 'test-button' },
      slots: { default: 'Button Text' },
    })
    expect(wrapper).toBeTruthy()
  })

  it('should render text', () => {
    const wrapper = mount(Button, {
      props: { uid: 'test-button' },
      slots: { default: 'Button Text' },
    })

    const button = wrapper.find('#test-button')
    expect(button.text()).toContain('Button Text')
  })
})
