import './App.css'
import useRouteElement from './useRouteElement'
import ChatController from './pages/ChatController'
import { ScrollRestoration } from 'react-router-dom'

function App() {
  const route = useRouteElement()
  return (
    <>
      {route}
      <ChatController />
    </>
  )
}

export default App
