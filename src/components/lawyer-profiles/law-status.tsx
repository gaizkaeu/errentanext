import { LawyerProfileAttributes } from "@/store/types/LawyerProfile";

export const LawyerStatusBadge = (props: { lawyer: LawyerProfileAttributes }) => {

  const { lawyer } = props;

  if (lawyer.org_status === "pending") {
    return (
      <span className="px-2 py-1 text-xs font-medium leading-4 text-yellow-800 bg-yellow-100 rounded-full">
        Pendiente
      </span>
    );
  } else if (lawyer.org_status === "accepted") {
     switch (lawyer.lawyer_status) {
      case "on_duty":
        return (
          <span className="px-2 py-1 text-xs font-medium leading-4 text-green-800 bg-green-100 rounded-full">
            En servicio
          </span>
        )
      case "off_duty":
        return (
          <span className="px-2 py-1 text-xs font-medium leading-4 text-yellow-800 bg-yellow-100 rounded-full">
            Fuera de servicio
          </span>
        )
      case "deleted":
        return (
          <span className="px-2 py-1 text-xs font-medium leading-4 text-red-800 bg-red-100 rounded-full">
            Eliminado
          </span>
        )
     }
  } else {
    return (
      <span className="px-2 py-1 text-xs font-medium leading-4 text-red-800 bg-red-100 rounded-full">
        Rechazado
      </span>
    );
  }
  

}