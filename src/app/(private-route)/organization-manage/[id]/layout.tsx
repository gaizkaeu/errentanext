import { OrganizationTitle } from "@/components/organizations";
import { BackButton } from "@/components/ui/back-button";
import { SideNav } from "@/components/ui/side-nav";

export function generateStaticParams() {
  return [];
}

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id);
  const data = await res.json();
  return data.data;
};



export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {id: string}
}) {
  const org = await getOrg(params.id);
  
  const links = [
  {
    title: "General",
    links: [
      {
        text: "Información",
        href: `/organization-manage/${params.id}/general`,
      },
      {
        text: "Ajustes",
        href: `/organization-manage/${params.id}/settings`,
      },
      {
        text: "Horario",
        href: `/organization-manage/${params.id}/open-close`,
      },
    ]
  },
  {
    title: "Equipo",
    links: [
      {
        text: "Miembros",
        href: `/organization-manage/${params.id}/memberships`,
      }
    ]
  },
  {
    title: "Calculadores",
    links: [
      {
        text: "Lista",
        href: `/organization-manage/${params.id}/calculators`,
      }
    ]
  },
  {
    title: "Contactos",
    links: [
      {
        text: "Llamadas",
        href: `/organization-manage/${params.id}/calls`,
      }
    ]
  },
  {
    title: "Suscripción",
    links: [{
      text: "Información",
      href: `/organization-manage/${params.id}/subscription`,
    }]
  }
]

  return (
    <>
      <div className="flex gap-4 items-center">
        <BackButton href="/organization-manage"/>
        <OrganizationTitle org={org} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 mt-5">
        <div className="md:col-span-1 lg:col-span-2 xl:col-span-2 w-full">
          <SideNav sections={links} />
        </div>

        <div className="md:col-span-5 max-md:mt-3 lg:col-span-8 xl:col-span-8">
          {children}
        </div>
      </div>
    </>
  )
}
