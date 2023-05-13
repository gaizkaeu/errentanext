"use client";
import { SearchBar } from '@/components/filters';
import { LocationConfiguration } from '@/components/filters/location-filter';
import Popover from '@/components/ui/popover-card';
import { useSearch } from '@/lib/utils';
import { useState } from 'react';

export const OrgHomepageSearch = (props: {children?: JSX.Element}) => {

  const locateIp = () => {
    if (!('no_geoip' in searchParams)) {
      fetch("https://api.ipgeolocation.io/ipgeo?apiKey=3b0a7d4a0d7d4ce18632bbfa46321c99").then((res) => res.json()).then((data) => {
        setSearchParams({ 'q[coordinates_extra]': data.city, 'q[coordinates]': data.latitude + ',' + data.longitude })
      });
    }
  }

  const [focused, setFocused] = useState(true);
  const [searchParams, setSearchParams] = useSearch(true, {}, locateIp);

  const setSelected = (value: string | undefined, extra: string | undefined) => {
    if (!value) {
      setSearchParams({ ...searchParams, 'no_geoip': true, 'q[coordinates]': value, 'q[coordinates_extra]': extra });
    } else {
      setSearchParams({ ...searchParams, 'q[coordinates]': value, 'q[coordinates_extra]': extra});
    }
  };


  return (
    <div>
      <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}>
        <Popover content={
          <LocationConfiguration setSelected={setSelected} extra={searchParams['q[coordinates_extra]'] as string | undefined} selected={searchParams['q[coordinates]'] as string | undefined} title={''} key_name={'q[coordinates]'} />
        }
          openPopover={focused}
          setOpenPopover={setFocused}
        >

          <button onClick={() => setFocused(!focused)} className="text-2xl dark:text-white border-b dark:bg-black border-b-midnight-800 whitespace-nowrap font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] focus:outline-none">
            {searchParams['q[coordinates_extra]'] || '¿Dónde?'}
          </button>
        </Popover>
        {props.children ?? <></>}
      </SearchBar>
    </div>

  )
}