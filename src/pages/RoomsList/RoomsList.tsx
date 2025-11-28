import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDataroomStore } from '@/store/useDataroomStore'
import { Skeleton } from '@/components/ui/skeleton'
import CreateRoomDialog from '@/components/room/CreateRoomDialog'
import type { Dataroom } from '@/types/models'
import RenameDialog from '@/components/RenameDialog'
import RoomCard from './RoomCard.tsx'

const RoomsListPage = () => {
  const { rooms, loading, loadRooms, createRoom, deleteRoom, renameRoom } = useDataroomStore()
  const [isCreateRoomDialogOpen, setIsCreateRoomDialogOpen] = useState(false)
  const [editRoom, setEditRoom] = useState<Dataroom | null>(null)

  useEffect(() => {
    loadRooms()
  }, [])

  const handleCreate = async (name: string) => {
    setIsCreateRoomDialogOpen(false)
    await createRoom(name)
  }

  const handleDelete = async (id: string) => {
    await deleteRoom(id)
  }

  const onEditClick = (room: Dataroom) => {
    setEditRoom(room)
  }

  const handleEditRoom = async (name: string) => {
    if (!editRoom) return

    await renameRoom(editRoom.id, name)
    setEditRoom(null)
  }

  const CreatRoomButton = (
    <CreateRoomDialog
      isOpen={isCreateRoomDialogOpen}
      onCreate={handleCreate}
      onCancel={() => setIsCreateRoomDialogOpen(false)}
    >
      <Button
        className="justify-self-center rounded-2xl px-4 flex items-center gap-2"
        onClick={() => setIsCreateRoomDialogOpen(true)}
      >
        <Plus size={16}/> Create Room
      </Button>
    </CreateRoomDialog>
  )

  return (
    <div className="grow p-6 max-w-4xl w-full mx-auto space-y-4 flex flex-col h-screen">
      {editRoom && (
        <RenameDialog
          isOpen={!!editRoom}
          initialName={editRoom.name}
          title="Rename Data Room"
          onSubmit={handleEditRoom}
          onCancel={() => setEditRoom(null)}
        />
      )}
      <div className="flex items-center justify-between w-full mb-20">
        <h1 className="text-2xl font-bold">Your Rooms</h1>
        {CreatRoomButton}
      </div>
      {loading && (
        <div className="space-y-3 w-full">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl"/>
          ))}
        </div>
      )}
      {!loading && rooms.length === 0 && (
        <div className="grow flex flex-col justify-center items-center text-center text-muted-foreground space-y-4">
          <p className="text-2xl font-semibold space-y-3">No rooms</p>
          <p className="text-lg">You don't have created rooms</p>
          {CreatRoomButton}
        </div>
      )}
      {!loading && rooms.length > 0 && (
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full [&_[data-slot=scroll-area-viewport]>div]:block!">
            <div className="min-w-0 space-y-3">
              {rooms.map((room) => (
                <RoomCard
                  room={room}
                  onEdit={onEditClick}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export default RoomsListPage
