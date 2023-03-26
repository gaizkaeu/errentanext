"use client";
import { Button } from "@/components/ui/button";
import { useDeleteOrganizationMembershipMutation, useUpdateOrganizationMembershipMutation } from "@/store/endpoints/organizations";
import { OrganizationMembership, OrganizationMembershipRoles } from "@/store/types/Organization";
import Select from "react-select";

export const OrganizationMembershipsTable = (props: { memberships: OrganizationMembership[] }) => {

  const [mutation] = useUpdateOrganizationMembershipMutation();
  const [deleteMembership] = useDeleteOrganizationMembershipMutation();

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-midnight dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.memberships.map((membership, index) => (
            <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="text-base font-semibold">{membership.attributes.first_name} {membership.attributes.last_name}</div>
              </th>
              <td className="px-6 py-4">
                <Select
                  defaultValue={{
                    label: membership.attributes.role,
                    value: membership.attributes.role,
                  }}
                  options={OrganizationMembershipRoles.map((role) => ({
                    label: role,
                    value: role,
                  }
                  ))}
                  onChange={(value) => {
                    value && (
                    mutation({
                      id: membership.id,
                      organization_id: membership.attributes.organization_id,
                      role: value?.value
                      })
                    )
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <Button variant="destructive" onClick={() => deleteMembership(membership.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}