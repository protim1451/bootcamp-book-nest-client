import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import FirebaseProvider from './FirebaseProvider/FirebaseProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <FirebaseProvider>
        <RouterProvider router={router}></RouterProvider>
      </FirebaseProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
