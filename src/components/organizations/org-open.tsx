"use client";
import { useLocalizedMoment } from '@/lib/utils';
import { ArrowUpRightIcon, ChatBubbleBottomCenterIcon, MapPinIcon, PhoneArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Organization } from '@/store/types/Organization';
import { GeneralCard, GeneralCardContent, GeneralCardHeading } from '../ui/card';

export const OrganizationOpen = (props: { org: Organization }) => {
  const s = useLocalizedMoment();
  const { org } = props;

  const cardCn = "h-56 flex-shrink-0";

  return (
    <>
      <GeneralCard variant={org.attributes.near_close ? "near_close" : org.attributes.open ? "open" : "close"} className={cardCn}>
        {org.attributes.open ? (org.attributes.near_close ? <p className="text-white text-xl font-bold mb-1">Cierra en menos de 30 minutos.</p> : <p className="text-white text-xl font-bold mb-1">Abierto ahora.</p>) 
          : (<p className="text-white text-xl font-bold mb-1">Abre {s(org.attributes.nearest_open_time).calendar()}.</p>)}
          <OpenCloseHours org={org} />
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <ChatBubbleBottomCenterIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Valoraciones</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            Google
          </p>
          <p className="text-md font-bold">
            {org.attributes.google_place_details?.rating} <span className="text-sm font-light">/ 5</span>
          </p>
          <p className="text-sm">
            ERRENTA.EUS
          </p>
          <p className="text-md font-bold">
            {org.attributes.ratings.average} <span className="text-sm font-light">/ 5</span>
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <PhoneArrowUpRightIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Teléfono</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            {org.attributes.phone}
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <MapPinIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Dirección</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <p className="text-sm">
            {org.attributes.street}, {org.attributes.city}, <br /> {org.attributes.province}
          </p>
        </GeneralCardContent>
      </GeneralCard>
      <GeneralCard variant="slate" className={cardCn}>
        <GeneralCardHeading>
          <ArrowUpRightIcon className="h-6 w-6  mb-2" />
          <p className="text-xl font-bold mb-2">Página web</p>
        </GeneralCardHeading>
        <GeneralCardContent>
          <a className="text-sm text-blue-500 underline" href={org.attributes.website}>
            {org.attributes.website}
          </a>
        </GeneralCardContent>
      </GeneralCard>
    </>
  );
};

const OpenCloseHours = (props: { org: Organization }) => {
  const { org } = props;
  const s = useLocalizedMoment();

  const getName = (day: string) => {
    switch (day) {
      case "monday":
        return "Lunes";
      case "tuesday":
        return "Martes";
      case "wednesday":
        return "Miércoles";
      case "thursday":
        return "Jueves";
      case "friday":
        return "Viernes";
      case "saturday":
        return "Sábado";
      case "sunday":
        return "Domingo";
    }
  };

  const names = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

  return (
    <>
      {names.map((day, i) => (
        <p className="text-white text-sm" key={i}>{getName(day)}: {" "}
        {org.attributes.open_close_hours[day] && org.attributes.open_close_hours[day]?.open !== 'closed' ?
        <>
        {
          s.utc(org.attributes.open_close_hours[day].open, "HH:mm").local().format("HH:mm")
        } - {s.utc(org.attributes.open_close_hours[day].close, "HH:mm").local().format("HH:mm")}
        </> : "Cerrado"}
        
        </p>
      ))}
    </>
  );
};