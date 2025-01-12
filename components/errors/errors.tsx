"use client";

import Error404 from "@/components/errors/404-error";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Error500 from "./500-error";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function NotFound404() {

  const router = useRouter();

  return (
    <div>
      <Error404/>
    <div className="flex items-center justify-center h-screen backdrop-blur-sm">
      <Card className="w-[500px] h-[200px] text-white">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>404</CardTitle>
          <CardDescription>Page not found</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="flex gap-2">
              <h1 className="text-primary">404</h1>
              <Separator orientation="vertical" className="h-6"/>
              <h1 className="text-primary">Страница не найдена</h1>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button variant="outline" onClick={() => router.back()}>Назад</Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}

export function ErrorLoadUserData() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-[500px] h-[200px] text-foreground">
          <CardHeader className="flex items-center justify-center">
            <CardTitle>500</CardTitle>
            <CardDescription>Internal Server Error</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="flex gap-2">
                <h1 className="text-orange-300">500</h1>
                <Separator orientation="vertical" className="h-6"/>
                <h1 className="text-orange-300">Ошибка на стороне сервера</h1>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}