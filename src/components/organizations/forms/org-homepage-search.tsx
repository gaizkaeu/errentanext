"use client";
import { SearchBar } from '@/components/filters';
import { LocationConfiguration } from '@/components/filters/location-filter';
import Popover from '@/components/ui/popover-card';
import { useState } from 'react';
export const OrgHomepageSearch = () => {
  const [focused, setFocused] = useState(true);
  const [searchParams, setSearchParams] = useState({});

  return (
    <div>
      <SearchBar searchParams={searchParams} setSearchParams={setSearchParams}>
        <Popover content={
          <LocationConfiguration />
        }
          openPopover={focused}
          setOpenPopover={setFocused}
        >

          <button onClick={() => setFocused(!focused)} className="text-2xl text-gray-700 dark:text-gray-400 border-b dark:bg-black border-b-midnight-800 whitespace-nowrap font-light leading-tight tracking-tighter w-20 md:w-64 lg:w-72 md:text-5xl lg:text-6xl lg:leading-[1.1] focus:outline-none">
            Madrid
          </button>
        </Popover>
      </SearchBar>
    </div>

  )
}