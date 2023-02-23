
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-3">
      {children}
    </div>
  )
}
