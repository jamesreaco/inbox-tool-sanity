"use client"
import { generateID } from '@/lib/utils';
import { useState } from 'react';

export default function Form() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [occupation, setOccupation] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault()

    const mutations = [{
      create: {
        _id: `message.${generateID()}`,
        _type: 'messages',
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

    try {

      const response = await fetch("/api/submit-message", {
        method: "POST",
        body: JSON.stringify({ mutations }),
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        resetUI()
        console.log('Document added successfully:', response)
      }

    } catch(error) {
      console.error('Error adding document:', error);
    }

  }

  function resetUI() {
    setEmail('')
    setName('')
    setSubject('')
    setOccupation('')
    setMessage('')
  } 

  return (
    <div className='mt-[80px] w-[400px] mx-auto'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center gap-[20px]'
      >
        <input 
          type="text" 
          value={name}
          placeholder="Name"
          className="p-4 rounded-md w-full bg-zinc-900 border border-zinc-800"
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="text" 
          value={email}
          placeholder="Email"
          className="p-4 rounded-md w-full bg-zinc-900 border border-zinc-800"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="text" 
          value={subject}
          placeholder="Subject"
          className="p-4 rounded-md w-full bg-zinc-900 border border-zinc-800"
          onChange={(e) => setSubject(e.target.value)}
        />
        <input 
          type="text" 
          value={occupation}
          placeholder="Occupation"
          className="p-4 rounded-md w-full bg-zinc-900 border border-zinc-800"
          onChange={(e) => setOccupation(e.target.value)}
        />
        <textarea 
          type="text" 
          value={message}
          rows={8}
          placeholder="Message"
          className="p-4 rounded-md w-full bg-zinc-900 border border-zinc-800"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          type='submit'
          onClick={handleSubmit}
          className="p-4 rounded-md w-full bg-blue-700 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
