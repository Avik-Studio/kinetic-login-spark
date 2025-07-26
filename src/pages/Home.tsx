import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import CustomerHome from './CustomerHome'
import DriverHome from './DriverHome'
import AdminHome from './AdminHome'
import Navbar from '@/components/Navbar'
import { User } from '@/types/user'

export default function Home() {
  const { user: authUser } = useAuth()
  const [userRole, setUserRole] = useState<'customer' | 'driver' | 'admin'>('customer')
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const neoRideUser: User = {
    id: authUser?.id || '1',
    name: authUser?.user_metadata?.full_name || 'Demo User',
    email: authUser?.email || localStorage.getItem('userEmail') || 'demo@example.com',
    role: userRole,
    avatar: authUser?.user_metadata?.avatar_url,
    isOnline: userRole === 'driver' ? false : undefined,
  }

  useEffect(() => {
    // Check for stored role (for demo purposes)
    const storedRole = localStorage.getItem('userRole') as 'customer' | 'driver' | 'admin'
    if (storedRole) {
      setUserRole(storedRole)
    }
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      localStorage.removeItem('userRole')
      localStorage.removeItem('userEmail')
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'You have been logged out',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  const updateUserRole = (role: 'customer' | 'driver' | 'admin') => {
    setUserRole(role)
    localStorage.setItem('userRole', role)
    toast({
      title: 'Role Updated',
      description: `Switched to ${role} view`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar 
        user={neoRideUser} 
        onLogout={handleLogout} 
        notificationCount={3}
      />
      
      {/* Demo Role Switcher - Remove in production */}
      <div className="bg-gray-100 border-b px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-sm text-gray-600">Demo Mode - Switch Roles:</span>
          <div className="flex gap-2">
            <button 
              onClick={() => updateUserRole('customer')}
              className={`px-3 py-1 text-xs rounded ${userRole === 'customer' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Customer
            </button>
            <button 
              onClick={() => updateUserRole('driver')}
              className={`px-3 py-1 text-xs rounded ${userRole === 'driver' ? 'bg-green-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Driver
            </button>
            <button 
              onClick={() => updateUserRole('admin')}
              className={`px-3 py-1 text-xs rounded ${userRole === 'admin' ? 'bg-purple-500 text-white' : 'bg-white text-gray-600'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Render appropriate home page based on role */}
      {userRole === 'customer' && <CustomerHome />}
      {userRole === 'driver' && <DriverHome />}
      {userRole === 'admin' && <AdminHome />}
    </div>
  )
}