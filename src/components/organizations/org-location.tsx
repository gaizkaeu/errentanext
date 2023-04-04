"use client";

import { Organization } from '@/store/types/Organization';
import { GoogleMap } from '../map';
import { OrganizationMarker } from './map';

export function OrganizationLocation(props: {org: Organization}) {

    return (
    <GoogleMap gesture="none" center={{
        lat: props.org.attributes.latitude,
        lng: props.org.attributes.longitude
    }} zoom={8}>
        <OrganizationMarker org={props.org} selected={false} />
    </GoogleMap>
    );
}