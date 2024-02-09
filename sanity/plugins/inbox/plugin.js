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

export const inboxPlugin = definePlugin({
  name: 'inbox-plugin',
  schema: {
    types: [ message ],
  },
  tools: [ 
    inboxTool() 
  ],
});

