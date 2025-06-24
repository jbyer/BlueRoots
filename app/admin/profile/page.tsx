import type { Metadata } from "next"
import { AdminUserProfile } from "@/components/admin/admin-user-profile"

export const metadata: Metadata = {
  title: "User Profile - Admin Dashboard",
  description: "Manage your admin profile and account settings",
}

export default function AdminProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
      </div>
      <AdminUserProfile />
    </div>
  )
}
