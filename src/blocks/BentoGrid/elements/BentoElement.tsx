import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Link } from '@payloadcms/ui'

type Props = {
  title?: string
  link?: string
  bgImage?: string
  textWidth?: string
  fontColor?: string
  content?: string
}

function BentoElement({ title, content, link, bgImage, textWidth, fontColor }: Props) {
  return (
    <>
      <Link href={link || ''}>
        <Card
          className={cn('bg-cover bg-center bg-no-repeat break-words h-full p-4', {
            'text-white': fontColor === 'white',
            'text-black': fontColor === 'black',
          })}
          style={{
            backgroundImage: `url(${bgImage || ''})`,
            borderRadius: '0.5rem',
          }}
        >
          <div
            className={cn('flex flex-col justify-between items-start h-full', {
              'w-full': textWidth === 'full',
              'md:w-1/2': textWidth === 'half',
            })}
          >
            <div className="overflow-hidden w-full">
              <CardTitle className="text-xl md:text-2xl text-ellipsis overflow-hidden whitespace-nowrap md:whitespace-normal w-full ">
                {title}
              </CardTitle>
            </div>
            {content && (
              <div className="flex justify-center items-center">
                <CardContent className="p-0">{content}</CardContent>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </>
  )
}

export default BentoElement
