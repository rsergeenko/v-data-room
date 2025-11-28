import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'

interface Props {
  initialName?: string
  title?: string
  placeholder?: string
  buttonContent?: React.ReactNode
  isOpen?: boolean
  children?: React.ReactNode
  onCancel: () => void
  onSubmit: (name: string) => void
}

const RenameDialog = (props: Props) => {
  const {
    initialName = '',
    title = 'Rename',
    placeholder = '',
    buttonContent,
    children,
    isOpen,
    onCancel,
    onSubmit
  } = props
  const [name, setName] = useState(initialName)

  const isValid = name.trim().length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    onSubmit(name.trim())
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCancel()
      setName('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mt-4">
            <Input
              placeholder={placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              className="w-full"
              disabled={!isValid}
              type="submit"
            >
              {buttonContent ?? (<>Rename <Pencil className="ml-2"/></>)}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameDialog
