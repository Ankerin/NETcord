import { redirect } from 'next/navigation'

export default function SettingsPage() {
  redirect('/channels/me')
}