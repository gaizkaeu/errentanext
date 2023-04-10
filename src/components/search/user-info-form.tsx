"use client";
import { useState } from "react";
import FormWrapper from "./form-wrapper";
import { useGetSkillsTagsQuery } from "@/store/endpoints/organizations";

const UserInfoForm = () => {

  const { data } = useGetSkillsTagsQuery({});
  const [selected, setSelected] = useState<string[]>([]);

  const click = (skill: string) => {
    if (selected.includes(skill)) {
      setSelected(selected.filter((s) => s !== skill));
    } else {
      setSelected([...selected, skill]);
    }
  }


  return (
    <FormWrapper
      title="¿Qué necesitas?"
      description="Escoge que tipo de asesoramiento necesitas."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {data?.map((skill) => (
            <div onClick={() => click(skill.attributes.name)} key={skill.id} className="p-2 w-full bg-slate-50 border-slate-100 hover:bg-slate-100 rounded-lg ">
              {skill.attributes.name}
              {selected.includes(skill.attributes.name) && <span>Selected</span>}
            </div>
          ))}
        </div>
      </div>
    </FormWrapper>
  );
};

export { UserInfoForm };