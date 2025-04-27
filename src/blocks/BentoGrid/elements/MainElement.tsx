import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { SecondaryElementProps } from './SecondaryElement'

type Props = {
  content?: string
} & SecondaryElementProps

function MainElement({ title, content, link, bgImage, textWidth, fontColor }: Props) {
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
          <div className="flex justify-center items-center">
            <CardContent className="p-0">{content}</CardContent>
          </div>
        </div>
      </Card>
    </>
  )
}

export default MainElement
