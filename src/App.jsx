import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import GemDetails from './pages/GemDetails'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/gems/:id" element={<GemDetails />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
