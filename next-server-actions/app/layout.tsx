// app/layout.tsx
export const metadata = {
  title: 'Your App',
  description: '…',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>{children}</body>
    </html>
  );
}
