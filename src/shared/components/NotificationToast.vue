<script setup lang="ts">
  import { useAppStore } from '@/shared/stores/useAppStore'

  const appStore = useAppStore()

  const getTypeColor = (type: string) => {
    const colors = {
      info: '#2563eb',
      success: '#16a34a',
      warning: '#f59e0b',
      error: '#dc2626',
    }
    return colors[type as keyof typeof colors] || colors.info
  }
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="notification" tag="div" class="notification-stack">
      <div
        v-for="notification in appStore.notifications"
        :key="notification.id"
        :class="['notification', `notification-${notification.type}`]"
        :style="{ borderLeftColor: getTypeColor(notification.type) }"
      >
        <div class="notification-content">
          <span class="notification-icon">
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
    top: 1rem;
    right: 1rem;
    z-index: 1000;
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
    border-left-width: 4px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    padding: 1rem;
    min-width: 300px;
    max-width: 400px;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    pointer-events: auto;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
  }

  .notification-icon {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .notification-message {
    color: var(--color-text-primary);
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .notification-close {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    font-size: 1.2rem;
    line-height: 1;
    transition: color 0.2s ease;
  }

  .notification-close:hover {
    color: var(--color-text-primary);
  }

  .notification-success {
    border-left-color: #16a34a;
  }

  .notification-error {
    border-left-color: #dc2626;
  }

  .notification-warning {
    border-left-color: #f59e0b;
  }

  .notification-info {
    border-left-color: #2563eb;
  }

  /* Transition animations */
  .notification-enter-active {
    transition: all 0.3s ease-out;
  }

  .notification-leave-active {
    transition: all 0.3s ease-in;
  }

  .notification-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .notification-move {
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    .notification-container {
      left: 1rem;
      right: 1rem;
    }

    .notification {
      min-width: auto;
      max-width: none;
    }
  }
</style>
