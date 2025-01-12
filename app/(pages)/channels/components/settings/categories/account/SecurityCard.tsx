import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function SecurityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Безопасность</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
          <Switch id="two-factor" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="login-alerts">Оповещения о входе</Label>
          <Switch id="login-alerts" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="data-sharing">Обмен данными</Label>
          <Switch id="data-sharing" />
        </div>
      </CardContent>
    </Card>
  )
}