'use client'

import { IconBadge, IconShape, IconVariant } from "@/components/ui/icon-badge"

interface BadgeConfig {
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

interface IconBadgesRowProps {
  badges: string[];
}

export function IconBadgesRow({ badges }: IconBadgesRowProps) {
  return (
    <div className="flex gap-1 rounded-lg">
      {badges.map((badge) => {
        const config = badgeConfigs[badge];
        if (config) {
          return (
            <IconBadge
              key={badge}
              size="md"
              shape={config.shape}
              variant={config.variant}
              glowColor={config.glowColor}
              glow
              tooltip={config.tooltip}
            />
          );
        }
        return null;
      })}
    </div>
  )
}