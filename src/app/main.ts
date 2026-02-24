import { createApp } from 'vue'
import { setupProviders } from '@/app/providers'
import './styles/global.css'
import App from './App.vue'

const app = createApp(App)

setupProviders(app)

app.mount('#app')
