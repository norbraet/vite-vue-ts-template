<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import {
    DEFAULT_LOCALE,
    LOCALE_META,
    SUPPORTED_LOCALES,
    isLocale,
    type Locale,
  } from '@/shared/i18n/config/locales'
  import { setStoredLocale } from '@/shared/i18n/lib/persistLocale'
  import { useFloatingPosition } from '@/shared/composables/useFloatingPosition'

  const { t, locale } = useI18n()

  const rootRef = ref<HTMLElement | null>(null)
  const menuRef = ref<HTMLElement | null>(null)
  const isOpen = ref(false)

  const { horizontal, vertical, onOpen, updatePosition } = useFloatingPosition(
    rootRef,
    menuRef,
    isOpen
  )

  const localeOptions = SUPPORTED_LOCALES.map((code) => ({
    code,
    ...LOCALE_META[code],
  }))

  const currentLocale = computed<Locale>(() => {
    const value = locale.value
    return isLocale(value) ? value : DEFAULT_LOCALE
  })

  const currentMeta = computed(() => LOCALE_META[currentLocale.value])

  function changeLocale(nextLocale: Locale): void {
    if (nextLocale === currentLocale.value) {
      isOpen.value = false
      return
    }

    locale.value = nextLocale
    setStoredLocale(nextLocale)
    document.documentElement.lang = nextLocale
    isOpen.value = false
  }

  async function toggleMenu(): Promise<void> {
    isOpen.value = !isOpen.value

    if (isOpen.value) {
      await onOpen()
    }
  }

  function closeMenu(): void {
    isOpen.value = false
  }

  function handleClickOutside(event: MouseEvent): void {
    if (!rootRef.value) {
      return
    }

    const target = event.target
    if (target instanceof Node && !rootRef.value.contains(target)) {
      closeMenu()
    }
  }

  function handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      closeMenu()
    }
  }

  function addResizeListeners() {
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
  }

  function removeResizeListeners() {
    window.removeEventListener('resize', updatePosition)
    window.removeEventListener('scroll', updatePosition, true)
  }

  watch(isOpen, (open) => {
    if (open) {
      addResizeListeners()
      updatePosition()
    } else {
      removeResizeListeners()
    }
  })

  onMounted(() => {
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleEscape)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleEscape)
    removeResizeListeners()
  })
</script>

<template>
  <div ref="rootRef" class="language-selector">
    <button
      class="selector-trigger"
      type="button"
      :aria-label="isOpen ? t('languageSelector.closeMenu') : t('languageSelector.openMenu')"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      @click="toggleMenu"
    >
      <span class="trigger-name">{{ currentMeta.nativeName }}</span>
      <span class="trigger-icon" aria-hidden="true" :class="{ 'is-open': isOpen }">⌄</span>
    </button>

    <Transition name="menu-fade">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="selector-menu"
        :class="[`is-${horizontal}`, `is-${vertical}`]"
        role="listbox"
        :aria-label="t('languageSelector.ariaLabel')"
      >
        <button
          v-for="option in localeOptions"
          :key="option.code"
          class="menu-item"
          :class="{ 'is-active': option.code === currentLocale }"
          type="button"
          role="option"
          :aria-selected="option.code === currentLocale"
          @click="changeLocale(option.code)"
        >
          <span class="item-primary">{{ option.nativeName }}</span>
          <span class="item-secondary">{{ option.englishName }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
  .language-selector {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-component-xs);
  }

  .selector-label {
    font-size: var(--text-xs-size);
    font-weight: var(--text-label-weight);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: var(--text-spacing-label);
  }

  .selector-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--space-component-xs);
    height: var(--size-control-sm);
    padding: 0 var(--space-component-sm);
    border-radius: var(--radius-button);
    border: var(--border-width-thin) solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-size: var(--text-xs-size);
    font-weight: var(--text-label-weight);
    box-shadow: var(--shadow-interactive);
  }

  .selector-trigger:hover {
    background-color: var(--color-bg-subtle);
  }

  .trigger-code {
    color: var(--color-primary);
    font-family: var(--text-mono-font);
    letter-spacing: var(--text-spacing-label);
  }

  .trigger-name {
    color: var(--color-text-muted);
  }

  .trigger-icon {
    color: var(--color-text-muted);
    transition: transform var(--motion-fast) var(--motion-ease-standard);
  }

  .trigger-icon.is-open {
    transform: rotate(180deg);
  }

  .selector-menu {
    position: absolute;
    min-width: 11rem;
    padding: var(--space-component-xs);
    border-radius: var(--radius-menu);
    border: var(--border-width-thin) solid var(--color-border);
    background-color: var(--color-surface);
    box-shadow: var(--shadow-dropdown);
    z-index: var(--z-dropdown);
    display: flex;
    flex-direction: column;
    gap: var(--space-component-nano);
    overflow: hidden;
  }

  .selector-menu.is-down {
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    top: calc(100% + 0.4rem);
  }

  .selector-menu.is-up {
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    bottom: calc(100% + 0.4rem);
  }

  .selector-menu.is-left {
    left: 0;
  }

  .selector-menu.is-right {
    right: 0;
  }

  .menu-item {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-component-sm);
    padding: var(--space-component-xs);
    border-radius: var(--radius-button);
    border: var(--border-width-thin) solid transparent;
    background: transparent;
    white-space: normal;
    min-width: 0;
  }

  .menu-item:hover {
    background-color: var(--color-bg-subtle);
    border-color: var(--color-border);
  }

  .menu-item.is-active {
    background-color: var(--color-primary-subtle);
    border-color: var(--color-primary-subtle);
  }

  .item-primary {
    font-size: var(--text-caption-size);
    font-weight: var(--text-label-weight);
    color: var(--color-text);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-secondary {
    font-size: var(--text-xs-size);
    color: var(--color-text-muted);
    min-width: 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-fade-enter-active {
    transition:
      opacity var(--motion-fast) var(--motion-ease-enter),
      transform var(--motion-fast) var(--motion-ease-enter);
  }

  .menu-fade-leave-active {
    transition:
      opacity var(--motion-fast) var(--motion-ease-exit),
      transform var(--motion-fast) var(--motion-ease-exit);
  }

  .menu-fade-enter-from,
  .menu-fade-leave-to {
    opacity: 0;
    transform: translateY(-0.2rem);
  }

  @media (max-width: 640px) {
    .selector-label,
    .item-secondary {
      display: none;
    }

    .selector-menu {
      min-width: var(--layout-menu-min-sm);
    }

    .trigger-name {
      display: none;
    }
  }
</style>
