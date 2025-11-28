export const Pages = {
  ROOMS_LIST: '/',
  ROOM_VIEW: (id: string) => `/room/${id}`,
  FOLDER: (roomId: string, folderId: string) => `${Pages.ROOM_VIEW(roomId)}/f/${folderId}`,
}
