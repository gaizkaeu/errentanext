import { Organization } from "@/store/types/Organization";

const getOrg = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/api/v1/organizations/" + id);
  const data = await res.json();
  return data.data;
};


export default async function Head({ params }: { params: { id: string } })  {
  const org: Organization = await getOrg(params.id);

  return (
    <>
      <title>{org?.attributes?.name + ' - ERRENTA.EUS'}</title>
      <meta name="description" content={org?.attributes?.description} />
      <meta property="og:title" content={org?.attributes?.name + ' - ERRENTA.EUS'} />
      <meta property="og:description" content={org?.attributes?.description} />
      <meta property="og:image" content={org?.attributes?.logo_url} />
      <meta property="og:url" content={'https://errenta.eus/organizations/' + org?.id} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={org?.attributes?.name + ' - ERRENTA.EUS'} />
      <meta name="twitter:description" content={org?.attributes?.description} />
      <meta name="twitter:image" content={org?.attributes?.logo_url} />
      <meta name="twitter:url" content={'https://errenta.eus/organizations/' + org?.id} />

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </>
  )
}
