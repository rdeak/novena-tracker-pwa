import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoadingState from './components/ui/LoadingState';
import './style.css'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><LoadingState /></div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
