import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { LogOut, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { UserProvider, useUser } from '@/contexts/UserContext'

function HomeContent() {
  const { user: authUser } = useAuth()
  const { user: neoRideUser, updateUserRole } = useUser()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {neoRideUser && (
        <Navbar 
          user={neoRideUser} 
          onLogout={handleLogout} 
          notificationCount={3}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold animate-fade-in">
            Welcome to NeoRide, {neoRideUser?.name}!
          </h1>
          
          {/* Demo Role Switcher */}
          <div className="flex gap-2">
            <Button 
              variant={neoRideUser?.role === 'customer' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateUserRole('customer')}
            >
              Customer
            </Button>
            <Button 
              variant={neoRideUser?.role === 'driver' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateUserRole('driver')}
            >
              Driver
            </Button>
            <Button 
              variant={neoRideUser?.role === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateUserRole('admin')}
            >
              Admin
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-fade-in hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                Your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {authUser?.user_metadata?.full_name || neoRideUser?.name || 'Not provided'}</p>
                <p><strong>Email:</strong> {authUser?.email || neoRideUser?.email}</p>
                <p><strong>Role:</strong> {neoRideUser?.role}</p>
                <p><strong>Verified:</strong> {authUser?.email_confirmed_at ? 'Yes' : 'No'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>NeoRide Dashboard</CardTitle>
              <CardDescription>
                Your {neoRideUser?.role} overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to NeoRide! Use the navigation bar above to explore features specific to your role as a {neoRideUser?.role}.
              </p>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Try switching roles with the buttons above to see how the navbar changes!
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-scale" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Tips to help you get the most out of your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Complete your profile</li>
                <li>Explore available features</li>
                <li>Customize your preferences</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  )
}