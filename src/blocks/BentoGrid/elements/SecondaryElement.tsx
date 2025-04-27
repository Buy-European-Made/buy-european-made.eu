import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

export type SecondaryElementProps = {
  title?: string
  link?: string
  bgImage?: string
  textWidth?: string
  fontColor?: string
}

function SecondaryElement({ title, link, bgImage, textWidth, fontColor }: SecondaryElementProps) {
  return (
    <>
      <Card
        className={cn('bg-cover bg-center break-words h-full p-4', {
          'text-white': fontColor === 'white',
          'text-black': fontColor === 'black',
        })}
        style={{
          backgroundImage: `url(${bgImage || ''})`,
          borderRadius: '0.5rem',
        }}
      >
        <div
          className={cn('flex flex-col justify-between items-start h-1/2', {
            'w-full': textWidth === 'full',
            'w-1/2': textWidth === 'half',
          })}
        >
          <div>
            <CardTitle className="lg:text-4xl">{title}</CardTitle>
          </div>
        </div>
      </Card>
    </>
  )
}

export default SecondaryElement
