import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DynamicTable from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DynamicTable />
  </StrictMode>,
)
