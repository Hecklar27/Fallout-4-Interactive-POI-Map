/* eslint-disable linebreak-style */
{/* MARKERINIT */ }
const typeMap = {
    Collectibles: 'collectibles',
    UniqueLoot: 'unique_loot',
    Other: 'other',
} as const;

export type Collectibles = typeof typeMap.Collectibles;
export type UniqueLoot = typeof typeMap.UniqueLoot;
export type Other = typeof typeMap.Other;

export type MarkerType = Collectibles | UniqueLoot | Other;

export type TypesThatHaveSubTypes = Collectibles | UniqueLoot | Other;

const typesThatHaveSubTypes: Array<string> = [
    typeMap.Collectibles,
    typeMap.UniqueLoot,
    typeMap.Other,
];

const typeLabelMap = {
    [typeMap.Collectibles]: 'Collectibles',
    [typeMap.UniqueLoot]: 'Unique Loot',
    [typeMap.Other]: 'Other',
} as const;

// Chakra theme colors.
const typeColorMap = {
    [typeMap.Collectibles]: 'green.500',
    [typeMap.UniqueLoot]: 'yellow.300',
    [typeMap.Other]: 'blue.500',
} as const;

const typeColorScheme = {
    [typeMap.Collectibles]: 'green',
    [typeMap.UniqueLoot]: 'yellow',
    [typeMap.Other]: 'blue',
} as const;

interface SubTypeCollectiblesSubMap {
    [key: string]: string;
}

const subTypeCollectiblesSubMap: SubTypeCollectiblesSubMap = {
    BobbleHeads: 'bh',
    RobCoHolotapeGames: 'rchtg',
    OtherHolotapes: 'ht',
    PerkMagazines: 'pm',
};

// Collectible subtypes
export type BobbleHeads = typeof subTypeCollectiblesSubMap.BobbleHeads;
export type RobCoHolotapeGames = typeof subTypeCollectiblesSubMap.RobCoHolotapeGames;
export type OtherHolotapes = typeof subTypeCollectiblesSubMap.OtherHolotapes;
export type PerkMagazines = typeof subTypeCollectiblesSubMap.PerkMagazines;

const subTypeCollectiblesLabelMap = {
    [subTypeCollectiblesSubMap.BobbleHeads]: 'Bobbleheads',
    [subTypeCollectiblesSubMap.RobCoHolotapeGames]: 'RobCo Industries Holotape Games',
    [subTypeCollectiblesSubMap.OtherHolotapes]: 'Miscellaneous Holotapes',
    [subTypeCollectiblesSubMap.PerkMagazines]: 'Perk Magazines',
} as const;

export type CollectibleSubTypes =
    BobbleHeads
    | RobCoHolotapeGames
    | OtherHolotapes
    | PerkMagazines;

export type MarkerSubtype = CollectibleSubTypes;

export interface MarkerInterface {
    id?: string;
    type?: MarkerType;
    subType?: MarkerSubtype;
    title?: string;
    desc?: string;
    url?: string;
    imgSrc?: string;
    lat?: number;
    lng?: number;
    isFound?: boolean;
    isHidden?: boolean;
}

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
    typeColorScheme,
    typesThatHaveSubTypes,
    subTypeCollectiblesSubMap,
    subTypeCollectiblesLabelMap,
};

