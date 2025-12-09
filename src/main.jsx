import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <GoogleOAuthProvider clientId="203222128818-krad956gk79mev121c6rgb14dpn9nafn.apps.googleusercontent.com">
    <App />
</GoogleOAuthProvider>
  </StrictMode>,
)
