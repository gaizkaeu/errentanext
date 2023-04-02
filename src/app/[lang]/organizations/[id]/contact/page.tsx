import { CallCreateForm } from "@/components/contact";
import { OrganizationOpen } from "@/components/organizations";
import { BackButton } from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id, { next: { revalidate: 60 } });
  const data = await res.json();
  return data.data;
};

export default async function Page({ params }: { params: { id: string } }) {
  const org = await getOrg(params.id);

  return org && (
    <div className="w-full md:p-4 p-1">
      <div className="flex items-center gap-4">
        <BackButton href={`/organizations/${org.id}`} />
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            {org.attributes.name}
          </h1>
          <h2 className="text-xl font-bold leading-tight tracking-tighter md:text-3xl lg:text-4xl lg:leading-[1.1]">
            Asesoría en <span className="font-light">{org.attributes.city}</span>.{" "}
            <span className="font-light">
              <OrganizationOpen org={org} />
            </span>
          </h2>
        </div>
      </div>
      <Tabs defaultValue="call" className="w-full max-w-sm mx-auto">
        <TabsList>
          <TabsTrigger value="call">
            <div>
              <p>Quiero que me llamen</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="message">
          <div>
              <p>Enviar un mensaje</p>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="call">
          <CallCreateForm org={org} />
        </TabsContent>
        <TabsContent value="message">
        </TabsContent>
      </Tabs>
    </div>
  )
}