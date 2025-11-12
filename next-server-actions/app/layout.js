// app/layout.tsx
export const metadata = {
  title: 'Your App',
  description: '…',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en"><body>{children}</body>
    </html>
  );
}
