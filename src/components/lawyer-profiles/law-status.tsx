import { LawyerProfileAttributes } from "@/store/types/LawyerProfile";

export const LawyerStatusBadge = (props: { lawyer: LawyerProfileAttributes }) => {

  const { lawyer } = props;

  if (lawyer.on_duty)
      return (
        <span className="px-2 py-1 text-xs font-medium leading-4 text-green-800 bg-green-100 rounded-full">
          En servicio
        </span>
      )
  else
      return (
        <span className="px-2 py-1 text-xs font-medium leading-4 text-yellow-800 bg-yellow-100 rounded-full">
          Fuera de servicio
        </span>
      )
};