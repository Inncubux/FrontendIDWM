import { AuthProvider } from "@/contexts/auth/AuthContext";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* Users */}
      {children}
    </AuthProvider>
  );
}
