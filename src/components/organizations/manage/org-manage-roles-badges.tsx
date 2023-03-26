import { OrganizationMembershipRole } from "@/store/types/Organization";

export const OrganizationManageBadgeRoles = (props: { role: OrganizationMembershipRole }) => {

  switch (props.role) {
    case "admin":
      return <p className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Administrador</p>
    case "lawyer":
      return <p className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Abogado</p>
    default:
      return <></>
  }

}