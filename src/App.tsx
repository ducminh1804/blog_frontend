import './App.css'
import useRouteElement from './useRouteElement'
import ChatController from './pages/ChatController'

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
