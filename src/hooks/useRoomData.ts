import { useEffect, useState } from 'react'
import { useDataroomStore } from '@/store/useDataroomStore'
import { useFoldersStore } from '@/store/useFoldersStore'
import { useFilesStore } from '@/store/useFilesStore'

export const useRoomData =(roomId: string | undefined) => {
  const { loadRooms } = useDataroomStore()
  const { loadFolders } = useFoldersStore()
  const { loadFiles } = useFilesStore()

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!roomId) return

    Promise.all([
      loadRooms(),
      loadFolders(roomId),
      loadFiles(roomId)])
      .then(() => setLoaded(true))
  }, [roomId])

  return loaded
}
