"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Organization } from '@/store/types/Organization';
import { useGetOrganizationsQuery } from '@/store/api';
import { OrganizationCard } from '../org-card';
import { Link } from 'next-intl';
import { LocationFilter, SearchBar, TextFilter } from '@/components/filters';
import { BottomSheet } from 'react-spring-bottom-sheet'

import 'react-spring-bottom-sheet/dist/style.css'
import { Button } from '@/components/ui/button';

export const OrganizationExploreMap = () => {

  const [search, setSearch] = useState({});
  const { currentData } = useGetOrganizationsQuery(search);

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="max-lg:hidden lg:col-span-2 flex flex-col gap-2 items-center mt-24 h-screen overflow-y-auto">
        <OrganizationList orgs={currentData ?? []} search={search} setSearch={setSearch} />
      </div>
      {typeof window !== "undefined" && window.innerWidth < 1024 && (
        <BottomSheetComponent>
          <OrganizationList orgs={currentData ?? []} search={search} setSearch={setSearch} />
        </BottomSheetComponent>
      )}
      <div className="relative col-span-7 lg:col-span-5">
        <div className='absolute inset-x-0 top-28 lg:top-32 z-10'>
          <div className='w-fit mx-auto'>
            <Link href="/organizations">
              <Button>
                Modo lista
              </Button>
            </Link>
          </div>
        </div>
        <MapComponent orgs={currentData ?? []} />
      </div>
    </div>
  )
}

function BottomSheetComponent(props: { children: JSX.Element }) {

  return (
    <BottomSheet
      open={true}
      blocking={false}
      className='z-20'
      defaultSnap={({ maxHeight }) => maxHeight / 5}
      snapPoints={({ maxHeight }) => [
        maxHeight * 0.85, 
        maxHeight * 0.15
      ]}
      expandOnContentDrag={true}
    >
      <div className='dark:bg-slate-900'>
        {props.children}
      </div>
    </BottomSheet>
  )

}

const OrganizationList = (props: { orgs: Organization[], search: any, setSearch: (arg0: any) => void }) => {
  return (
    <div className='flex flex-col gap-3 p-3'>
      <p className='text-xl font-bold my-3'>Más de 50 asesorías</p>
      <SearchBar searchParams={props.search} setSearchParams={props.setSearch}>
        <TextFilter key_name="name" key="name" title={"Buscar por nombre"} />
        <LocationFilter />
      </SearchBar>
      {props.orgs.map((org: Organization) => (
        <Link href={`/organizations/${org.id}`} key={org.id}>
          <OrganizationCard org={org} />
        </Link>
      ))}
    </div>
  )
}

function MapComponent(props: { orgs: Organization[] }) {
  const [map, setMap] = useState<google.maps.Map>();
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (map == undefined) {
      return;
    }
    // remove all markers
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    // add markers for all organizations
    const newMarkers = props.orgs.map((org) => {
      return new google.maps.Marker({
        position: {
          lat: org.attributes.latitude,
          lng: org.attributes.longitude,
        },
        map: map,
        title: org.attributes.name,
      });
    });
    setMarkers(newMarkers);

  }, [props.orgs, map]);

  return (
    <InnerMap setMap={setMap} />
  );
};


function InnerMap(props: { setMap: ((arg0: google.maps.Map) => void) }) {
  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? '',
      version: 'weekly',
    });
    let map: google.maps.Map;
    loader.load().then(() => {
      if (googlemap.current === null) {
        return;
      }

      map = new google.maps.Map(googlemap.current, {
        disableDoubleClickZoom: false,
        gestureHandling: 'greedy',
        mapId: 'd4895c37d1e0542d',
        disableDefaultUI: true,
        center:
        {
          lat: 40.416775,
          lng: -3.703790
        },
        zoom: 10,
      });

      props.setMap(map);
    });
  }, []);

  return (
    <div id="map" className="h-screen z-0" ref={googlemap} />
  );
}