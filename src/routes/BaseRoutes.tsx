import { Routes, Route } from 'react-router-dom'

import RoomsListPage from '@/pages/RoomsList'
import RoomViewPage from '@/pages/RoomView'
import NotFoundPage from '@/pages/NotFound/NotFound'


const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomsListPage/>}/>
      <Route path="/room/:roomId/f/:folderId" element={<RoomViewPage/>}/>
      <Route path="/room/:roomId" element={<RoomViewPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default Routing
