import { Button } from "@/components/ui/button";
import { Organization } from "@/store/types/Organization";
import { CalculatorIcon, GlobeEuropeAfricaIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export const OrganizationActionsSmall = (props: { org: Organization }) => {

  const { org } = props;

  return (

    <div className="flex gap-4 place-content-center">
      <a href="#">
        <Button variant="subtle">
          <span className="sr-only">Calcular en {org.attributes.name}</span>
          <CalculatorIcon className="h-6" />
        </Button>
      </a>
      <a href={`tel:${org.attributes.phone}`}>
        <Button variant="subtle">
          <span className="sr-only">Llamar a {org.attributes.name}</span>
          <PhoneIcon className="h-6" />
        </Button>
      </a>
      <a href={`tel:${org.attributes.phone}`}>
        <Button variant="subtle">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <MapPinIcon className="h-6" />
        </Button>
      </a>
      <a href={`tel:${org.attributes.phone}`}>
        <Button variant="subtle">
          <span className="sr-only">Ir a {org.attributes.name}</span>
          <GlobeEuropeAfricaIcon className="h-6" />
        </Button>
      </a>
    </div>
  )
}