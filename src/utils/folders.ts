import type { Folder } from '@/types/models'

export const collectFolders = (folders: Folder[], rootId: string): string[] => {
  const result: string[] = []

  const walk = (id: string) => {
    result.push(id)

    folders
      .filter(f => f.parentId === id)
      .forEach(child => walk(child.id))
  }

  walk(rootId)
  return result
}
