import { EmailAuth } from "@/components/authentication/actions";

export function generateStaticParams() {
  return [];
}

export default function EmailAuthPage({ params }: { params: { id: string } }) {

  return (<EmailAuth id={params.id} />);
};
