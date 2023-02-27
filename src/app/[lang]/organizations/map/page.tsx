import { OrganizationExploreMap } from "@/components/organizations/explore";
export const dynamicParams = true // true | false,
export const revalidate = true

export default function OrganizationIndexPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  return (
    <>
      <div className="h-screen">
        <div className="absolute inset-0 z-0">
          <OrganizationExploreMap />
        </div>
      </div>
    </>
  )
}
