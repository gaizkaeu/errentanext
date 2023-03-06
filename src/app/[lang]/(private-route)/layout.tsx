import { PrivateRoute } from "@/components/authentication/components"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="p-3">{children}</div>
      <PrivateRoute action="auth" roles="*" />
    </>
  )
}
