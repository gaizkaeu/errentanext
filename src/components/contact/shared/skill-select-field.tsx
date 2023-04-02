import { TagComponent } from "@/components/tags";
import { Field, useField } from "formik";

export const SkillSelectField = (props: {
  name: string;
  skill_list: string[];
}) => {

  const { name, skill_list } = props;
  const [field, meta, helpers] = useField({
    name,
    type: "checkbox",
  });

  return (
    <div className="grid w-full items-center gap-1.5">
      <div role="group" aria-labelledby="checkbox-group">
      {skill_list.map((skill) => (
        <Field type="checkbox" name="skill_list" value={skill} key={skill}
        component={() => <TagComponent tag={skill} />}/>
      ))}
      </div>
    </div>
  );
};