import { create } from 'zustand'
import { foldersApi } from '@/api/folders'
import type { Folder } from '@/types/models'

interface FoldersStore {
  folders: Array<Folder>

  loadFolders: (roomId: string) => Promise<void>
  createFolder: (roomId: string, parentId: string | null, name: string) => Promise<void>
  renameFolder: (id: string, name: string) => Promise<void>
  deleteFolderTree: (rootId: string) => Promise<void>
}

export const useFoldersStore = create<FoldersStore>((set, get) => ({
  folders: [],

  loadFolders: async (roomId: string) => {
    const list = await foldersApi.loadAll(roomId)
    set({ folders: list })
  },

  createFolder: async (roomId, parentId, name) => {
    const folder = await foldersApi.create(roomId, parentId, name)
    set((state) => ({
      folders: [...state.folders, folder],
    }))
  },

  renameFolder: async (id, name) => {
    await foldersApi.rename(id, name)
    set((state) => ({
      folders: state.folders.map((f) => (f.id === id ? { ...f, name } : f)),
    }))
  },

  deleteFolderTree: async (rootId: string) => {
    const { folders } = get()

    const collect = (id: string, acc: string[]) => {
      acc.push(id)
      folders
        .filter((f) => f.parentId === id)
        .forEach((c) => collect(c.id, acc))
      return acc
    }

    const ids = collect(rootId, [])
    await foldersApi.deleteMany(ids)

    set((state) => ({
      folders: state.folders.filter((f) => !ids.includes(f.id)),
    }))
  },
}))
