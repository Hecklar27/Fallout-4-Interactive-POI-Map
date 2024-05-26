import * as React from 'react';
import classNames from 'classnames';
import './SettingsPanel.scss';
import Fallout4LogoImageSrc from './fallout-4-logo.png';
import MarkerTypePanel from 'Components/MarkerTypePanel/MarkerTypePanel';
import type { MarkerTypePanelProps } from 'Components/MarkerTypePanel/MarkerTypePanel';
import {
    typeMap,
} from 'types';
import type {
    MarkerInterface,
    MarkerType,
} from 'types';
import {
    Button,
    Checkbox,
    Stack,
    Tooltip,
    Box,
    Image,
    Heading,
    Link,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import {
    selectIsFoundMarkersShown,
    selectCollectiblesMarkers,
    selectUniqueLootMarkers,
    selectOtherMarkers,
    toggleShowFoundMarkers,
    filterMarkerType,
    showAllMarkers,
    toggleMarkerAsFound,
} from 'Slices/appSlice';
import {
    useAppDispatch,
    useAppSelector,
} from 'hooks';

export interface SettingsPanelProps {
    className?: string;
    appVersion?: string;
    onMarkerTitleClick?: MarkerTypePanelProps['onMarkerTitleClick'];
    onShowAllClick?: React.DOMAttributes<Element>['onClick'];
    onTypeClick?: (type: MarkerType) => void;
    isLargeScreen?: boolean;
}

const SettingsPanel = ({
    className = '',
    appVersion = '',
    onMarkerTitleClick = undefined,
    onShowAllClick = undefined,
    onTypeClick = undefined,
    isLargeScreen = true,
    // ...props
}: SettingsPanelProps): JSX.Element => {

    const isFoundMarkersShown = useAppSelector(selectIsFoundMarkersShown);

    const collectiblesMarkers = useAppSelector(selectCollectiblesMarkers);
    const uniqueLootMarkers = useAppSelector(selectUniqueLootMarkers);
    const otherMarkers = useAppSelector(selectOtherMarkers);

    const dispatch = useAppDispatch();

    const handleShowAllClick = (event: React.MouseEvent): void => {
        dispatch(showAllMarkers());
        if (onShowAllClick) {
            onShowAllClick(event);
        }
    };

    const handleClickShowFoundMarkers = (): void => {
        dispatch(toggleShowFoundMarkers());
    };

    const handleTypeClick = (type: MarkerType) => (): void => {
        dispatch(filterMarkerType(type));
        if (onTypeClick) {
            onTypeClick(type);
        }
    };

    const handleMarkButtonClick = (marker: MarkerInterface): () => void => React.useCallback((): void => {
        dispatch(toggleMarkerAsFound(marker));
    }, []);

    return (

        <Box
            as="section"
            className={classNames([
                'settings-panel',
                className,
            ])}
        >

            <header
                className={classNames('settings-panel__header')}
            >

                <figure
                    className={classNames('settings-panel__logo')}
                >

                    <Image
                        src={Fallout4LogoImageSrc}
                        alt="Fallout 4 Logo"
                    />

                </figure>

                <Heading
                    marginY="4"
                >
                    Interactive Map
                </Heading>

                <Stack
                    direction={isLargeScreen ? 'row' : 'column'}
                    align="center"
                    justify="center"
                    spacing="2"
                >

                    <Tooltip
                        label="Show all marker types"
                        placement="top"
                        hasArrow={true}
                    >

                        <Button
                            onClick={handleShowAllClick}
                            leftIcon={(
                                <FontAwesomeIcon
                                    icon={faEye}
                                />
                            )}
                            variant="outline"
                        >
                            Show All Types
                        </Button>

                    </Tooltip>

                    <Checkbox
                        isChecked={isFoundMarkersShown}
                        onChange={handleClickShowFoundMarkers}
                        size="lg"
                    >

                        <Tooltip
                            label="If checked, markers 'marked as found' will be shown transparent on the map."
                            placement="top"
                            hasArrow={true}
                        >

                            Show Found Markers

                        </Tooltip>

                    </Checkbox>

                </Stack>

            </header>

            <div
                className={classNames('settings-panel__content')}
            >

                {/* TODO: iterate over typeMap values*/}
                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.Collectibles}
                    markers={collectiblesMarkers}
                    onMarkButtonClick={handleMarkButtonClick}
                    onTypeClick={handleTypeClick(typeMap.Collectibles)}
                    onMarkerTitleClick={onMarkerTitleClick}
                />
                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.UniqueLoot}
                    markers={uniqueLootMarkers}
                    onMarkButtonClick={handleMarkButtonClick}
                    onTypeClick={handleTypeClick(typeMap.UniqueLoot)}
                    onMarkerTitleClick={onMarkerTitleClick}
                />
                <MarkerTypePanel
                    className="settings-panel__marker-type-panel"
                    type={typeMap.Other}
                    markers={otherMarkers}
                    onMarkButtonClick={handleMarkButtonClick}
                    onTypeClick={handleTypeClick(typeMap.Other)}
                    onMarkerTitleClick={onMarkerTitleClick}
                />
            </div>

            <footer
                className={classNames('settings-panel__footer')}
            >
                <p>
                Created By

                {' '}

                <Link
                    href="https://github.com/Hecklar27"
                    isExternal={true}
                    color="blue.500"
                >
                    Hecklar27
                </Link>

                {" & "}

                <Link
                    href="https://github.com/All-Star-Vagabond"
                    isExternal={true}
                    color="#00BFFF"
                >
                    All-Star-Vagabond
                </Link>

                {' | '}

                v{appVersion}

                {' | '}

                <Link
                    href="https://github.com/Hecklar27/Fallout-4-Interactive-POI-Map"
                    isExternal={true}
                    color="blue.500"
                >
                    View on Github
                </Link>

                </p>
                <p>
                <Link
                    href="https://srt4rulez.github.io/fallout-new-vegas-interactive-map/"
                    isExternal={true}
                    color="blue.500"
                >
                    srt4rulez's New Vegas Map
                </Link>
                </p>
            </footer>

        </Box>

    );

};

export default SettingsPanel;
