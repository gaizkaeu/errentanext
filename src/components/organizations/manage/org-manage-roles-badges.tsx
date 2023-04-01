import { OrganizationMembershipRole } from "@/store/types/Organization";

export const OrganizationManageBadgeRoles = (props: { role: OrganizationMembershipRole }) => {

  switch (props.role) {
    case "admin":
      return <p className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Administrador</p>
    default:
      return <></>
  }

}