import { useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { File, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { FileMeta } from '@/types/models'
import ConfirmPopover from '@/components/ConfirmPopover'

interface Props {
  files: Array<FileMeta>;
  sort?: boolean;
  onRename: (file: FileMeta) => void;
  onDeleteFile: (fileId: string) => void;
  onOpenFile: (fileId: string) => void;
}

const FilesList = (props: Props) => {
  const {
    files,
    sort = true,
    onRename,
    onDeleteFile,
    onOpenFile
  } = props

  const sorted = useMemo(() => {
    if (!sort) return files
    return [...files].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    )
  }, [files, sort])

  return (
    <>
      {sorted.map((file) => (
        <Card
          key={file.id}
          className="w-full px-3 py-2 flex flex-row items-center justify-between hover:bg-accent cursor-pointer transition-colors rounded-none border-x-0 border-t-0 border-b shadow-none"
          onClick={() => onOpenFile(file.id)}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <File size={18} className="text-muted-foreground shrink-0" />
            <span
              className="text-sm truncate"
              title={file.name}
            >
              {file.name}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <div className="text-xs text-muted-foreground mr-2">
              Created: {new Date(file.createdAt).toLocaleString()}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-muted-foreground hover:text-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                onRename(file)
              }}
            >
              <Pencil  size={14} />
            </Button>
            <ConfirmPopover
              title="Delete the file?"
              description="This file will be permanently removed."
              confirmText="Delete"
              onConfirm={() => onDeleteFile(file.id)}
            >
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-muted-foreground hover:text-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Trash size={14} />
              </Button>
            </ConfirmPopover>
          </div>
        </Card>
      ))}
    </>
  )
}

export default FilesList
