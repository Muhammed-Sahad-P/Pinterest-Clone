import Navbar from '@/components/navbar/navbar';
import './globals.css';
import StoreProvider from "@/lib/store/store-provider";
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
