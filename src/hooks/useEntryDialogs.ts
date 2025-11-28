import { useState } from 'react'
import type { FileMeta, Folder } from '@/types/models'

export type RenameTarget =
  | { type: 'file'; file: FileMeta }
  | { type: 'folder'; folder: Folder }
  | null;

export const useEntryDialogs = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<RenameTarget>(null)

  return {
    isCreateOpen,
    setIsCreateOpen,
    isUploadOpen,
    setIsUploadOpen,
    renameTarget,
    setRenameTarget,
  }
}
