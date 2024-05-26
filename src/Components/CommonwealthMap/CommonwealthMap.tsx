import * as React from 'react';
import classNames from 'classnames';
import './CommonwealthMap.scss';
import {
    MapContainer,
    ImageOverlay,
} from 'react-leaflet';
import * as L from 'leaflet';
//TODO: Layers
//Green Map:
import commonwealthMapImageSrc from './Commonwealth-Background.png';
//Black and White Map:
//import commonwealthMapImageSrc from './the-commonwealth-map.jpg';
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

/*
    lat = (image canvas size) - (y coordinate of image)
    lng = (x coordinate)

    e.x. MS Paint says you're at 128, 342 px, and image is 2048 x 2048 in size.
    lat = 2048 - 342 = 1706 since an image's (0, 0) is on the top left, rather than the bottom right like in a Euclidean coordinate system, so you'll need to compinsate for it
    lng = 128 since the positive x direction is the same in MS Paint and in the Euclidean space
*/
const bounds = new L.LatLngBounds({
    // starting coordinates are equivilant to (0, 0) in Euclidean Space
    lat: 0,
    lng: 0,
}, {
    // boundary stretches the full extent of the image canvas
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
            // L.CRS.Simple changes lat & lng to refer to the x and y coordinates of the map
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
                        lng={marker.lng}
                        lat={marker.lat}
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
