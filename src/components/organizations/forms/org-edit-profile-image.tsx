"use client";
import { useUpdateOrganizationLogoMutation } from "@/store/endpoints/organizations";
import { Organization } from "@/store/types/Organization";

export const OrganizationEditProfileImage = (props: { organization: Organization }) => {
  const [mutation] = useUpdateOrganizationLogoMutation();

  const handle_change = (e: any) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('organization_manage[logo]', file);
    mutation({ id: props.organization.id, logo: formData })
  };

  return (
    <div>
      <div className="grid grid-cols-1 space-y-3">
        <img alt="Logo" src={props.organization.attributes.logo_url} width={200} height={200} />
        <input
          name='avatar'
          accept='image/*'
          type='file'
          onChange={handle_change}
        />
      </div>
    </div>
  );
};
