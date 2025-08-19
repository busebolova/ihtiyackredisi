import { HeaderAuth } from "@/components/header-auth"
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderAuth />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="container mx-auto flex justify-center items-center">
          {/* Kayıt Formu */}
          <div className="flex justify-center">
            <SignupForm />
          </div>
        </div>
      </main>
    </div>
  )
}
