import { IconShape, IconVariant } from "@/components/ui/icon-badge"

export interface BadgeConfig {
  shape: IconShape;
  variant: IconVariant;
  glowColor: string;
  tooltip: string;
}

const badgeConfigs: Record<string, BadgeConfig> = {
  devnet: { shape: "devnet", variant: "pink", glowColor: 'rgba(255, 0, 242, 1)', tooltip: "Разработчик NETcord" },
  moderator: { shape: "moderator", variant: "blue", glowColor: 'rgba(0, 3, 255, 1)', tooltip: "Модератор" },
  netsub: { shape: "netsub", variant: "yellow", glowColor: 'rgba(255, 252, 0, 1)', tooltip: "NETsub" },
  crystal: { shape: "crystal", variant: "red", glowColor: "rgba(255, 0, 0, 1)", tooltip: "Кристаллизатор сервера" },
  dev: { shape: "dev", variant: "green", glowColor: 'rgba(0, 255, 24, 1)', tooltip: "Разработчик приложений" },
};

export function getBadgeConfig(badgeName: string): BadgeConfig | undefined {
  return badgeConfigs[badgeName];
}

export function addNewBadge(badgeName: string, config: BadgeConfig): void {
  badgeConfigs[badgeName] = config;
}