"use client";

import { useToast } from "@/hooks/use-toast";

export const Toasts = () => {
  const { toast } = useToast();

  const showRegistrationErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Oops... Ошибка",
      description: "Пожалуйста, заполните все поля для регистрации.",
    });
  };

  const showPasswordMismatchToast = () => {
    toast({
      variant: "destructive",
      title: "Oops... Ошибка",
      description: "Пароли не совпадают.",
    });
  };

  const showAuthErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Успешно",
      description: "Переадресация...",
    });
  };

  const showAuthErrorToastData = () => {
    toast({
      variant: "destructive",
      title: "Oops... Ошибка",
      description: "Неверный логин или пароль.",
    });
  };

  const showNetworkErrorToast = () => {
    toast({
      variant: "destructive",
      title: "Oops... Ошибка",
      description: "Не удалось отправить запрос. Попробуйте позже.",
    });
  };

  const errorVerifyEmailCode = () => {
    toast({
      variant: "destructive",
      title: "Oops... Ошибка",
      description: "Неверный код подтверждения.",
    });
  };

  const successVerifyEmailCode = () => {
    toast({
      title: "Успешное подтверждение",
      description: "Переадресация...",
    });
  };

  return { 
    showRegistrationErrorToast, 
    showPasswordMismatchToast, 
    showAuthErrorToast, 
    showNetworkErrorToast,
    errorVerifyEmailCode,
    successVerifyEmailCode,
    showAuthErrorToastData
  };
};