import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign } from 'lucide-react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function EmailInput({ value, onChange, disabled }: EmailInputProps) {
  return (
    <div className="group relative">
      <Label
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-card px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        Электронная почта
      </Label>
      <div className="relative">
        <Input
          id="input-09"
          className="peer ps-9"
          placeholder="Email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <AtSign size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}