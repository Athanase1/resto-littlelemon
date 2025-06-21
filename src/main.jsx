import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserProvider from './store/AuthContext.jsx'
import ReserVationProvider from './store/ReservationContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
  <ReserVationProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ReserVationProvider>
  </UserProvider>
)
