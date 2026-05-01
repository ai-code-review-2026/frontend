import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { IBM_Plex_Mono, Sora } from "next/font/google"

import { ThemeProvider } from "@/components/dashboard/ThemeProvider"
import { MobileRedirect } from "@/components/mobile-redirect"
import { CapacitorProvider } from "@/components/providers/capacitor-provider"
import { Toaster } from "@/components/ui/sonner"
import { getClerkRuntimeConfig } from "@/lib/clerk-runtime"
import "./globals.css"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
})

const clerkRuntimeConfig = getClerkRuntimeConfig()

export const metadata: Metadata = {
  title: "Devora",
  description: "Devora - AI code review platform",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      {...clerkRuntimeConfig}
      signInFallbackRedirectUrl="/auth/role-redirect"
      signUpFallbackRedirectUrl="/auth/role-redirect"
      appearance={{
        layout: {
          logoPlacement: "none",
          showOptionalFields: false,
          socialButtonsPlacement: "bottom",
        },
        variables: {
          colorPrimary: "var(--orange)",
          colorBackground: "var(--bg-card)",
          colorInputBackground: "var(--bg-card-inner)",
          colorInputText: "var(--text-primary)",
          colorText: "var(--text-primary)",
          colorTextSecondary: "var(--text-muted)",
          borderRadius: "0px",
        } as any,
        elements: {
          // Hide extra Clerk pages while keeping sign-in/sign-up route actions available.
          footerPages: { display: "none" },
          // Card styling
          card: {
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
            boxShadow: "none",
          },
          // Form styling
          formButtonPrimary: {
            backgroundColor: "var(--orange)",
            "&:hover": { backgroundColor: "var(--orange-hover)" },
          },
          formFieldInput: {
            backgroundColor: "var(--bg-card-inner)",
            borderColor: "var(--border-card)",
            "&:focus": { borderColor: "var(--orange)" },
          },
          // Header styling
          headerTitle: { color: "var(--text-primary)" },
          headerSubtitle: { color: "var(--text-muted)" },
          // Social buttons
          socialButtonsBlockButton: {
            backgroundColor: "var(--bg-card-inner)",
            borderColor: "var(--border-card)",
            "&:hover": { backgroundColor: "var(--bg-card-hover)" },
          },
          // Divider
          dividerLine: { backgroundColor: "var(--border-card)" },
          dividerText: { color: "var(--text-muted)" },
          // User button
          userButtonPopoverCard: {
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-card)",
          },
          userButtonPopoverActionButton: {
            "&:hover": { backgroundColor: "var(--bg-card-hover)" },
          },
        },
      } as any}
    >
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body className={`${sora.variable} ${mono.variable} bg-background text-foreground antialiased`}>
          <ThemeProvider>
            <CapacitorProvider>
              <MobileRedirect />
              {children}
              <Toaster richColors closeButton />
            </CapacitorProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
