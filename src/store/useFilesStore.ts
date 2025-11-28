import { create } from 'zustand'
import { filesApi } from '@/api/files'
import type { FileMeta } from '@/types/models'

interface FilesStore {
  files: Array<FileMeta>
  loadFiles: (roomId: string) => Promise<void>
  uploadFile: (roomId: string, folderId: string | null, name: string, file: File) => Promise<void>
  renameFile: (id: string, name: string) => Promise<void>
  deleteFiles: (ids: string[]) => Promise<void>
}

export const useFilesStore = create<FilesStore>((set) => ({
  files: [],

  loadFiles: async (roomId: string) => {
    const list = await filesApi.loadAll(roomId)
    set({ files: list })
  },

  uploadFile: async (roomId, folderId, name, file) => {
    const meta = await filesApi.create(roomId, folderId, name, file)
    set((state) => ({ files: [...state.files, meta] }))
  },

  renameFile: async (id, name) => {
    await filesApi.rename(id, name)
    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, name } : f)),
    }))
  },

  deleteFiles: async (ids: string[]) => {
    await filesApi.deleteMany(ids)
    set((state) => ({
      files: state.files.filter((f) => !ids.includes(f.id)),
    }))
  },
}))
