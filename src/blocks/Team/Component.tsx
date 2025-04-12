import type { TeamBlock as TeamBlockProps } from 'src/payload-types'
import React from 'react'
import { Paragraph, H3 } from '@/components/ui/typography'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Media } from '@/components/Media'

type Props = TeamBlockProps

export const TeamBlock: React.FC<Props> = ({ title, subtitle, members }) => {
  return (
    <section className="mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <H3>{title}</H3>
        {subtitle && <Paragraph>{subtitle}</Paragraph>}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto justify-items-center">
        {members?.map((member) => (
          <Card key={member.name} className="rounded-xl max-w-80 py-4">
            <CardHeader className="flex flex-col items-center">
              <Media
                imgClassName="h-32 w-32 border border-border rounded-full object-cover bg-background mb-4"
                resource={member.image}
              />
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <Paragraph className="text-center">{member.quote}</Paragraph>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
