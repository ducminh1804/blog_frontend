import './App.css'
import useRouteElement from './useRouteElement'
import ChatController from './pages/ChatController'
import { connectStomp } from './services/stompClient'
import { Suspense } from 'react'

export default function App() {
  const route = useRouteElement()

  return (
    <>
      {route}
      <ChatController />
    </>
  )
}

// export default function WrappedApp() {
//   return (
//     <Suspense fallback='...is loading'>
//       <App />
//     </Suspense>
//   )
// }
