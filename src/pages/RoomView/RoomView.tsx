import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import { useDataroomStore } from '@/store/useDataroomStore'
import { useFoldersStore } from '@/store/useFoldersStore'
import { useFilesStore } from '@/store/useFilesStore'

import RenameDialog from '@/components/RenameDialog'

import { FoldersList, FilesList, UploadFileDialog, CreateFolderDialog, Breadcrumbs } from '@/components/room'
import { filesApi } from '@/api/files'
import { PageSpinner } from '@/components/ui/spinner'
import NotFoundPage from '@/pages/NotFound/NotFound'
import { collectFolders } from '@/utils/folders'
import { truncate } from '@/utils/transformers'

import { useRoomData } from '@/hooks/useRoomData'
import { useEntryDialogs } from '@/hooks/useEntryDialogs'

const RoomViewPage = () => {
  const { roomId, folderId } = useParams()

  const { rooms, loading } = useDataroomStore()
  const { folders, createFolder, renameFolder, deleteFolderTree } = useFoldersStore()
  const { files, uploadFile, renameFile, deleteFiles } = useFilesStore()

  const isRoomDataLoaded = useRoomData(roomId)
  const {
    isCreateOpen,
    setIsCreateOpen,
    isUploadOpen,
    setIsUploadOpen,
    renameTarget,
    setRenameTarget,
  } = useEntryDialogs()

  const currentFolderId = folderId ?? null
  const folderExists = !currentFolderId || folders.some(f => f.id === currentFolderId)
  const childFolders = useMemo(() => folders.filter(f => f.roomId === roomId && f.parentId === currentFolderId),
    [folders, roomId, currentFolderId]
  )
  const childFiles = useMemo(() => files.filter(f => f.roomId === roomId && f.folderId === currentFolderId),
    [files, roomId, currentFolderId])
  const isEmpty = childFiles.length === 0 && childFolders.length === 0

  const room = rooms.find((r) => r.id === roomId)
  const roomNameShort = room ? truncate(room.name, 22) : ''

  const handleFileUpload = async (file: File) => {
    await uploadFile(roomId!, currentFolderId, file.name, file)
    setIsUploadOpen(false)
  }

  const deleteFolderDeep = async (id: string) => {
    const folderIds = collectFolders(folders, id)
    const fileIds = files
      .filter((f) => f.folderId && folderIds.includes(f.folderId))
      .map((f) => f.id)

    deleteFiles(fileIds)
    deleteFolderTree(id)
  }

  const handleRename = (newName: string) => {
    if (!renameTarget) return

    if (renameTarget.type === 'folder') {
      renameFolder(renameTarget.folder.id, newName)
    } else {
      renameFile(renameTarget.file.id, newName)
    }
    setRenameTarget(null)
  }

  const handleOpenFile = (fileId: string) => {
    filesApi.openFile(fileId)
  }

  if (loading) {
    return <div className="grow flex items-center justify-center"><PageSpinner /></div>
  }

  if (!room && isRoomDataLoaded) {
    return (<NotFoundPage title="The room you are looking for does not exist" />)
  }

  if (!folderExists && isRoomDataLoaded) {
    return (<NotFoundPage title="The folder you are looking for does not exist" />)
  }

  return (
    <div className="flex flex-col h-screen p-6 w-full mx-auto space-y-4">
      <Breadcrumbs
        roomId={roomId!}
        folders={folders}
        currentFolderId={currentFolderId}
        roomNameShort={roomNameShort}
      />

      <div className="flex gap-2">
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} className="mr-2" /> New Folder
        </Button>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload size={16} className="mr-2" />
          Upload PDF
        </Button>
      </div>

      <Separator />

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full [&_[data-slot=scroll-area-viewport]>div]:block!">
          <div className="space-y-3 pr-2">
            <FoldersList
              roomId={roomId!}
              folders={childFolders}
              onRename={(folder) => setRenameTarget({ type: 'folder', folder })}
              onDeleteFolder={deleteFolderDeep}
            />

            <FilesList
              files={childFiles}
              onRename={(file) => setRenameTarget({ type: 'file', file })}
              onDeleteFile={(id) => deleteFiles([id])}
              onOpenFile={handleOpenFile}
            />

            {isEmpty && (
              <div className="text-center text-muted-foreground">
                Empty folder
              </div>
            )}
          </div>
        </ScrollArea>
      </div>


      <CreateFolderDialog
        isOpen={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onCreate={(name) => {
          createFolder(roomId!, currentFolderId, name)
          setIsCreateOpen(false)
        }}
      />

      <UploadFileDialog
        isOpen={isUploadOpen}
        onCancel={() => setIsUploadOpen(false)}
        onUpload={handleFileUpload}
      />

      {renameTarget && (
        <RenameDialog
          isOpen={!!renameTarget}
          title={renameTarget.type === 'folder' ? 'Rename Folder' : 'Rename File'}
          initialName={renameTarget.type === 'folder' ? renameTarget.folder.name : renameTarget.file.name}
          onCancel={() => setRenameTarget(null)}
          onSubmit={handleRename}
        />
      )}
    </div>
  )
}

export default RoomViewPage
