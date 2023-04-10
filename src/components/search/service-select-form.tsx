import FormWrapper from "./form-wrapper";
import { useGetServiceTagsQuery } from "@/store/endpoints/organizations";

const ServiceSelectForm = () => {

  const { data } = useGetServiceTagsQuery({});

  return (
    <FormWrapper
      title="¿Qué necesitas?"
      description="Escoge que tipo de asesoramiento necesitas."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {data?.map((skill) => (
            <div key={skill.id} className="p-2 w-full bg-slate-50 border-slate-100 hover:bg-slate-100 rounded-lg ">
              {skill.attributes.name}
            </div>
          ))}
        </div>
      </div>
    </FormWrapper>
  );
};

export { ServiceSelectForm };