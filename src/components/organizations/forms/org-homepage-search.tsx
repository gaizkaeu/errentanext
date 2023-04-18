"use client";
import { SearchBar } from '@/components/filters';
// import { LocationConfiguration } from '@/components/filters/location-filter';
import Popover from '@/components/ui/popover-card';
import { useSearch } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const OrgHomepageSearch = () => {
  const [focused, setFocused] = useState(true);
  const [searchParams, setSearchParams] = useSearch(true);

  useEffect(() => {
    fetch("https://api.ipgeolocation.io/ipgeo?apiKey=3b0a7d4a0d7d4ce18632bbfa46321c99").then((res) => res.json()).then((data) => {
      setSearchParams({ 'q[near_by]': data.city })
    });
  }, []);

  return (
    <div>
      <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}>
        <Popover content={
          // <LocationConfiguration />
          <></>
        }
          openPopover={focused}
          setOpenPopover={setFocused}
        >

          <button onClick={() => setFocused(!focused)} className="text-2xl text-gray-700 dark:text-gray-400 border-b dark:bg-black border-b-midnight-800 whitespace-nowrap font-light leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1] focus:outline-none">
            {searchParams['q[near_by]'] || '¿Dónde?'}
          </button>
        </Popover>
      </SearchBar>
    </div>

  )
}