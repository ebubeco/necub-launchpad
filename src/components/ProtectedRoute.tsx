import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-muted-foreground text-sm">
        Loading session…
      </div>
    );
  }
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};
