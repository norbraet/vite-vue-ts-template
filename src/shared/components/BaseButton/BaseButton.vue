<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink, type RouteLocationRaw } from 'vue-router'
  import './BaseButton.tokens.css'

  defineOptions({ inheritAttrs: false })

  const props = withDefaults(
    defineProps<{
      variant?: 'primary' | 'secondary'
      to?: RouteLocationRaw
      disabled?: boolean
    }>(),
    { variant: 'secondary' }
  )

  const isLink = computed(() => props.to !== undefined)
  const tag = computed(() => (isLink.value ? RouterLink : 'button'))
</script>

<template>
  <component
    :is="tag"
    class="base-button"
    :class="`variant-${variant}`"
    :to="to"
    :type="isLink ? undefined : 'button'"
    :disabled="isLink ? undefined : disabled"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style scoped>
  .base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--button-gap);
    min-height: var(--button-height);
    padding: var(--button-padding-y) var(--button-padding-x);
    border-radius: var(--button-radius);
    font-size: var(--button-font-size);
    font-weight: var(--button-font-weight);
    letter-spacing: inherit;
    line-height: var(--text-line-none);
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color var(--button-transition-duration) var(--button-transition-easing),
      color var(--button-transition-duration) var(--button-transition-easing),
      border-color var(--button-transition-duration) var(--button-transition-easing),
      opacity var(--button-transition-duration) var(--button-transition-easing);
  }

  .base-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .variant-primary {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
    border: var(--border-width-thin) solid transparent;
  }

  .variant-primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  .variant-primary:active:not(:disabled) {
    background-color: var(--color-primary-active);
  }

  .variant-secondary {
    background-color: transparent;
    color: var(--color-text);
    border: var(--border-width-thin) solid var(--color-border);
  }

  .variant-secondary:hover:not(:disabled) {
    background-color: var(--color-bg-subtle);
    border-color: var(--color-border-strong);
  }

  .variant-secondary:active:not(:disabled) {
    background-color: var(--color-bg-muted);
  }
</style>
