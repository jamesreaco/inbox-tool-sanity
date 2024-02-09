# Inbox Tool

Sanity Studio Tool that lets you view and manage form submissions from your website. 

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

Once you're set up, open your terminal again and run `npm run dev` to start up the development server.

## Usage

Once you have started the development server open your browser and navigate to `http://localhost:3000`. Here you will see a basic form which is coming from the `form.jsx` component located in the `components` folder.

When the form is submitted all the logic and creation of a new document is handled in `/api/submit-message`. The reason we are doing this inside a route handler and not directly in the `form.jsx` component is because to create a new document using Sanity's HTTP API, you'll need to authenticate each request with an API Token which should never be exposed to the client.

By default Sanity gives unauthenticated users read access to documents in public datasets. Our `message` document is going to contain private information that needs to be protected. To do this we create our document under a sub-path by adding a `.` to the ID. In our example we add `message.` to the `_id` attribute when defining our `create` mutation which is then used as a prefix for a new, random, unqiue ID. For example, `message.` might generate `message.s4tZYDUyXCCef1YpYu6Js5`. 

The important thing to know here is that when you create a custom `_id`, documents under a sub-path (i.e. containing a . in the ID) are not publicly available.

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

