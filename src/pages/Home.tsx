import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { LogOut, User } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold animate-fade-in">Welcome Home</h1>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="hover-scale"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
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
                <p><strong>Name:</strong> {user?.user_metadata?.full_name || 'Not provided'}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Verified:</strong> {user?.email_confirmed_at ? 'Yes' : 'No'}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in hover-scale" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Quick overview of your activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to your dashboard! This is where you can manage your account and access various features.
              </p>
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