import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Pages } from '@/constants/pages.ts'
import { Button } from '@/components/ui/button.tsx'
import { Pencil, Trash } from 'lucide-react'
import ConfirmPopover from '@/components/ConfirmPopover.tsx'
import type { Dataroom } from '@/types/models'


export interface Props {
  room: Dataroom
  onEdit: (room: Dataroom) => void
  onDelete: (roomId: string) => void
}

const RoomCard = (props: Props) => {
  const { room, onEdit, onDelete } = props

  const navigate = useNavigate()

  return (
    <Card
      className="rounded-2xl py-0"
    >
      <CardContent
        className="p-4 py-8 flex justify-between items-center gap-2 cursor-pointer"
        onClick={() => navigate(Pages.ROOM_VIEW(room.id))}
        role="button"
      >
        <div className="flex-1 min-w-0 max-w-2/3">
          <div className="text-lg font-semibold truncate">{room.name}</div>
          <div className="text-sm text-muted-foreground">
            Created: {new Date(room.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center space-x-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted-foreground hover:text-muted transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(room)
            }}
          >
            <Pencil size={14} />
          </Button>
          <ConfirmPopover
            title="Delete the room?"
            description="This room will be permanently removed."
            confirmText="Delete"
            onConfirm={() => onDelete(room.id)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted-foreground hover:text-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Trash size={14}/>
            </Button>
          </ConfirmPopover>
        </div>
      </CardContent>
    </Card>
  )
}

export default RoomCard
