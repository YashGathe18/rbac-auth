import { Button } from "@/components/ui/button"

interface DashboardProps {
  user: { username: string; role: string }
  onNavigate: (page: string) => void
  onLogout: () => void
}

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <p className="mb-4">Your role is: {user.role}</p>
      <div className="space-y-2">
        {user.role === 'admin' && (
          <Button onClick={() => onNavigate('admin')} className="w-full">
            Go to Admin Page
          </Button>
        )}
        {(user.role === 'admin' || user.role === 'moderator') && (
          <Button onClick={() => onNavigate('moderator')} className="w-full">
            Go to Moderator Page
          </Button>
        )}
        <Button onClick={onLogout} variant="outline" className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

