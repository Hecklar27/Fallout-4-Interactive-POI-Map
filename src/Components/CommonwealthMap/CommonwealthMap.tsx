import * as React from 'react';
import classNames from 'classnames';
import './CommonwealthMap.scss';
import {
    MapContainer,
    ImageOverlay,
} from 'react-leaflet';
import * as L from 'leaflet';
import commonwealthMapImageSrc from './the-commonwealth-map.jpg';
import CommonwealthMarker from 'Components/CommonwealthMarker/CommonwealthMarker';
import type { CommonwealthMarkerProps } from 'Components/CommonwealthMarker/CommonwealthMarker';
import type {
    MarkerInterface,
} from 'types';
import {
    selectIsFoundMarkersShown,
    selectMarkers,
    toggleMarkerAsFound,
} from 'Slices/appSlice';
import {
    useAppDispatch,
    useAppSelector,
} from 'hooks';

const bounds = new L.LatLngBounds({
    lat: 0,
    lng: 0,
}, {
    // for now, this is just the size of the map image.
    lat: 2048,
    lng: 2048
});

export interface CommonwealthMapProps {
    className?: string;
    onMarkerAdd?: (marker: MarkerInterface) => CommonwealthMarkerProps['onAdd'];
}

const CommonwealthMap = ({
    className = '',
    onMarkerAdd = undefined,
}: CommonwealthMapProps): JSX.Element => {

    const isFoundMarkersShown = useAppSelector(selectIsFoundMarkersShown);

    const markers = useAppSelector(selectMarkers);

    const dispatch = useAppDispatch();

    const handleMarkButtonClick = (marker: MarkerInterface): () => void => React.useCallback((): void => {
        dispatch(toggleMarkerAsFound(marker));
    }, []);

    return (

        <MapContainer
            className={classNames([
                'commonwealth-map',
                className,
            ])}
            maxZoom={4}
            crs={L.CRS.Simple}
            bounds={bounds}
        >

            <ImageOverlay
                url={commonwealthMapImageSrc}
                bounds={bounds}
            />

            {markers && markers.map((marker) => {

                // Must move these before the null returns to avoid difference in hooks calls.
                const onAdd = onMarkerAdd ? onMarkerAdd(marker) : undefined;
                const onMarkButtonClick = handleMarkButtonClick(marker);

                if (!marker.lat || !marker.lng) {
                    return null;
                }

                // Don't render found items.
                if (!isFoundMarkersShown && marker.isFound) {
                    return null;
                }

                if (marker.isHidden) {
                    return null;
                }

                return (

                    <CommonwealthMarker
                        key={marker.id}
                        lat={marker.lat}
                        lng={marker.lng}
                        isFound={marker.isFound}
                        url={marker.url}
                        title={marker.title}
                        desc={marker.desc}
                        imgSrc={marker.imgSrc}
                        onMarkButtonClick={onMarkButtonClick}
                        type={marker.type}
                        subType={marker.subType}
                        onAdd={onAdd}
                    />

                );

            })}

        </MapContainer>

    );

};

export default CommonwealthMap;
