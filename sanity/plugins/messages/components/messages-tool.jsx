import { useClient } from 'sanity'
import { ToastProvider, useToast, Spinner, Card, Text, Container, Stack, Flex } from '@sanity/ui';
import { useListeningQuery } from 'sanity-plugin-utils'
import MessageList from './message-list';

export default function MessagesTool() {

  const toast = useToast()
  const client = useClient({ apiVersion: "2024-08-02" })
  
  const { 
    data: messages, 
    loading, 
    error 
  } = useListeningQuery(`*[_type == 'messages'] | order(_createdAt desc)`, {
    initialValue: [],
  })

  async function deleteMessage(message) {
    try {
      await client
        .delete(message._id)
        .then(() => {
          toast.push({
            status: 'success',
            title: 'Message Deleted',
          })
        })
      } catch (error) {
        toast.push({
          status: 'error',
          title: 'Failed to Delete Message',
        })
      }
  }

  async function starMessage(message) {

    const isStarred = !message.starred

    try {
      await client
        .patch(message._id)
        .set({ starred: isStarred })
        .commit()
        .then(() => {
          toast.push({
            status: 'success',
            title: `Message ${message.starred ? 'Unstarred' : 'Starred'}`,
          })
        })
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Failed to Star Message',
      })
    }
  }

  async function readMessage(message) {
    try {
      await client
        .patch(message._id)
        .set({ read: true })
        .commit()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Failed to Load Message',
      })
    }
  }

  if (loading) return <LoadingView />
  if (error) return <ErrorView />

  return (
    <ToastProvider>
      <MessageList 
        messages={messages} 
        deleteMessage={deleteMessage}
        starMessage={starMessage}
        readMessage={readMessage}
      />
    </ToastProvider>
  )
}

function LoadingView() {
  return (
    <Container style={{ marginTop: '60px' }}>
      <Card
        padding={4}
        radius={2}
        shadow={1}
        tone="positive"
      >
        <Flex 
          gap={4}
          align="center" 
          justify="center"
        >
          <Text 
            align="center" 
            size={3}
          >
            Loading Messages
          </Text>
          <Spinner muted />
        </Flex>
      </Card>
    </Container>
  )
}

function ErrorView() {
  return (
    <Container style={{ marginTop: '60px' }}>
      <Card
        padding={4}
        radius={2}
        shadow={1}
        tone="critical"
      >
        <Stack space={2}>
          <Text 
            align="center" 
            size={3}
          >
            Error Loading Messages
          </Text>
          <Text 
            align="center" 
            size={2}
          >
            Please try again later
          </Text>
        </Stack>
      </Card>
    </Container>
  )
}