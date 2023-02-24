"use client";
import { useContext, useEffect, useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { BaseTooltip, SearchContext, TooltipContentBase } from ".";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { LoadingText } from "../ui/loading-text";

export const LocationFilter = () => {
  const { searchParams } = useContext(SearchContext);

  return (
    <BaseTooltip
      title={
        "coordinates[place_name]" in searchParams ? (
          "Cerca de " + searchParams["coordinates[place_name]"].substring(0, 12) + "..."
        ) : (
          "Location"
        )
      } active={"coordinates[status]" in searchParams}>
      <LocationConfiguration />
    </BaseTooltip>
  );
};

export const LocationConfiguration = () => {
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const [available, setAvailable] = useState(false);
  const t = useTranslations()

  const updateSearchValue = (value: any) => {
    if (value.value.place_id) {
      geocodeByPlaceId(value.value.place_id)
        .then((results) => {
          setSearchParams({
            ...searchParams,
            ["coordinates[place_name]"]: results[0].formatted_address,
            ["coordinates[place_id]"]: results[0].place_id,
            ["coordinates[latitude]"]: results[0].geometry.location.lat(),
            ["coordinates[longitude]"]: results[0].geometry.location.lng(),
            ["coordinates[status]"]: "dir",
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleLocationToggle = () => {
    setSearchParams({
      ...searchParams,
      ["coordinates[status]"]: "loading",
    });

    navigator.geolocation.getCurrentPosition(
      function (position) {
        geocodeByLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
          .then((results) => {
            setSearchParams({
              ...searchParams,
              ["coordinates[place_name]"]: results[0].formatted_address,
              ["coordinates[place_id]"]: results[0].place_id,
              ["coordinates[latitude]"]: position.coords.latitude,
              ["coordinates[longitude]"]: position.coords.longitude,
              ["coordinates[status]"]: "live",
            });
          })
          .catch((error) => console.error(error));
      },
      function (_error) {
        handleLocationDisable();
      }
    );
  };

  const handleLocationDisable = () => {
    setSearchParams((current: any) => {
      const cp = { ...current };
      delete cp["coordinates[latitude]"];
      delete cp["coordinates[longitude]"];
      delete cp["coordinates[distance]"];
      delete cp["coordinates[status]"];
      delete cp["coordinates[place_name]"];
      delete cp["coordinates[place_id]"];
      return cp;
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      setAvailable(true);
    }
  }, []);

  return (
    <TooltipContentBase title="location">
      <div>
        <div className="w-64">
          <div className="">
            <GooglePlacesAutocomplete
              selectProps={{
                value: {
                  label: searchParams["coordinates[place_name]"],
                  value: {
                    place_id: searchParams["coordinates[place_object]"],
                  },
                },
                onChange: updateSearchValue,
              }}
              autocompletionRequest={{
                componentRestrictions: {
                  country: ["es"],
                },
              }}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API}
            />
          </div>
          <div>
            {searchParams["coordinates[status]"] ? (
              <Button onClick={handleLocationDisable} color="error" size="sm">
                {t("global.disable")}
              </Button>
            ) : searchParams["coordinates[status]"] === "loading" ? (
              <LoadingText />
            ) : (
              <Button
                size="sm"
                onClick={handleLocationToggle}
                disabled={!available}
              >Locate me</Button>
            )}
          </div>
        </div>
      </div>
    </TooltipContentBase>
  );
};
