import { useMutation } from "@apollo/client/react"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { toast } from "sonner"

export function useDeleteCategory(onSuccess?: () => void) {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria deletada com sucesso")
      onSuccess?.()
    },
    onError() {
      toast.error("Falha ao deletar a categoria")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  return { deleteCategory, loading }
}