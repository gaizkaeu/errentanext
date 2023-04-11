import { redirect } from "next/navigation";


export default function Page({ params }: { params: { id: string, lang: string } }) {

  redirect("/" + params.lang + "/organization-manage/" + params.id + "/general");

  return (<></>);
}