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
import React from "react"
import { useDeleteCategory } from "@/hooks/Category/useDeleteCategory"

interface DeleteCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (categoryId: string) => void
  categoryId: string
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  onDeleted,
  categoryId,
}: DeleteCategoryDialogProps) {

  const { deleteCategory, loading } = useDeleteCategory(() => {
    onOpenChange(false)
    onDeleted?.(categoryId)
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    deleteCategory({
      variables: {
        deleteCategoryId: categoryId,
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja deletar a categoria?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className="bg-danger"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Deletando..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}