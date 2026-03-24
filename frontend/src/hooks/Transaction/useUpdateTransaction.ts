import { useMutation } from "@apollo/client/react"
import { UPDATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { toast } from "sonner"

export function useUpdateTransaction(onSuccess?: () => void) {
  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação atualizada com sucesso")
      onSuccess?.()
    },
    onError() {
      toast.error("Falha ao atualizar a transação")
    },
  })

  return { updateTransaction, loading }
}