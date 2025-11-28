import { BrowserRouter } from 'react-router-dom'
import BaseRoutes from './routes/BaseRoutes'

import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <BaseRoutes/>
    </BrowserRouter>
  )
}
