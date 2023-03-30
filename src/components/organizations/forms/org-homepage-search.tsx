"use client";
import { useState } from 'react';
export const OrgHomepageSearch = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <input onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        className="text-2xl border-b dark:bg-black border-b-midnight-800 whitespace-nowrap font-light leading-tight tracking-tighter w-20 md:w-64 lg:w-72 md:text-5xl lg:text-6xl lg:leading-[1.1] focus:outline-none" placeholder="Madrid" />
      {focused && <div className="absolute z-10 bg-slate-50 rounded-lg dark:bg-midnight-800 w-64 h-64">asdasd</div>}
    </div>

  )
}