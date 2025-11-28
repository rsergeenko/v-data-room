import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Pages } from '@/constants/pages'
import type { Folder } from '@/types/models'
import { useNavigate } from 'react-router-dom'

interface Props {
  roomId: string
  folders: Folder[];
  currentFolderId: string | null;
  roomNameShort: string;
}

const Breadcrumbs = (props: Props) => {
  const navigate = useNavigate()
  const { roomId, folders, currentFolderId, roomNameShort } = props

  const breadcrumb = useMemo(() => {
    if (!currentFolderId) return []

    const map = new Map(folders.map((f) => [f.id, f]))
    const chain: Folder[] = []

    let cursor = map.get(currentFolderId)

    while (cursor) {
      chain.unshift(cursor)
      cursor = cursor.parentId ? map.get(cursor.parentId) : undefined
    }
    return chain
  }, [folders, currentFolderId])

  const goToFolder = (id?: string) => {
    if (!id) navigate(Pages.ROOM_VIEW(roomId))
    else navigate(Pages.FOLDER(roomId, id))
  }

  return (
    <div className="flex items-center space-x-1 text-sm">
      <Button variant="link" onClick={() => navigate(Pages.ROOMS_LIST)}>
        All Rooms
      </Button>

      <span>/</span>

      <Button variant="link" onClick={() => goToFolder()}>
        {roomNameShort}
      </Button>

      {breadcrumb.map((folder) => {
        const nameShort =
          folder.name.length > 16
            ? folder.name.slice(0, 16) + '…'
            : folder.name

        return (
          <div key={folder.id} className="flex items-center space-x-1">
            <span>/</span>
            <Button variant="link" onClick={() => goToFolder(folder.id)}>
              {nameShort}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export default Breadcrumbs
