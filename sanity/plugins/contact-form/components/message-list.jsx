import { useState } from 'react';
import MessageCard from './message-card';
import { Stack, Flex, Heading, TabList, Tab, TabPanel, Container } from '@sanity/ui';

export default function MessageList({ 
  messages, 
  deleteMessage, 
  starMessage, 
  readMessage 
}) {

  const [currentTab, setCurrentTab] = useState('Unread')

  return (
    <Container style={{ marginTop: '60px' }}>
      <Flex align="center" justify="space-between">
        <Heading>
          {currentTab} Messages
        </Heading>
        <MessageTabList 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab}
        />
      </Flex>
      <MessageTabPanels 
        currentTab={currentTab} 
        messages={messages} 
        deleteMessage={deleteMessage} 
        starMessage={starMessage}
        readMessage={readMessage}
      />
    </Container>
  )
}

function MessageTabList({ currentTab, setCurrentTab }) {
  return (
    <TabList space={3}>
      <Tab
        aria-controls="preview-panel"
        id="preview-tab"
        label="Unread"
        onClick={() => setCurrentTab('Unread')}
        selected={currentTab === 'Unread'}
        space={2}
      />
      <Tab
        aria-controls="preview-panel"
        id="preview-tab"
        label="Starred"
        onClick={() => setCurrentTab('Starred')}
        selected={currentTab === 'Starred'}
        space={2}
      />
      <Tab
        aria-controls="content-panel"
        id="content-tab"
        label="All Messages"
        onClick={() => setCurrentTab('All')}
        selected={currentTab === 'All'}
        space={2}
      />
    </TabList>
  )
}
 
function MessageTabPanels({ 
  currentTab, 
  messages, 
  deleteMessage, 
  starMessage, 
  readMessage 
}) {
  return (
    <>
      <TabPanel
        id="unread-panel"
        aria-labelledby="unread-tab"
        hidden={currentTab !== 'Unread'}
      >
        <UnreadMessages 
          messages={messages} 
          deleteMessage={deleteMessage} 
          starMessage={starMessage} 
          readMessage={readMessage}
        />
      </TabPanel>
      <TabPanel
        id="starred-panel"
        aria-labelledby="starred-tab"
        hidden={currentTab !== 'Starred'}
      >
        <StarredMessages 
          messages={messages} 
          deleteMessage={deleteMessage} 
          starMessage={starMessage}
          readMessage={readMessage} 
        />
      </TabPanel>
      <TabPanel
        id="all-messages-panel"
        aria-labelledby="all-messages-tab"
        hidden={currentTab !== 'All'}
      >
        <AllMessages 
          messages={messages} 
          deleteMessage={deleteMessage} 
          starMessage={starMessage}
          readMessage={readMessage} 
        />
      </TabPanel>
    </>
  )
}

function AllMessages({ messages, deleteMessage, starMessage, readMessage }) {
  return (
    <Stack
      space={3}
      padding={[3]}
      style={{ 
        marginTop: '18px',
        border: '1px solid #2A2D3F',
        backgroundColor: '#0D0E13',
        borderRadius: '4px'
      }}
    >
      {messages?.length === 0 ? (
        <Heading style={{ padding: '20px', fontSize: '14px' }}>
          You have no messages
        </Heading>
      ) : (
        <>
          {messages?.map((message) => (
            <MessageCard 
              key={message._id} 
              message={message}
              deleteMessage={deleteMessage} 
              starMessage={starMessage}
              readMessage={readMessage}
            />
          ))}
        </>
      )}
    </Stack>
  )
}

function StarredMessages({ messages, deleteMessage, starMessage, readMessage }) {

  const starredMessages = messages.filter(message => message.starred === true)

  return (
    <Stack
      space={3}
      padding={[3]}
      style={{ 
        marginTop: '18px',
        border: '1px solid #2A2D3F',
        backgroundColor: '#0D0E13',
        borderRadius: '4px'
      }}
    >
      {starredMessages?.length === 0 ? (
        <Heading style={{ padding: '20px', fontSize: '14px' }}>
          No starred messages
        </Heading>
      ) : (
        <>
          {starredMessages?.map((message) => (
            <MessageCard 
              key={message._id} 
              message={message}
              deleteMessage={deleteMessage} 
              starMessage={starMessage}
              readMessage={readMessage}
            />
          ))}
        </>
      )}
    </Stack>
  )
}

function UnreadMessages({ messages, deleteMessage, starMessage, readMessage }) {

  const unreadMessages = messages.filter(message => message.read === false)

  return (
    <Stack
      space={3}
      padding={[3]}
      style={{ 
        marginTop: '18px',
        border: '1px solid #2A2D3F',
        backgroundColor: '#0D0E13',
        borderRadius: '4px'
      }}
    >
      {unreadMessages?.length === 0 ? (
        <Heading style={{ padding: '20px', fontSize: '14px' }}>
          No unread messages
        </Heading>
      ) : (
        <>
          {unreadMessages?.map((message) => (
            <MessageCard 
              key={message._id} 
              message={message}
              deleteMessage={deleteMessage} 
              starMessage={starMessage}
              readMessage={readMessage}
            />
          ))}
        </>
      )}
    </Stack>
  )
}

