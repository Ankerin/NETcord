import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface AuthorizationCardProps {
  onChangePassword: () => Promise<void>;
  currentPassword: string;
  setCurrentPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
}

export function AuthorizationCard({
  onChangePassword,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword
}: AuthorizationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Текущий пароль</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">Новый пароль</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <Button onClick={onChangePassword}>Изменить пароль</Button>
      </CardContent>
    </Card>
  )
}