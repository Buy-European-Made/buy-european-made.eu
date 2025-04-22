import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const { s } = await req.json()
  const searchResult = await payload.find({
    collection: 'eu-products',
    limit: 100,
    where: {
      or: [
        {
          name: {
            contains: s,
          },
        },
        {
          description: {
            contains: s,
          },
        },
        {
          'tags.name': {
            contains: s,
          },
        },
      ],
    },
  })
  return Response.json(searchResult.docs)
}
