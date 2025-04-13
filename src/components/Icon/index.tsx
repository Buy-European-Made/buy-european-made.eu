import * as LucideIcons from 'lucide-react'

interface IconProps {
  iconName: string
  className?: string
}

export const Icon: React.FC<IconProps> = ({ iconName, className = '' }) => {
  const icons = LucideIcons as unknown as Record<string, React.FC<{ className?: string }>>
  const IconComponent = icons[iconName]

  if (IconComponent) {
    return <IconComponent className={className} />
  }

  return null
}
