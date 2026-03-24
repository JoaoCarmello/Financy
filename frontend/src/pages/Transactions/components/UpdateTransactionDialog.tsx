import { Combobox } from "../../../components/Combobox/index.tsx"
import { Card } from "../../../components/ui/card.tsx"
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category.ts"
import { Category, Transaction } from "../../../@types/index.ts"
import { useQuery } from "@apollo/client/react"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog.tsx"
import { Input } from "../../../components/ui/input.tsx"
import { Label } from "../../../components/ui/label.tsx"
import { useUpdateTransaction } from "@/hooks/Transaction/useUpdateTransaction"

interface UpdateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated?: () => void
  transaction: Transaction
}

export function UpdateTransactionDialog({
  open,
  onOpenChange,
  onUpdated,
  transaction,
}: UpdateTransactionDialogProps) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")

   
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDescription(transaction.description || "")
    setAmount(transaction.amount?.toString() || "")
    setDate(
      transaction.date
        ? new Date(transaction.date).toISOString().substring(0, 10)
        : ""
    )
    setType(transaction.type || "")
    setCategory(transaction.category?.id || "")
  }, [transaction])

  const { data } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)

  const categories =
    data?.listCategories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || []

  const { updateTransaction, loading } = useUpdateTransaction(() => {
    onOpenChange(false)
    onUpdated?.()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!category || !type || !amount || !description || !date) {
      toast.error("Preencha todos os campos")
      return
    }

    const findCategory = data?.listCategories.find(
      (cat) => cat.id === category
    )

    updateTransaction({
      variables: {
        updateTransactionId: transaction.id,
        categoryId: findCategory?.id,
        data: {
          description,
          amount: Number(amount),
          date: new Date(date),
          type,
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Atualizar transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Atualize sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Card className="p-2 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={type === "E" ? "default" : "ghost"}
                onClick={() => setType("E")}
                className={`bg-transparent hover:bg-gray-100 ${
                  type === "E"
                    ? "text-gray-800 border border-green-base"
                    : ""
                }`}
              >
                <CircleArrowUp
                  size={16}
                  className={`${
                    type === "E" ? "text-green-base" : "text-gray-400"
                  }`}
                />
                Receita
              </Button>

              <Button
                type="button"
                variant={type === "S" ? "default" : "ghost"}
                onClick={() => setType("S")}
                className={`bg-transparent hover:bg-gray-100 ${
                  type === "S"
                    ? "text-gray-800 border border-red-base"
                    : ""
                }`}
              >
                <CircleArrowDown
                  size={16}
                  className={`${
                    type === "S" ? "text-red-base" : "text-gray-400"
                  }`}
                />
                Despesa
              </Button>
            </Card>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal">
              Descrição
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="date" className="text-sm font-normal">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amount" className="text-sm font-normal">
              Valor
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="category" className="text-sm font-normal">
              Categoria
            </Label>
            <Combobox
              items={categories}
              value={category}
              setType={setCategory}
            />
          </div>

          <Button type="submit" disabled={loading}>
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}