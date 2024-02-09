import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'
import { inboxPlugin } from './sanity/plugins/inbox/plugin';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const title = 'Inbox Plugin | Demo'

const config = defineConfig({
  projectId: projectId,
  dataset: dataset,
  title: title,
  apiVersion: apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool(),
    inboxPlugin()
  ],
  useCdn: false
})

export default config