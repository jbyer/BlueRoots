import type { Metadata } from "next"
import OTPVerificationForm from "@/components/otp-verification-form"

export const metadata: Metadata = {
  title: "Verify Your Account - BlueRoots",
  description: "Enter the verification code sent to your email to complete sign in.",
}

export default function OTPVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Verify Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a verification code to your email address. Please enter it below to complete your sign in.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <OTPVerificationForm />
        </div>
      </div>
    </div>
  )
}
