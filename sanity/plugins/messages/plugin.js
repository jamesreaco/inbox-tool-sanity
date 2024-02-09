import { definePlugin } from 'sanity';
import { messagesSchema } from './schema';
import MessagesTool from './components';

const messagesTool = () => {
  return {
    title: 'Messages',
    name: 'messages-tool',
    component: () => (
      MessagesTool()
    ),
  }
}

export const messagesPlugin = definePlugin({
  name: 'messages-plugin',
  schema: {
    types: [ messagesSchema ],
  },
  tools: [ 
    messagesTool() 
  ],
});

