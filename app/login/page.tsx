import { HeaderAuth } from "@/components/header-auth"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderAuth />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="container mx-auto flex justify-center items-center">
          {/* Giriş Formu */}
          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  )
}
