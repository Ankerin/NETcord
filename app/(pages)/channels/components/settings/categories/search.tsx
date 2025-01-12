"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface SearchSettingsProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchSettings({ value, onChange }: SearchSettingsProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Поиск настроек..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8"
        type="text"
        autoComplete="off"
        aria-autocomplete="none"
      />
    </div>
  )
}
