import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onUpload: (file: File) => void;
}

const UploadFileDialog = (props: Props) => {
  const { isOpen, onCancel, onUpload } = props
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    onUpload(file)

    setFile(null)
  }

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return

    if (f.type !== 'application/pdf') {
      alert('Only PDF files are allowed')
      return
    }

    setFile(f)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">

          <div className="space-y-2">
            <Input
              type="file"
              accept="application/pdf"
              onChange={onSelect}
            />

            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" disabled={!file}>
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadFileDialog
