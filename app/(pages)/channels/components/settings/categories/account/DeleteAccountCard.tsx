import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DeleteAccountCardProps {
  onDelete: () => Promise<void>;
}

export function DeleteAccountCard({ onDelete }: DeleteAccountCardProps) {
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = () => {
    if (confirmText === 'DELETE') {
      onDelete();
    } else {
      alert('Пожалуйста, введите DELETE для подтверждения');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Удаление аккаунта</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Внимание: Удаление аккаунта - необратимое действие. Все ваши данные будут удалены.
        </p>
        <div className="space-y-2">
          <Label htmlFor="confirm-delete">Введите DELETE для подтверждения</Label>
          <Input
            id="confirm-delete"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </div>
        <Button onClick={handleDelete} variant="destructive">Удалить аккаунт</Button>
      </CardContent>
    </Card>
  )
}