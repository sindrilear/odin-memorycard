import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Memory } from "./Memorycard.jsx"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Memory />
  </StrictMode>,
)
