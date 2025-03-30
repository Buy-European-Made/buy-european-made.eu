// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { EuProducts } from './collections/EuProducts'
import { ReplacedProducts } from './collections/ReplacedProducts'
import { Subcategories } from './collections/Subcategories'
import { Countries } from './collections/Countries'
import { Footer } from './Footer/config'
import { Header } from './Header/config'

import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Companies } from './collections/Companies'
import { Brands } from './collections/Brands'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    // https://saimana.com/list-of-country-locale-code/
    locales: [
      {
        label: 'Albanian',
        code: 'sq_AL',
      },
      {
        label: 'Bulgarian',
        code: 'bg_BG',
      },
      {
        label: 'Croatian',
        code: 'hr_HR',
      },
      {
        label: 'Czech',
        code: 'cs_CZ',
      },
      {
        label: 'Danish',
        code: 'da_DK',
      },
      {
        label: 'English',
        code: 'en_GB',
      },
      {
        label: 'Estonian',
        code: 'et_EE',
      },
      {
        label: 'Finish',
        code: 'fi_FI',
      },
      {
        label: 'French',
        code: 'fr_FR',
      },
      {
        label: 'German',
        code: 'de_DE',
      },
      {
        label: 'Greek',
        code: 'el_GR',
      },
      {
        label: 'Hungarian',
        code: 'hu_HU',
      },
      {
        label: 'Icelandic',
        code: 'is_IS',
      },
      {
        label: 'Italian',
        code: 'it_IT',
      },
      {
        label: 'Latvian',
        code: 'lv_LV',
      },
      {
        label: 'Lithuanian',
        code: 'lt_LT',
      },
      {
        label: 'Macedonian',
        code: 'mk_MK',
      },
      {
        label: 'Malta',
        code: 'mt_MT',
      },
      {
        label: 'Norwegian',
        code: 'no_NO',
      },
      {
        label: 'Polish',
        code: 'pl_PL',
      },
      {
        label: 'Portugese',
        code: 'pt_PT',
      },
      {
        label: 'Romanian',
        code: 'ro_RO',
      },
      {
        label: 'Serbian',
        code: 'sr_RS',
      },
      {
        label: 'Slovenian',
        code: 'sl_SI',
      },
      {
        label: 'Spanish',
        code: 'es_ES',
      },
      {
        label: 'Swedish',
        code: 'sv_SE',
      },
      {
        label: 'Ukrainian',
        code: 'uk_UA',
      },
    ],
    defaultLocale: 'en_GB',
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Pages,
    Media,
    Categories,
    Subcategories,
    Tags,
    Users,
    EuProducts,
    ReplacedProducts,
    Companies,
    Brands,
    Countries
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
