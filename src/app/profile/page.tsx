'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarDays, LogOut, Mail, ShieldCheck, UserRound } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export default function ProfilePage() {

  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push("/login")
    router.refresh()
  }

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }


  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center px-6 py-12">
        <Card className="w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
              <UserRound className="size-6 text-muted-foreground" />
            </div>
            <CardTitle>You&apos;re not signed in</CardTitle>
          </CardHeader>
          <CardContent>
            <Button  className="w-full">
              <Link href="/login">Log in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U"

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Card>
        <CardHeader className="border-b pb-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <Avatar size="lg" className="size-24 ring-4 ring-muted">
              <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-2xl">{user.name || "User"}</CardTitle>
              <p className="mt-1 text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="w-full sm:w-auto">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#00A8E8]/10 text-[#00A8E8]">
                <UserRound className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Full name</p>
                <p className="font-medium">{user.name || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#00A8E8]/10 text-[#00A8E8]">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email address</p>
                <p className="truncate font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#00A8E8]/10 text-[#00A8E8]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email status</p>
                <p className="font-medium">{user.emailVerified ? "Verified" : "Not verified"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#00A8E8]/10 text-[#00A8E8]">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account ID</p>
                <p className="max-w-[220px] truncate font-medium" title={user.id}>{user.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
