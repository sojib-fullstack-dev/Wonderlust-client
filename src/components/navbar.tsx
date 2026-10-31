'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"


import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"




const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/my-bookings", label: "My Bookings" },
];

export function Navbar() {
  const { data: session } = authClient.useSession()
  const pathname = usePathname()
  const user = session?.user

  const handleClick = async () => {
    await authClient.signOut();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: primary links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-[#00A8E8]",
                    active
                      ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                      : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(82vw,20rem)] bg-background p-0">
            <SheetHeader className="border-b border-border px-5 py-4 pr-14">
              <SheetTitle className="text-[#00A8E8]">Wanderlast</SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-1 px-3 py-4">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-[#00A8E8]/10 hover:text-[#00A8E8]",
                        active
                          ? "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                          : "text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              {[{ href: "/profile", label: "Profile" }, ...(!user ? [{ href: "/login", label: "Login" }, { href: "/signup", label: "Sign Up" }] : [])].map((link) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-[#00A8E8]/10 hover:text-[#00A8E8]",
                        active
                          ? "bg-[#00A8E8]/10 font-medium text-[#00A8E8]"
                          : "text-foreground",
                      )}
                    >
                      {link.href === "/profile" && <User className="size-4" />}
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              {user && (
                <li className="mt-2 border-t border-border px-3 pt-3">
                  <div className="mb-3 min-w-0">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full"
                    onClick={handleClick}
                  >
                    Sign out
                  </Button>
                </li>
              )}
            </ul>
          </SheetContent>
        </Sheet>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-tight text-[#00A8E8] sm:text-3xl"
        >
          Wanderlast
        </Link>

        {/* Mobile profile shortcut */}
        <Link
          href="/profile"
          aria-label="Profile"
          aria-current={isActive("/profile") ? "page" : undefined}
          className={cn(
            "ml-auto flex size-9 items-center justify-center rounded-full transition-colors lg:hidden",
            isActive("/profile")
              ? "bg-[#00A8E8]/10 text-[#00A8E8]"
              : "text-foreground hover:bg-[#00A8E8]/10 hover:text-[#00A8E8]",
          )}
        >
          {user?.image ? (
            <Avatar className="size-7">
              <AvatarImage src={user.image} alt={user.name || "Profile"} />
              <AvatarFallback>{user.name?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
          ) : (
            <User className="size-5" />
          )}
        </Link>

        {/* Right: account links */}
        <div className="hidden items-center gap-4 lg:flex lg:gap-6">

          <Link
            href="/profile"
            aria-current={isActive("/profile") ? "page" : undefined}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors hover:text-[#00A8E8]",
              isActive("/profile")
                ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                : "text-foreground",
            )}
          >
            <User className="size-4" />
            Profile
          </Link>
          {
            user ? <Popover>
              <PopoverTrigger render={<button className="cursor-pointer">   <Avatar>
                <AvatarImage src={user?.image as string} alt="@shadcn" />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar></button>} />
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    {user?.email}
                    <Button variant={"destructive"} onClick={handleClick}>sign Out</Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover> : <>
              <Link
                href="/login"
                aria-current={isActive("/login") ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  isActive("/login")
                    ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                Login
              </Link>
              <Link
                href="/signup"
                aria-current={isActive("/signup") ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-[#00A8E8]",
                  isActive("/signup")
                    ? "border-b-2 border-[#00A8E8] pb-0.5 font-medium text-[#00A8E8]"
                    : "text-foreground",
                )}
              >
                Sign Up
              </Link>
            </>
          }

        </div>
      </nav>
    </header>
  );
}