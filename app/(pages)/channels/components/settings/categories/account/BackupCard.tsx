import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function BackupCard() {
  const handleBackup = () => {
    // Implement backup functionality here
    console.log('Backup initiated');
  };

  const handleRestore = () => {
    // Implement restore functionality here
    console.log('Restore initiated');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Резервное копирование и восстановление</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Button onClick={handleBackup} className="w-full mb-2">Создать резервную копию</Button>
          <p className="text-sm text-gray-500">Создайте резервную копию ваших данных</p>
        </div>
        <div>
          <Button onClick={handleRestore} variant="outline" className="w-full mb-2">Восстановить из резервной копии</Button>
          <p className="text-sm text-gray-500">Восстановите ваши данные из предыдущей резервной копии</p>
        </div>
      </CardContent>
    </Card>
  )
}