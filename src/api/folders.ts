import { db } from '@/db'
import { nanoid } from 'nanoid'
import type { Folder } from '@/types/models'

export const foldersApi = {
  async loadAll(roomId: string) {
    return db.folders.where({roomId}).toArray()
  },

  async create(roomId: string, parentId: string | null, name: string) {
    const folder: Folder = {
      id: nanoid(),
      roomId,
      parentId,
      name,
      createdAt: Date.now(),
    }

    await db.folders.add(folder)
    return folder
  },

  async rename(folderId: string, name: string) {
    return db.folders.update(folderId, { name })
  },

  async deleteMany(folderIds: string[]) {
    await db.folders.where('id').anyOf(folderIds).delete()
  },
}
