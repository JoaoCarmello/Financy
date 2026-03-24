import Icons from "@/components/Icons/index.tsx"
import { Card } from "@/components/ui/card.tsx"
import { Category } from "@/@types/index.ts"
import { colors, colorVariantsCreateCategory } from "@/utils/index.ts"
import React, { useState } from "react"
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
import { useUpdateCategory } from "@/hooks/Category/useUpdateCategory"

interface UpdateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated?: (category: Category) => void
  category: Category
}

export function UpdateCategoryDialog({
  open,
  onOpenChange,
  onUpdated,
  category,
}: UpdateCategoryDialogProps) {

  const [name, setName] = useState(category.name || "")
  const [description, setDescription] = useState(category.description || "")
  const [color, setColor] = useState(category.color || "")
  const [icon, setIcon] = useState(category.icon || "")

  const { updateCategory, loading } = useUpdateCategory(() => {
    onOpenChange(false)
    onUpdated?.({
      ...category,
      name,
      description,
      color,
      icon,
    })
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !color || !icon) {
      toast.error("Preencha os campos obrigatórios")
      return
    }

    updateCategory({
      variables: {
        updateCategoryId: category.id,
        data: {
          name,
          description,
          color,
          icon,
        },
      },
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog
      key={category.id}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Editar categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Label htmlFor="name">Título</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
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
            <Label>Ícone</Label>
            <div className="grid grid-cols-8 gap-2">
              {Object.entries(Icons)
                .filter(([key]) => key !== "Question")
                .map(([key, IconComponent]) => (
                  <Card
                    key={key}
                    className={`p-2 border rounded ${
                      icon === key
                        ? "border-brand-base"
                        : "border-transparent"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setIcon(key)}
                    >
                      <IconComponent />
                    </button>
                  </Card>
                ))}
            </div>
          </div>

          <div className="space-y-1">
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((colorOption) => (
                <Card
                  key={colorOption}
                  className={`p-1 border rounded cursor-pointer ${
                    color === colorOption
                      ? "border-brand-base"
                      : "border-transparent"
                  }`}
                >
                  <div
                    className={`w-12 h-6 ${colorVariantsCreateCategory[colorOption]}`}
                    onClick={() => setColor(colorOption)}
                  />
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={loading}>
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}