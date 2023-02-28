import { Organization } from '@/store/types/Organization';
import { OrganizationCard } from '../org-card';
import { Link } from 'next-intl';

import { Button } from '@/components/ui/button';
import { BottomSheetComponent } from './navigation/bottom-sheet-nav';
import { MapComponent } from './map-component';
import { OrganizationExplore } from './org-explore';

export const OrganizationExploreMap = (props: { orgs: Organization[]}) => {

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="max-lg:hidden lg:col-span-2 flex flex-col gap-2 items-center mt-24 h-screen overflow-y-auto">
        <OrganizationList orgs={props.orgs} />
      </div>
      <BottomSheetComponent>
        <OrganizationList orgs={props.orgs} />
      </BottomSheetComponent>
      <div className="relative col-span-7 lg:col-span-5">
        <div className='absolute inset-x-0 top-20 lg:top-24 z-10'>
          <div className='w-fit mx-auto'>
            <Link href="/organizations">
              <Button>
                Modo lista
              </Button>
            </Link>
          </div>
        </div>
        <MapComponent orgs={props.orgs} />
      </div>
    </div>
  )
}


const OrganizationList = (props: { orgs: Organization[] }) => {
  return (
    <div className='flex flex-col gap-3 p-3'>
      <p className='text-xl font-bold my-3'>Más de 50 asesorías</p>
      <OrganizationExplore />
      {props.orgs.map((org: Organization) => (
        <Link href={`/organizations/${org.id}`} key={org.id}>
          <OrganizationCard org={org} />
        </Link>
      ))}
    </div>
  )
}