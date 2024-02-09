export const message = {
  type: 'document',
  name: 'message',
  title: 'Messages',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
    {
      type: 'string',
      name: 'email',
      title: 'Email',
    },
    {
      type: 'text',
      name: 'subject',
      title: 'Subject',
    },
    {
      type: 'array',
      name: 'fields',
      title: 'Fields',
      of: [
        {
          type: 'object',
          name: 'field',
          title: 'Field',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'string',
              name: 'value',
              title: 'Value',
            },
          ]
        }
      ]
    },
    {
      type: 'boolean',
      name: 'read',
      title: 'Read',
      initialValue: false,
    },
    {
      type: 'boolean',
      name: 'starred',
      title: 'Starred',
    },
  ]
}