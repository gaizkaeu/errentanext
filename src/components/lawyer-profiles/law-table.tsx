"use client";
import { LawyerProfile } from "@/store/types/LawyerProfile";
import { LawyerStatusBadge } from "./law-status";
import { useAuth } from "../providers/authProvider";
import { Link } from "next-intl";

export const LawyerProfileTable = (props: {
  lawyers: LawyerProfile[];
  org_id: string;
}) => {

  const { currentUser } = useAuth();

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          { props.lawyers.map((lawyer, index) => (
          <tr key={index }className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <div className="text-base font-semibold">{lawyer.attributes.first_name} {lawyer.attributes.last_name}</div>
              {currentUser?.id === lawyer.relationships.user.data?.id &&
              <Link href={`/lawyer-profiles`}>
                <div className="text-xs text-gray-500">Tu</div>
              </Link>
              }
            </th>
            <td className="px-6 py-4">
              {lawyer.id}
            </td>
            <td className="px-6 py-4">
              <LawyerStatusBadge lawyer={lawyer.attributes}/>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}