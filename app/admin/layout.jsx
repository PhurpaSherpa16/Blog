import '@/app/globals.css'
import { AuthProvider } from '@/app/components/auth/AuthContext'
import ThemeProvider from '@/app/components/theme/theme-provider'
import AdminNavbar from '../components/admin/adminNavbar'
import AlertContext from '../components/admin/AlertContext'
import AlertMessageGlobal from '../components/AlertMessageGlobal'

export const metadata = {
  title: 'Admin Dashboard',
}

export default function AdminLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
            <AlertContext>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange>
                <div className='grid md:flex relative'>
                  <AlertMessageGlobal/>
                  <div className='lg:w-2/10 h-full md:h-screen sticky top-0 z-100'>
                    <AdminNavbar/>
                  </div>
                  <div className='w-full md:w-8/10 relative'>
                    {children}
                  </div>
                </div>
              </ThemeProvider>
            </AlertContext>
        </AuthProvider>
      </body>
    </html>
  )
}
