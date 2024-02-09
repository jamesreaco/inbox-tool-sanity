import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'
import { contactFormPlugin } from './sanity/plugins/contact-form/plugin';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION
const title = 'Contact Form Plugin | Demo'

const config = defineConfig({
  projectId: projectId,
  dataset: dataset,
  title: title,
  apiVersion: apiVersion,
  basePath: '/studio',
  plugins: [
    structureTool(),
    contactFormPlugin()
  ],
  useCdn: false
})

export default config