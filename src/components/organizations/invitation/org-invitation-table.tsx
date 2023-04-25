"use client";
import { Button } from "@/components/ui/button";
import { useUpdateOrganizationInvitationMutation } from "@/store/endpoints/organizations";
import { OrganizationInvitation, OrganizationMembershipRoles } from "@/store/types/Organization";
import Select from "react-select";

export const OrganizationInvitationsTable = (props: { invitations: OrganizationInvitation[] }) => {

  const [mutation] = useUpdateOrganizationInvitationMutation();

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-midnight-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Token
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {props.invitations.map((inv, index) => (
            <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-midnight-700">
              <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="text-base font-semibold">{inv.attributes.email}</div>
              </th>
              <td className="px-6 py-4">
                <Select
                  defaultValue={{
                    label: inv.attributes.role,
                    value: inv.attributes.role,
                  }}
                  options={OrganizationMembershipRoles.map((role) => ({
                    label: role,
                    value: role,
                  }
                  ))}
                  onChange={(value) => {
                    value && (
                    mutation({
                      id: inv.id,
                      role: value?.value
                      })
                    )
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <div className="text-base font-semibold">{inv.attributes.token}</div>
              </td>
              <td className="px-6 py-4">
                <Button variant="destructive">
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