import Navbar from "./_components/Navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}