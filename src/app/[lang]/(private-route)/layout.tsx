import { PrivateRoute } from "@/components/authentication/components"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <PrivateRoute action="auth" roles="*" />
    </>
  )
}
