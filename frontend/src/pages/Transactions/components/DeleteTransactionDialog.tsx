import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import { useDeleteTransaction } from "@/hooks/Transaction/useDeleteTransaction"

interface DeleteTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (transactionId: string) => void
  transactionId: string
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  onDeleted,
  transactionId,
}: DeleteTransactionDialogProps) {

  const { handleDelete, loading } = useDeleteTransaction(
    transactionId,
    () => {
      onOpenChange(false)
      onDeleted?.(transactionId)
    }
  )

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja deletar a transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}