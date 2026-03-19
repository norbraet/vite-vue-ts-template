import { ref, nextTick, type Ref } from 'vue'
import {
  type PositioningHorizontal,
  type PositioningOptions,
  type PositioningVertical,
} from '@/shared/types/positioning'

export function useFloatingPosition(
  triggerRef: Ref<HTMLElement | null>,
  floatingRef: Ref<HTMLElement | null>,
  isOpen: Ref<boolean>,
  options: PositioningOptions = {}
) {
  const { offset = 8, preferredHorizontal = 'left', preferredVertical = 'down' } = options
  const horizontal = ref<PositioningHorizontal>(preferredHorizontal)
  const vertical = ref<PositioningVertical>(preferredVertical)

  async function updatePosition() {
    if (!isOpen.value) return

    await nextTick()
    await new Promise(requestAnimationFrame)

    const trigger = triggerRef.value
    const floating = floatingRef.value

    if (!trigger || !floating) return

    const triggerRect = trigger.getBoundingClientRect()
    const floatingRect = floating.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const spaceRight = viewportWidth - triggerRect.right
    const spaceLeft = triggerRect.left
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top

    horizontal.value = spaceRight < floatingRect.width && spaceLeft > spaceRight ? 'right' : 'left'
    vertical.value = spaceBelow < floatingRect.height && spaceAbove > spaceBelow ? 'up' : 'down'
  }

  async function onOpen(): Promise<void> {
    updatePosition()
  }

  return {
    horizontal,
    vertical,
    updatePosition,
    onOpen,
    offset,
  }
}
