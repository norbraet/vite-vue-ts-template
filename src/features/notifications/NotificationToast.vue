<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useThemeStore } from '@/features/theme/model/useThemeStore'

  const appStore = useThemeStore()
  const { t } = useI18n()
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="notification" tag="div" class="notification-stack">
      <div
        v-for="notification in appStore.notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
      >
        <div class="notification-content">
          <span class="notification-icon" aria-hidden="true">
            {{
              notification.type === 'success'
                ? '✓'
                : notification.type === 'error'
                  ? '✕'
                  : notification.type === 'warning'
                    ? '⚠'
                    : 'ℹ'
            }}
          </span>
          <span class="notification-message">{{ notification.message }}</span>
        </div>
        <button
          class="notification-close"
          :aria-label="t('notifications.close')"
          @click="appStore.removeNotification(notification.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="css" scoped>
  .notification-container {
    position: fixed;
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    top: 4.5rem;
    right: var(--space-component-xl);
    z-index: var(--z-toast);
    pointer-events: none;
  }

  .notification-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-component-xs);
  }

  .notification {
    background: var(--color-surface);
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    padding: 0.875rem var(--space-component-md);
    min-width: 300px;
    max-width: 380px;
    display: flex;
    align-items: center;
    gap: var(--space-component-sm);
    pointer-events: auto;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .notification-content {
    display: flex;
    align-items: center;
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    gap: 0.625rem;
    flex: 1;
    min-width: 0;
  }

  .notification-icon {
    font-weight: var(--text-display-weight);
    font-size: var(--text-small-size);
    flex-shrink: 0;
    width: var(--size-icon-sm);
    height: var(--size-icon-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
  }

  .notification-message {
    color: var(--color-text);
    font-size: var(--text-small-size);
    font-weight: var(--text-emphasis-weight);
    line-height: var(--text-line-snug);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notification-close {
    background: none;
    border: none;
    height: auto;
    /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
    padding: 0.125rem;
    color: var(--color-text-muted);
    cursor: pointer;
    font-size: var(--text-body-size);
    line-height: var(--text-line-none);
    flex-shrink: 0;
    border-radius: var(--radius-sm);
    transition: color var(--motion-fast) var(--motion-ease-standard);
  }

  .notification-close:hover {
    color: var(--color-text);
    background-color: transparent;
  }

  /* Type variants — accent via left border + icon color */
  .notification-info {
    border-left: var(--border-width-indicator) solid var(--color-primary);
  }

  .notification-info .notification-icon {
    color: var(--color-primary);
  }

  .notification-success {
    border-left: var(--border-width-indicator) solid var(--color-success);
  }

  .notification-success .notification-icon {
    color: var(--color-success);
  }

  .notification-warning {
    border-left: var(--border-width-indicator) solid var(--color-warning);
  }

  .notification-warning .notification-icon {
    color: var(--color-warning);
  }

  .notification-error {
    border-left: var(--border-width-indicator) solid var(--color-error);
  }

  .notification-error .notification-icon {
    color: var(--color-error);
  }

  /* Transition */
  .notification-enter-active {
    transition:
      opacity var(--motion-normal) var(--motion-ease-enter),
      transform var(--motion-normal) var(--motion-ease-enter);
  }

  .notification-leave-active {
    transition:
      opacity var(--motion-normal) var(--motion-ease-exit),
      transform var(--motion-normal) var(--motion-ease-exit);
  }

  .notification-enter-from {
    opacity: 0;
    transform: translateX(var(--space-component-lg));
  }

  .notification-leave-to {
    opacity: 0;
    transform: translateX(var(--space-component-lg));
  }

  .notification-move {
    transition: transform var(--motion-normal) var(--motion-ease-standard);
  }

  @media (max-width: 640px) {
    .notification-container {
      left: var(--space-component-md);
      right: var(--space-component-md);
      /* stylelint-disable-next-line plugin/no-hardcoded-spacing */
      top: 4.5rem;
    }

    .notification {
      min-width: auto;
      max-width: none;
    }
  }
</style>
