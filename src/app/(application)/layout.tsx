import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Providers from "@/components/providers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Binge-list",
  description: "Curate a list of your favourite shows",
};

const RootLayout = async ({
  children,
  breadcrumbs,
}: {
  children: ReactNode;
  breadcrumbs: ReactNode;
}) => {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <section className="p-4 max-w-5xl w-full mx-auto">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                      orientation="vertical"
                      className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    {breadcrumbs}
                  </div>
                </header>
                {children}
              </section>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
