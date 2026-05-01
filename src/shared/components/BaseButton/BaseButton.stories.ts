import { ref } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Shared/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton variant="primary">Get started</BaseButton>',
  }),
}

export const Secondary: Story = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton>Cancel</BaseButton>',
  }),
}

export const DisabledPrimary: Story = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton variant="primary" :disabled="true">Unavailable</BaseButton>',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('button')).toBeDisabled()
  },
}

export const DisabledSecondary: Story = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton :disabled="true">Unavailable</BaseButton>',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('button')).toBeDisabled()
  },
}

export const AsLink: Story = {
  render: () => ({
    components: { BaseButton },
    template: '<BaseButton variant="primary" to="/guide">View guide</BaseButton>',
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole('link', { name: 'View guide' })).toBeInTheDocument()
  },
}

export const ClickInteraction: Story = {
  render: () => ({
    components: { BaseButton },
    setup() {
      const clicked = ref(false)
      const handleClick = () => {
        clicked.value = true
      }
      return { clicked, handleClick }
    },
    template: `<BaseButton variant="primary" @click="handleClick">{{ clicked ? 'Clicked!' : 'Click me' }}</BaseButton>`,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)
    expect(canvas.getByRole('button', { name: 'Clicked!' })).toBeInTheDocument()
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; padding: 1rem;">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="primary" :disabled="true">Disabled primary</BaseButton>
        <BaseButton variant="secondary" :disabled="true">Disabled secondary</BaseButton>
        <BaseButton variant="primary" to="/guide">Link (primary)</BaseButton>
      </div>
    `,
  }),
}
