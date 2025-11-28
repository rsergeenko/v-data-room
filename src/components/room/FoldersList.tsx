import { Card } from '@/components/ui/card'
import { Folder as FolderIcon, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { Folder } from '@/types/models'
import { useNavigate } from 'react-router-dom'
import { Pages } from '@/constants/pages'
import ConfirmPopover from '@/components/ConfirmPopover'

interface Props {
  roomId: string
  folders: Array<Folder>;
  onRename: (folder: Folder) => void;
  onDeleteFolder: (folderId: string) => void;
}

const FoldersList = (props: Props) => {
  const {
    roomId,
    folders,
    onRename,
    onDeleteFolder,
  } = props

  const navigate = useNavigate()

  return (
    <>
      {folders.map((folder) => (
        <Card
          key={folder.id}
          className="w-full px-3 py-2 flex flex-row items-center justify-between hover:bg-accent cursor-pointer transition-colors rounded-lg border"
          onClick={() => navigate(Pages.FOLDER(roomId, folder.id))}
        >
          <div
            className="flex items-center gap-3 flex-1 min-w-0"
          >
            <FolderIcon size={18} className="text-primary" />
            <span
              className="font-medium text-sm truncate"
              title={folder.name}
            >
              {folder.name}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <div className="text-xs text-muted-foreground mr-2">
              Created: {new Date(folder.createdAt).toLocaleString()}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-muted-foreground hover:text-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                onRename(folder)
              }}
            >
              <Pencil size={14} />
            </Button>

            <ConfirmPopover
              title="Delete the folder?"
              description="This folder will be permanently removed."
              confirmText="Delete"
              onConfirm={() => onDeleteFolder(folder.id)}
            >
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-muted-foreground hover:text-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Trash size={14} />
              </Button>
            </ConfirmPopover>
          </div>
        </Card>
      ))}
    </>
  )
}

export default FoldersList
