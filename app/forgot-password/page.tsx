import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Forgot Password - BlueRoot",
  description: "Reset your BlueRoot account password",
}

export default function ForgotPasswordPage() {
  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>We'll email you instructions to reset your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" />
            </div>
            <Button className="w-full bg-neutral-800 hover:bg-neutral-700">Send reset link</Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/login" className="text-sm text-blue-600 hover:underline">
              Back to sign in
            </Link>
          </CardFooter>
        </Card>

        <div className="px-8 text-center text-sm text-muted-foreground">
          BlueRoot is a registered political fundraising platform.{" "}
          <Link href="/about" className="hover:text-primary underline underline-offset-4">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}
