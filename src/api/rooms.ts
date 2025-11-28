import { db } from '@/db'
import { sleep } from '@/utils/timers'
import type { Dataroom } from '@/types/models'

export const roomsApi = {
  async loadAll() {
    await sleep() // Simulate delay
    return db.rooms.toArray()
  },

  async create(name: string) {
    const id = crypto.randomUUID()
    const room: Dataroom = {
      id,
      name,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    await db.rooms.add(room)

    await sleep() // Simulate delay
    return room
  },

  async rename(id: string, name: string) {
    await db.rooms.update(id, { name })
  },

  async delete(id: string) {
    await sleep() // Simulate delay
    return db.transaction('rw', db.rooms, db.folders, db.blobs, async () => {
      await db.rooms.delete(id)
      const folderIds = await db.folders.where({ roomId: id }).primaryKeys()
      await db.folders.bulkDelete(folderIds)
    })
  }
}
