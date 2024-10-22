import { useState } from 'react'
import Home from './pages/Home'
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-appcol min-w-screen h-screen flex flex-col'>
      <Home className='flex flex-1'/>
    </div>
  )
}

export default App
