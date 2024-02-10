# Inbox Tool

I've been working on a fun little project recently and thought I would share it with the community! A Sanity plugin that lets you view and manage form submissions via a handy Studio Tool. 

<img src="https://f000.backblazeb2.com/file/jamesrea/Screenshot+2024-02-10+at+1.12.29%E2%80%AFPM.png"/>

## Features ⚡️

- Studio Tool to view submissions.
- Custom dialog to view a message and all its fields.
- Star important messages.
- Delete spam and unwanted messages.
- New messages are moved out of unread folder once viewed.

## Installation

To get started, you'll need to clone this GitHub repository locally, open it up in your code editor and then run `npm install` in the terminal to install the required dependencies.

## Environment Settings

Create a `.env.local` file at the root of the project and add the following environment variables.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET=""
NEXT_PUBLIC_SANITY_API_VERSION=""
SANITY_API_TOKEN=""
```

Once you have added your environment variables, open your terminal again and run `npm run dev` to start the development server.

## Usage

Open your browser and navigate to `http://localhost:3000`. Here you will see a basic form, fill out the fields, hit submit and then navigate to `http://localhost:3000/studio/inbox-tool` to see your form submission.

## Important Details

### Creating documents using the HTTP API

To create a document using the Sanity HTTP API requests must be authenticated with an API Token. This token should be kept safe and never exposed to the client and so we make the request in the `/api/submit-message` route handler.

### Keeping data safe

By default Sanity gives unauthenticated users read access to documents in public datasets. Our `message` document is going to contain personal information that needs to be kept private. To disable this behavior we add a `message.` prefix to the `_id` when defining our `create` mutation in `form.jsx`. This will generate a new, random, unique `_id` such as `message.s4tZYDUyXCCef1YpYu6Js5`. 

The important thing to know here is that documents under a sub-path (i.e. containing a `.` in the `_id`) are not publicly available and can only be read with a Token.

```javascript
// components/form.jsx
const mutations = [{
  create: {
    _id: 'message.',
    _type: 'message', 
    read: false,
    starred: false,
    name: name,
    email: email,
    subject: subject,
    fields: [
      {
        _key: generateID(),
        name: 'Occupation',
        value: occupation
      },
      {
        _key: generateID(),
        name: 'Message',
        value: message
      }
    ]
  }
}]
```

## Author

#### James Rea

- Twitter ([@jamesreaco](https://twitter.com/jamesreaco))
- Website ([jamesrea.co](https://jamesrea.co))

For business enquiries, you can email me at hello@jamesrea.co.

