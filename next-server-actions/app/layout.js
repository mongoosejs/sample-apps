// app/layout.tsx
export const metadata = {
  title: 'Your App',
  description: '…',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">   {/* required in root layout */}
      <body>{children}</body>   {/* required in root layout */}
    </html>
  );
}
