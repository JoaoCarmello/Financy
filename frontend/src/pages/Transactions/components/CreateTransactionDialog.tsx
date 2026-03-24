import { Combobox } from "@/components/Combobox/index.tsx"
import { Card } from "@/components/ui/card.tsx"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category.ts"
import { Category } from "@/@types/index.ts"
import { useQuery } from "@apollo/client/react"
import { CircleArrowDown, CircleArrowUp } from "lucide-react"
import React, { useState } from "react"
import { useCreateTransaction } from "@/hooks/Transaction/useCreateTransaction"
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

interface CreateTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateTransactionDialogProps) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")

  const { data } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const categories =
    data?.listCategories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || []
    
  const { createTransaction, loading } = useCreateTransaction(() => {
    onOpenChange(false)
    onCreated?.()
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

    createTransaction({
      variables: {
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
            Nova transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Card className="p-2 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={type === "E" ? "default" : "ghost"}
                onClick={() => setType("E")}
              >
                <CircleArrowUp size={16} />
                Receita
              </Button>

              <Button
                type="button"
                variant={type === "S" ? "default" : "ghost"}
                onClick={() => setType("S")}
              >
                <CircleArrowDown size={16} />
                Despesa
              </Button>
            </Card>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
              type="date"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label>Categoria</Label>
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