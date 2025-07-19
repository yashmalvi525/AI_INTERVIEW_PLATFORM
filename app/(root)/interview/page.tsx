import Agent from '@/app/components/Agent';
import { getCurrentUser } from '@/actions/auth.action';

const page = async () => {
  const user = await getCurrentUser();
  
  // Handle case where user is not found
  if (!user || !user.name || !user.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
          <p>Please log in to start your interview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Interview Generation</h3>
      <Agent 
        userName={user.name} 
        userId={user.id} 
        type="generate" 
      />
    </div>
  );
};

export default page;