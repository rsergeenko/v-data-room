import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

const ConfirmPopover = (props: Props) => {
  const {
    children,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
  } = props
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent className="w-60 p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>

        <div className="flex gap-2 justify-end pt-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button size="sm" variant="destructive" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ConfirmPopover
