// app/admin/layout.jsx
import '@/app/globals.css'
import { AuthProvider } from '@/app/components/auth/AuthContext'
import ThemeProvider from '@/app/components/theme/theme-provider'
import AdminNavbar from '../components/admin/adminNavbar'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
       <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <div className='flex'>
              <div className='w-2/10 h-full sticky top-0'>
                <AdminNavbar/>
              </div>
              <div className='w-8/10 relative'>
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
