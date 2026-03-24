import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/Category"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { toast } from "sonner"

export function useCreateCategory(onSuccess?: () => void) {
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    onCompleted() {
      toast.success("Categoria criada com sucesso")
      onSuccess?.()
    },
    onError() {
      toast.error("Falha ao criar a categoria")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  return { createCategory, loading }
}