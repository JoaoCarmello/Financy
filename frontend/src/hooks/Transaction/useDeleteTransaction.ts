import { useMutation } from "@apollo/client/react"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/Transaction"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category"
import { toast } from "sonner"

export function useDeleteTransaction(
  transactionId: string,
  onSuccess?: () => void
) {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação deletada com sucesso")
      onSuccess?.()
    },
    onError() {
      toast.error("Falha ao deletar a transação")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  const handleDelete = () => {
    return deleteTransaction({
      variables: {
        deleteTransactionId: transactionId,
      },
    })
  }

  return { handleDelete, loading }
}