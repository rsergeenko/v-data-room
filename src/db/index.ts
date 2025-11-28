import type { BlobEntry, Dataroom, FileMeta, Folder } from '@/types/models'
import { Dexie, type Table } from 'dexie'

class DataroomDB extends Dexie {
  rooms!: Table<Dataroom>
  folders!: Table<Folder>
  files!: Table<FileMeta>
  blobs!: Table<BlobEntry>

  constructor() {
    super('dataroom-db')

    this.version(1).stores({
      rooms: 'id',
      blobs: 'id',
      folders: 'id, roomId, parentId',
      files: 'id, roomId, folderId',
    })
  }
}


export const db = new DataroomDB()
