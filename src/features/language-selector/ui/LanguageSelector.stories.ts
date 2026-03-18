import { userEvent, within } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import LanguageSelector from './LanguageSelector.vue'

const meta = {
  title: 'Features/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
  },
}
