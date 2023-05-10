"use client";
import { useContext, useEffect } from "react";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Button } from "../ui/button";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Input } from "../ui/input";
import Script from "next/script";
import { Separator } from "../ui/separator";

export const LocationFilter = (props: {
  title: string;
  key_name: string;
  key_extra: string;
}) => {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const setSelected = (value: string, extra: string) => {
    setSearchParams({ ...searchParams, [props.key_name]: value, [props.key_extra]: extra });
  };

  return (
    <BaseTooltip title={props.title} active={props.key_name in searchParams} selectedValues={props.key_name in searchParams ? searchParams[props.key_extra] : []}>
      <LocationConfiguration {...props} selected={searchParams[props.key_name] as string | undefined} setSelected={setSelected} extra={searchParams[props.key_extra] as string | undefined} />
    </BaseTooltip>
  );
};

export const LocationConfiguration = (props: {
  title: string;
  key_name: string;
  selected: string | undefined;
  extra: string | undefined;
  setSelected: (value: string, extra: string) => void;
}) => {

  const { selected, setSelected, extra } = props;

  useEffect(() => {
    if (selected && !extra) {
      getGeocode({ location: { lat: parseFloat(selected.split(',')[0]), lng: parseFloat(selected.split(',')[1]) } }).then((results) => {
        setValue(results[0].formatted_address, false);
        setSelected(selected, results[0].formatted_address)
      })
    }
  }, [selected])

  const {
    ready,
    value,
    init,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
    defaultValue: extra,
    initOnMount: false,
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: { description: any }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setSelected(`${lat.toString()},${lng.toString()}`, results[0].address_components[0].short_name)
        });
      };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <Button variant="ghost" key={place_id} onClick={handleSelect(suggestion)}>
          {main_text}, {" "}
          <span className="text-gray-400 text-xs">{secondary_text}</span>
        </Button>
      );
    });

  return (
    <TooltipContentBase title={props.title}>
      <div className='p-2'>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}&libraries=places`}
          onReady={init}
        />
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="¿Dónde buscas una asesoría?"
        />
        <Separator className='mt-2 mb-2' />
        <div className='grid grid-cols-1 space-y-1'>
          {status === "OK" && renderSuggestions()}
        </div>
      </div>
    </TooltipContentBase>
  );
};
