
// app/layout.js
export const metadata = {
  title: "My App",
  description: "My app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
