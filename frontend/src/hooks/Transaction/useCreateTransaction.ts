import { useMutation } from "@apollo/client/react";
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/Transaction";
import { toast } from "sonner";

export function useCreateTransaction(onSuccess?: () => void) {
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    onCompleted() {
      toast.success("Transação criada com sucesso");
      onSuccess?.();
    },
    onError() {
      toast.error("Falha ao criar a transação");
    },
  });

  return { createTransaction, loading };
}