import type { StatsBlock as StatsBlockProps } from 'src/payload-types'
import React from 'react'
import { Paragraph, H3, H4, Muted } from '@/components/ui/typography'
import * as LucideIcons from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type Props = StatsBlockProps

interface LucideIconProps {
  iconName: string
  className?: string
}

export const LucideIcon: React.FC<LucideIconProps> = ({ iconName, className = '' }) => {
  const icons = LucideIcons as unknown as Record<string, React.FC<{ className?: string }>>
  const IconComponent = icons[iconName]

  if (IconComponent) {
    return <IconComponent className={className} />
  }

  return null
}

export const StatsBlock: React.FC<Props> = ({ title, subtitle, stats }) => {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto mb-16 text-center">
        <H3 className="mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
          {title}
        </H3>
        {subtitle && (
          <Paragraph className="max-w-2xl mx-auto text-muted-foreground/90">{subtitle}</Paragraph>
        )}
      </div>

      <div className="relative flex flex-wrap gap-8 max-w-5xl mx-auto justify-center">
        {stats?.map((stat) => (
          <Card
            key={stat.label}
            className="h-full border-none bg-transparent shadow-none ring-1 ring-primary/20 hover:shadow-lg hover:border-primary/20 transition-all duration-300 rounded-xl max-w-64 w-full"
          >
            <CardHeader className="pb-3 space-y-4">
              <div className="flex flex-col items-center">
                {stat.icon && (
                  <div className="rounded-xl p-3 bg-primary/10 ring-1 ring-primary/20 mb-4">
                    <LucideIcon iconName={stat.icon} className="w-7 h-7 text-primary" />
                  </div>
                )}
                <div className="text-4xl font-bold tracking-tight">
                  {stat.number}
                  {stat.suffix}
                </div>
                <H4 className="mb-1 text-foreground/90 text-center">{stat.label}</H4>
              </div>
            </CardHeader>
            <CardContent>
              <Muted className="text-base leading-relaxed text-center">{stat.description}</Muted>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
