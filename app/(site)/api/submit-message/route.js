export async function POST(req) {

  const body = await req.json()

  const API_KEY = process.env.SANITY_API_TOKEN
  const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify(body)  
  };

  const url = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}`
  
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    return new Response(JSON.stringify({ success: true, data }))
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to save document.' }))
  }
}