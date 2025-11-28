import { create } from 'zustand'
import { roomsApi } from '@/api/rooms'
import type { Dataroom } from '@/types/models'

interface DataroomStore {
  rooms: Dataroom[];
  loading: boolean;

  loadRooms: () => Promise<void>;
  createRoom: (name: string) => Promise<Dataroom>;
  deleteRoom: (id: string) => Promise<void>;
  renameRoom: (id: string, name: string) => Promise<void>;
}

export const useDataroomStore = create<DataroomStore>((set, get) => ({
  rooms: [],
  loading: false,
  loadRooms: async () => {
    set({ loading: true })
    const data = await roomsApi.loadAll()
    set({ rooms: data, loading: false })
  },
  createRoom: async (name: string) => {
    const room = await roomsApi.create(name)
    set({ loading: false, rooms: [...get().rooms, room] })
    return room
  },
  deleteRoom: async (id: string) => {
    await roomsApi.delete(id)
    await get().loadRooms()
  },
  renameRoom: async (id: string, name: string) => {
    await roomsApi.rename(id, name)
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === id ? { ...r, name } : r
      )
    }))
  }
}))
