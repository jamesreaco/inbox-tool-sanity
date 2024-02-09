import { definePlugin } from 'sanity';
import { message } from './schema';
import InboxTool from './components/inbox-tool';

const inboxTool = () => {
  return {
    title: 'Inbox',
    name: 'inbox-tool',
    component: () => (
      InboxTool()
    ),
  }
}

export const contactFormPlugin = definePlugin({
  name: 'contact-form-plugin',
  schema: {
    types: [ message ],
  },
  tools: [ 
    inboxTool() 
  ],
});

