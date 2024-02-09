import '../globals.css'

export const metadata = {
  title: 'Inbox Plugin | Studio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}