'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/hooks/use-toast'
import { ErrorLoadUserData } from '@/components/errors/errors'
import LoadingUserData from '@/components/loading/LoadingUserData'
import { UserProfileCard } from './account/UserProfileCard'
import { SecurityCard } from './account/SecurityCard'
import { AuthorizationCard } from './account/AuthorizationCard'
import { BackupCard } from './account/BackupCard'
import { DeleteAccountCard } from './account/DeleteAccountCard'
import api from '@/utils/api'
import { useAuth } from '@/hooks/useAuth'
import { AxiosError } from 'axios'

interface UserData {
  id: string
  email: string
  nickname: string
  username: string
  number: string
  isVerified: boolean
  avatarUrl: string
  bannerUrl: string
  badges: string[]
}

export function AccountSettings() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();
  const { isAuthenticated, requireAuth, logout, refreshToken } = useAuth();

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/account');
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast({
            title: "Ошибка",
            description: "Пользователь не найден. Пожалуйста, войдите снова.",
            variant: "destructive",
          });
          logout();
        } else if (error.response?.status === 401) {
          toast({
            title: "Ошибка аутентификации",
            description: "Сессия истекла. Пожалуйста, войдите снова.",
            variant: "destructive",
          });
          await refreshToken();
          fetchUserData(); // Retry fetching user data after token refresh
        } else {
          toast({
            title: "Ошибка",
            description: "Не удалось загрузить данные пользователя. Пожалуйста, попробуйте позже.",
            variant: "destructive",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [refreshToken, logout]);

  useEffect(() => {
    if (isAuthenticated && !userData) {
      fetchUserData();
    }
  }, [isAuthenticated, userData, fetchUserData]);

  const updateUserData = async (field: keyof UserData, value: string, password: string) => {
    if (!userData) return;
    try {
      const response = await api.put('/api/account', { [field]: value, password });
      setUserData(response.data);
      toast({
        title: "Успех",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} успешно обновлено.`,
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные пользователя. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const changePassword = async () => {
    try {
      await api.post('/api/account/change-password', { currentPassword, newPassword });
      toast({
        title: "Успех",
        description: "Пароль успешно изменен.",
      });
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить пароль. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  const deleteAccount = async () => {
    if (!confirm('Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.')) return;
    try {
      await api.delete('/api/account');
      toast({
        title: "Аккаунт удален",
        description: "Ваш аккаунт был успешно удален.",
      });
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить аккаунт. Пожалуйста, попробуйте еще раз.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <LoadingUserData />;
  }

  if (!userData) {
    return <ErrorLoadUserData />;
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col p-4 md:p-6">
      <Card className="mb-4 w-full">
        <CardHeader>
          <CardTitle>Аккаунт</CardTitle>
          <CardDescription>Управляйте настройками вашего аккаунта</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex gap-6">
        <Card className="flex-1">
          <CardContent className="h-[calc(100vh-12rem)] p-4 md:p-6">
            <ScrollArea className="h-full pr-2">
              <div className="space-y-4">
                <SecurityCard />
                <AuthorizationCard
                  onChangePassword={changePassword}
                  currentPassword={currentPassword}
                  setCurrentPassword={setCurrentPassword}
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                />
                <BackupCard />
                <DeleteAccountCard onDelete={deleteAccount} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <UserProfileCard userData={userData} onUpdate={updateUserData} />
      </div>
    </div>
  );
}

export default AccountSettings;