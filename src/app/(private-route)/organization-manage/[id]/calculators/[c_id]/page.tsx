"use client";
import { redirect } from "next/navigation";

export default function Page({ params }: { params: { id: string, c_id: string } }) {

  redirect("/organization-manage/" + params.id + "/calculators/" + params.c_id + "/insert");

  return (<></>);
}

// export default function Page({ params }: { params: { id: string, c_id: string } }) {

//   const { data: calculator } = useGetCalculatorManageQuery({ org_id: params.id, calcr_id: params.c_id }, {
//     pollingInterval: 10000,
//   });

//   return calculator ? (
//     <>
//       <Tabs defaultValue="train">
//         <TabsList>
//           <TabsTrigger value="train">Añadir datos</TabsTrigger>
//           <TabsTrigger value="classifications">Clasificaciones</TabsTrigger>
//           <TabsTrigger value="graph">Grafo</TabsTrigger>
//           <TabsTrigger value="calculations">Cálculos realizados</TabsTrigger>
//         </TabsList>
//         <TabsContent value="train">
//           <div>
//             <CalculationManageCreateForm calculator={calculator} org_id={calculator.attributes.organization_id} />
//           </div>
//         </TabsContent>
//         <TabsContent value="classifications">
//           <CalculatorClassifications calculator={calculator} />
//         </TabsContent>
//         <TabsContent value="graph">
//           <CalculatorGraphComponent dot={calculator.attributes.dot_visualization} />
//         </TabsContent>
//         <TabsContent value="calculations">
//           <Data calculator={calculator} />
//           <TrainButton calculator={calculator} />
//         </TabsContent>
//       </Tabs>
//     </>
//   ) : <></>
// }