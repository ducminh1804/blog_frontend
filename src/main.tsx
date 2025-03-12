import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, ScrollRestoration } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { store } from './redux/store.ts'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <ReactQueryDevtools initialIsOpen={true} buttonPosition='bottom-left' />
        </Provider>
        <ToastContainer />
      </BrowserRouter>
    </StrictMode>
  </QueryClientProvider>
)
