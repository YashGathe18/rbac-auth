interface UnauthorizedProps {
    onNavigate: (page: string) => void;
  }
  
  export default function Unauthorized({ onNavigate }: UnauthorizedProps) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p className="mb-4">You do not have permission to access this page.</p>
          <button onClick={() => onNavigate('dashboard')} className="text-blue-500 hover:underline">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  