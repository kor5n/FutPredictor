import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.querySelector('main')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
