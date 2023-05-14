"use client";
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation';


interface Params {
  [key: string]: any;
}

const useSearch = (serverRedirect: boolean, defaultParams?: Params, onNoInitialParams?: () => void): [Params, (params: Params) => void] => {
  const [searchParams, setSearchParams] = useState<Params>({});
  const s = useSearchParams() as ReadonlyURLSearchParams;
  const r = useRouter();

  useEffect(() => {
    if (s.toString() === '') {
      setRansackSearchParams(defaultParams ?? {});
      if (onNoInitialParams) {
        onNoInitialParams();
      }
      return;
    }
    setSearchParams(queryString.parse(s.toString(),  {arrayFormat: 'bracket'}));
  }, [s]);


  const setRansackSearchParams = (params: Params) => {
    const newSearchParams: Params = { ...searchParams, ...params };
    const queryStringParams = queryString.stringify(newSearchParams, {arrayFormat: 'bracket'});
    setSearchParams(newSearchParams);

    if (serverRedirect) {
      r.push(window.location.pathname + '?' + queryStringParams);
    } else {
      window.history.pushState(
        {},
        '',
        window.location.pathname + '?' + queryStringParams
      );
    }

  };

  return [searchParams, setRansackSearchParams];
};

export { useSearch };
