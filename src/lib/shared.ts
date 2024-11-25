
export const data = {
    neuron_morphology: "Neuron Morphology",
}


export const workspacesList = {
    "data": "Data",
}

export type DataDashboardsListKeys = keyof typeof data;

export const pagesMapping = {
    "data-neuron_morphology": "Data - Neuron Morphology",
}

export const getPageTitleMapping = (ws: string, type: string) => pagesMapping[`${ws}-${type}` as keyof typeof pagesMapping];

export type Distribution = {
    contentUrl: string
    name: string;
    contentSize: { value: number };
    encodingFormat: string;
}

export type Artifact = {
    name: string;
    path: string;
    self: string;
    size: number;
    type: string;
    url: string;
    downloadable: boolean;
}

export type Resource = {
    name: string;
    _self: string;
    distribution: Array<Distribution>
}