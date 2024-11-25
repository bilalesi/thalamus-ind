
export const data = {
    analysis_results: "Analysis Results",
    configurations: "Configurations",
    input_data: "Input Data",
    notebooks: "Notebooks",
}


export const workspacesList = {
    "data": "Data",
}

export type DataDashboardsListKeys = keyof typeof data;

export const pagesMapping = {
    "data-analysis_results": "Data - Analysis Results",
    "data-configurations": "Data - Configurations",
    "data-input_data": "Data - Input Data",
    "data-notebooks": "Data - Notebooks",
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