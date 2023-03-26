import { Button } from "./button";

export const FormSection = (props: { title: string, description: string, note: string, save?: boolean, children: React.ReactNode[] | React.ReactNode }) => {

  return (

    <div className="border dark:border-gray-700 rounded-md shadow-normal">
      <div className="p-4">
        <span className="text-xl font-medium leading-tight">{props.title}</span>
        <p className="text-sm mt-2">{props.description}</p>
        <div className="mt-2 max-w-md">
          {props.children}
        </div>
      </div>
      <div className="w-full lg:inline-flex border-t dark:border-gray-700 lg:items-end lg:justify-between p-4">
        <div>
          <p className="mt-2 italic text-xs">{props.note}</p>
          {props.save && <Button type="submit" className="mt-4">Guardar</Button>}
        </div>
      </div>
    </div>
  );
}