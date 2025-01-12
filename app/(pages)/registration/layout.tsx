import { Metadata } from "next";
import { regPageConfig } from "./config";

export const metadata: Metadata = {
  title: `${regPageConfig.name}`,
  description: `${regPageConfig.description}`,
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}