export type ID = string;

export interface Dataroom {
    id: ID;
    name: string;
    createdAt: number;
    updatedAt: number;
}

export interface Folder {
  id: ID;
  roomId: string;
  parentId: string | null;
  name: string;
  createdAt: number;
}

export interface FileMeta {
  id: ID;
  roomId: string;
  folderId: string | null;
  name: string;
  blobId: string;
  createdAt: number;
}

export interface BlobEntry {
  id: ID;
  blob: Blob;
}
