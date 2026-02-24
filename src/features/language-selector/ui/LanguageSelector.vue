<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  import {
    DEFAULT_LOCALE,
    LOCALE_META,
    SUPPORTED_LOCALES,
    isLocale,
    type Locale,
  } from '@/shared/i18n/config/locales'
  import { setStoredLocale } from '@/shared/i18n/lib/persistLocale'

  const { t, locale } = useI18n()

  const rootRef = ref<HTMLElement | null>(null)
  const isOpen = ref(false)

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

  function toggleMenu(): void {
    isOpen.value = !isOpen.value
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

  onMounted(() => {
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleEscape)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleEscape)
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
        class="selector-menu"
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

<style scoped>
  .language-selector {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .selector-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .selector-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: 2rem;
    padding: 0 0.625rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: var(--shadow-xs);
  }

  .selector-trigger:hover {
    background-color: var(--color-bg-subtle);
  }

  .trigger-code {
    color: var(--color-primary);
    font-family: var(--font-mono);
    letter-spacing: 0.06em;
  }

  .trigger-name {
    color: var(--color-text-secondary);
  }

  .trigger-icon {
    color: var(--color-text-secondary);
    transition: transform 0.15s ease;
  }

  .trigger-icon.is-open {
    transform: rotate(180deg);
  }

  .selector-menu {
    position: absolute;
    top: calc(100% + 0.4rem);
    right: 0;
    min-width: 11rem;
    padding: 0.35rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg-primary);
    box-shadow: var(--shadow-lg);
    z-index: 210;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    overflow: hidden;
  }

  .menu-item {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.45rem 0.55rem;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
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
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-secondary {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    min-width: 0;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-fade-enter-active,
  .menu-fade-leave-active {
    transition:
      opacity 0.14s ease,
      transform 0.14s ease;
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
      min-width: 8rem;
    }

    .trigger-name {
      display: none;
    }
  }
</style>
