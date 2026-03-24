import { useMutation } from "@apollo/client/react"
import { UPDATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { toast } from "sonner"

export function useUpdateCategory(onSuccess?: () => void) {
  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria atualizada com sucesso")
      onSuccess?.()
    },
    onError() {
      toast.error("Falha ao atualizar a categoria")
    },
  })

  return { updateCategory, loading }
}