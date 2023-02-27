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

export const OrganizationExploreMap = () => {

  const [search, setSearch] = useState({});
  const { currentData } = useGetOrganizationsQuery(search);

  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="max-lg:hidden lg:col-span-2 flex flex-col gap-2 items-center mt-24">
        <OrganizationList orgs={currentData ?? []} search={search} setSearch={setSearch} />
      </div>
      {typeof window !== "undefined" && window.innerWidth < 1024 && (
        <BottomSheetComponent>
          <OrganizationList orgs={currentData ?? []} search={search} setSearch={setSearch} />
        </BottomSheetComponent>
      )}
      <div className="relative col-span-7 lg:col-span-5">
        <div className='absolute inset-x-0 top-20 lg:top-24 z-10'>
          <div className='flex items-center dark:bg-slate-800 bg-white p-2 rounded-xl w-fit mx-auto gap-2'>
            <h2 className="z-10 text-2xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Explorar
            </h2>
            <h3 className="z-10 text-2xl font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Asesorías.
            </h3>
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
        maxHeight - maxHeight / 8,
        maxHeight / 4,
        maxHeight * 0.8,
      ]}
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
    if (map === undefined) {
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
  }, [props.orgs]);

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
        disableDefaultUI: true,
        center: //coordinates of madrid
        {
          lat: 40.416775,
          lng: -3.703790
        },
        zoom: 10,
        // add markers for all organizations
      });
      props.setMap(map);
    });
  }, []);
  return (
    <div id="map" className="h-screen z-0" ref={googlemap} />
  );
}