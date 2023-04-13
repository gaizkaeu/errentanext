import { redirect } from "next/navigation";


export default function Page({ params }: { params: { id: string } }) {

  redirect("/organization-manage/" + params.id + "/general");

  return (<></>);
}