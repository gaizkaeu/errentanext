
export default async function Page({ params }: { params: { id: string } })  {

  return (
    <>
      <title>{params.id + " - Mi declaración - ERRENTA.EUS"}</title>
    </>
  )
}
