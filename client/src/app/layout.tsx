import Navbar from '@/components/navbar/navbar';
import './globals.css';
import StoreProvider from "@/lib/store/store-provider";
import { Toaster } from "@/components/ui/sonner"
import SessionProvider from '@/providers/authProvider';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pinterest Clone",
  description: "A Pinterest clone with nextjs and tailwindcss",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <SessionProvider session={session}>
            <Navbar />
            {children}
            <Toaster />
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
