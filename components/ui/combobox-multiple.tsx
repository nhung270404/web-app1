"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ComboboxItem = {
  value: string
  label: string
  [key: string]: any
}

interface ComboboxMultipleProps {
  items: ComboboxItem[]
  selectedItems: ComboboxItem[]
  onChange: (items: ComboboxItem[]) => void
  placeholder?: string
  emptyText?: string
  searchPlaceholder?: string
  disabled?: boolean
  onCreateNew?: () => void
  createNewText?: string
  className?: string
  showCreateButton?: boolean
}

export function ComboboxMultiple({
  items,
  selectedItems,
  onChange,
  placeholder = "Chọn mục...",
  emptyText = "Không tìm thấy kết quả",
  searchPlaceholder = "Tìm kiếm...",
  disabled = false,
  onCreateNew,
  createNewText = "Tạo mới",
  className,
  showCreateButton = false,
}: ComboboxMultipleProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filteredItems = React.useMemo(() => {
    if (!search) return items
    return items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [items, search])

  const isSame = (a?: string, b?: string) => String(a ?? "") === String(b ?? "")

  const handleSelect = (item: ComboboxItem) => {
    const isSelected = selectedItems.some((i) => isSame(i.value, item.value))
    if (isSelected) {
      onChange(selectedItems.filter((i) => !isSame(i.value, item.value)))
    } else {
      onChange([...selectedItems, item])
    }
  }

  const handleRemove = (item: ComboboxItem) => {
    onChange(selectedItems.filter((i) => !isSame(i.value, item.value)))
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              !selectedItems.length && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            {selectedItems.length > 0
              ? `${selectedItems.length} mục đã chọn`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          // Tăng z-index và bật pointer events để không bị lớp dưới “ăn” click
          className={cn(
            "z-[1000] pointer-events-auto p-0",
            // Đặt width theo trigger của radix để đúng kích thước
            "w-[var(--radix-popover-trigger-width)]"
          )}
          align="start"
          side="bottom"
        >
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder} 
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>
                {emptyText}
                {showCreateButton && onCreateNew && (
                  <Button
                    variant="ghost"
                    className="mt-2 w-full justify-start"
                    onClick={() => {
                      setOpen(false)
                      onCreateNew()
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {createNewText}
                  </Button>
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredItems.map((item) => {
                  const selected = selectedItems.some(
                    (i) => isSame(i.value, item.value)
                  )
                  return (
                    <CommandItem
                      className={"cursor-pointer"}
                      key={String(item.value)}
                      value={String(item.value)}
                      onSelect={() => handleSelect(item)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  )
                })}
                {showCreateButton && onCreateNew && (
                  <CommandItem
                    className={"cursor-pointer"}
                    onSelect={() => {
                      setOpen(false)
                      onCreateNew()
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {createNewText}
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <Badge key={String(item.value)} variant="secondary" className="flex items-center gap-1">
              {item.label}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleRemove(item)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
