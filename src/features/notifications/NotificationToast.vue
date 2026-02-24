<script setup lang="ts">
  import { useThemeStore } from '@/features/theme/model/useThemeStore'

  const appStore = useThemeStore()
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
          aria-label="Close notification"
          @click="appStore.removeNotification(notification.id)"
        >
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .notification-container {
    position: fixed;
    top: 4.5rem;
    right: 1.25rem;
    z-index: 9999;
    pointer-events: none;
  }

  .notification-stack {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .notification {
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    padding: 0.875rem 1rem;
    min-width: 300px;
    max-width: 380px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    pointer-events: auto;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex: 1;
    min-width: 0;
  }

  .notification-icon {
    font-weight: 700;
    font-size: 0.875rem;
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
  }

  .notification-message {
    color: var(--color-text-primary);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .notification-close {
    background: none;
    border: none;
    height: auto;
    padding: 0.125rem;
    color: var(--color-text-secondary);
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    flex-shrink: 0;
    border-radius: var(--radius-sm);
    transition: color 0.15s ease;
  }

  .notification-close:hover {
    color: var(--color-text-primary);
    background-color: transparent;
  }

  /* Type variants — accent via left border + icon color */
  .notification-info {
    border-left: 3px solid var(--color-primary);
  }
  .notification-info .notification-icon {
    color: var(--color-primary);
  }

  .notification-success {
    border-left: 3px solid var(--color-success);
  }
  .notification-success .notification-icon {
    color: var(--color-success);
  }

  .notification-warning {
    border-left: 3px solid var(--color-warning);
  }
  .notification-warning .notification-icon {
    color: var(--color-warning);
  }

  .notification-error {
    border-left: 3px solid var(--color-error);
  }
  .notification-error .notification-icon {
    color: var(--color-error);
  }

  /* Transition */
  .notification-enter-active {
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .notification-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .notification-enter-from {
    opacity: 0;
    transform: translateX(1.5rem);
  }

  .notification-leave-to {
    opacity: 0;
    transform: translateX(1.5rem);
  }

  .notification-move {
    transition: transform 0.25s ease;
  }

  @media (max-width: 640px) {
    .notification-container {
      left: 1rem;
      right: 1rem;
      top: 4.5rem;
    }

    .notification {
      min-width: auto;
      max-width: none;
    }
  }
</style>
