import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "@/components/registration-form"

export const metadata: Metadata = {
  title: "Create Account - BlueRoots",
  description: "Join BlueRoots to start fundraising for progressive causes and Democratic candidates.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-lg text-gray-600">
            Join BlueRoots to start fundraising for progressive causes and Democratic candidates
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-600">Account Registration</CardTitle>
            <CardDescription>
              Please provide the following information to create your account. All required fields are marked with an
              asterisk (*).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
