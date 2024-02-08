import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'
import { messagesPlugin } from './sanity/plugins/messages/plugin';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const title = 'Messages Plugin | Demo'

const config = defineConfig({
  projectId: projectId,
  dataset: dataset,
  title: title,
  apiVersion: apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool(),
    messagesPlugin()
  ],
  useCdn: false
})

export default config