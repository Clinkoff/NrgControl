import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Index.css'
import LoginForm from './LoginForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginForm />
  </StrictMode>,
)
