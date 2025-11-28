import { db } from '@/db'
import { nanoid } from 'nanoid'

export const filesApi = {
  async loadAll(roomId: string) {
    return db.files.where({roomId}).toArray()
  },

  async create(roomId: string, folderId: string | null, name: string, file: File) {
    const id = nanoid()
    const blobId = nanoid()

    const fileMeta = {
      id,
      roomId,
      folderId,
      name,
      blobId,
      createdAt: Date.now(),
    }

    await db.transaction('rw', db.files, db.blobs, async () => {
      await db.files.add(fileMeta)
      await db.blobs.add({ id: blobId, blob: file })
    })

    return fileMeta
  },

  async rename(id: string, name: string) {
    return db.files.update(id, { name })
  },

  async deleteMany(ids: string[]) {
    const metas = await db.files.where('id').anyOf(ids).toArray()
    const blobIds = metas.map((m) => m.blobId)

    await db.transaction('rw', db.files, db.blobs, async () => {
      await db.files.where('id').anyOf(ids).delete()
      await db.blobs.where('id').anyOf(blobIds).delete()
    })
  },

  async getById(id: string) {
    return db.files.get(id)
  },

  async getBlob(blobId: string) {
    return db.blobs.get(blobId)
  },

  async openFile(fileId: string) {
    const meta = await filesApi.getById(fileId)
    if (!meta) {
      alert('File metadata not found')
      return
    }

    const blobEntry = await filesApi.getBlob(meta.blobId)
    if (!blobEntry) {
      alert('File blob not found')
      return
    }

    const url = URL.createObjectURL(blobEntry.blob)
    window.open(url, '_blank')
  }
}
