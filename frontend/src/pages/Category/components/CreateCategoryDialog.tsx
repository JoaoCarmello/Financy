import Icons from "@/components/Icons/index.tsx"
import { Card } from "@/components/ui/card.tsx"
import { colors, colorVariantsCreateCategory } from "@/utils/index.ts"
import React, { useState } from "react"
import { useCreateCategory } from "@/hooks/Category/useCreateCategory"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated?: () => void
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  onCreated,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("")
  const [icon, setIcon] = useState("")

  const { createCategory, loading } = useCreateCategory(() => {
    onOpenChange(false)
    onCreated?.()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createCategory({
      variables: {
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
    setName("")
    setDescription("")
    setColor("")
    setIcon("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold leading-tight">
            Nova categoria
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-normal">
              Título
            </Label>
            <Input
              id="name"
              placeholder="Ex. Alimentação"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description" className="text-sm font-normal">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-normal">Ícone</Label>
            <div className="grid grid-cols-8 gap-2 mb-2">
              {Object.entries(Icons)
                .filter(([key]) => key !== "Question")
                .map(([key, IconComponent]) => (
                  <Card
                    key={key}
                    className={`p-2 border rounded ${
                      icon === key ? "border-brand-base" : "border-transparent"
                    }`}
                  >
                    <button type="button" onClick={() => setIcon(key)}>
                      <IconComponent />
                    </button>
                  </Card>
                ))}
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-normal">Cor</Label>
            <div className="flex flex-wrap gap-2 mb-2">
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
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}