import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, FileText, Users, Settings, BarChart3, PlusCircle, LogOut, User } from "lucide-react"

// Update the metadata
export const metadata: Metadata = {
  title: "Admin Dashboard - BlueRoot",
  description: "Manage your fundraising campaigns and account settings",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            {/* Update the logo text in the admin layout */}
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">
                Blue<span className="text-neutral-600">Root</span>
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/admin" className="transition-colors hover:text-foreground/80 text-foreground">
                Dashboard
              </Link>
              <Link href="/admin/campaigns" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Campaigns
              </Link>
              
              <Link href="/admin/reports" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Reports
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/campaigns/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Campaign
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <nav className="grid items-start gap-2 text-sm font-medium pt-6">
            <Link href="/admin">
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/campaigns">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Campaigns
              </Button>
            </Link>
            
            <Link href="/admin/analytics">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/admin/profile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                User Profile
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Separator className="my-4" />
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                View Public Site
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
