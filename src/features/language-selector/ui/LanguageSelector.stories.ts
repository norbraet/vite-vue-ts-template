import { userEvent, within, expect, waitFor } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LanguageSelector from './LanguageSelector.vue'

const meta = {
  title: 'Features/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSelector>

export default meta
type Story = StoryObj<typeof meta>

const positioned = (style: string) => ({
  decorators: [
    () => ({
      template: `<div style="${style}"><story /></div>`,
    }),
  ],
})

function expectInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect()

  expect(rect.left).toBeGreaterThanOrEqual(0)
  expect(rect.right).toBeLessThanOrEqual(window.innerWidth)
  expect(rect.top).toBeGreaterThanOrEqual(0)
  expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight)
}

async function openMenu(canvasElement: HTMLElement) {
  const canvas = within(canvasElement)

  const button = canvas.getByRole('button')
  await userEvent.click(button)

  const menu = await canvas.findByRole('listbox')

  return { canvas, button, menu }
}

export const Open: Story = {
  ...positioned(`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  `),
  play: async ({ canvasElement }) => {
    const { button, menu } = await openMenu(canvasElement)

    expect(menu).toHaveClass('is-down')
    expectInViewport(menu)

    // relative positioning check
    const btnRect = button.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()

    expect(menuRect.top).toBeGreaterThan(btnRect.bottom - 1)
  },
}

export const NearLeftEdge: Story = {
  ...positioned(`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 16px;
    height: 200px;
  `),
  play: async ({ canvasElement }) => {
    const { menu } = await openMenu(canvasElement)

    expect(menu).toHaveClass('is-left')
    expectInViewport(menu)

    const rect = menu.getBoundingClientRect()
    expect(rect.left).toBeGreaterThanOrEqual(0)
  },
}

export const NearRightEdge: Story = {
  ...positioned(`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 16px;
    height: 200px;
  `),
  play: async ({ canvasElement }) => {
    const { menu } = await openMenu(canvasElement)

    // wait for transition to finish
    await waitFor(() => {
      expect(menu).not.toHaveClass('menu-fade-enter-from')
      expect(menu).not.toHaveClass('menu-fade-enter-active')
    })

    expect(menu).toHaveClass('is-right')
    expectInViewport(menu)
  },
}

export const NearBottomEdge: Story = {
  ...positioned(`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 100cqh;
    padding: 16px;
  `),
  play: async ({ canvasElement }) => {
    const { button, menu } = await openMenu(canvasElement)

    // wait for transition to finish
    await waitFor(() => {
      expect(menu).not.toHaveClass('menu-fade-enter-from')
      expect(menu).not.toHaveClass('menu-fade-enter-active')
    })

    expect(menu).toHaveClass('is-up')
    expectInViewport(menu)

    const btnRect = button.getBoundingClientRect()
    const menuRect = menu.getBoundingClientRect()
    expect(menuRect.bottom).toBeLessThan(btnRect.top + 1)
  },
}
