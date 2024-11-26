const url = "https://bbp.epfl.ch/nexus/v1/views/public/topological-sampling/https%3A%2F%2Fbluebrain.github.io%2Fnexus%2Fvocabulary%2Ftopo2021.2SparqlIndex/sparql"
const token = "Bearer xxx";

const data_dashboards = {
    all_data: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX schema: <http://schema.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT (CONCAT(STR(?self_wo_tag), '?tag=TOPO2021.2') AS ?self) ?output ?outputDescription (GROUP_CONCAT(DISTINCT ?derivation; SEPARATOR=", ") AS ?input) ?modelledBrainRegion ?modelledSpecies (CONCAT(?givenName, " ", ?familyName) AS ?contributor) ?license
WHERE {
?entity nxv:self ?self_wo_tag ;
   nxv:deprecated false ;
   nxv:createdAt ?registeredAt ;
   nxv:createdBy ?registered_by ;
   nxv:updatedAt ?updatedAt ;
   nxv:updatedBy ?updated_by ;
   a schema:Dataset ;
   schema:name ?output ;
   schema:description ?outputDescription .
  OPTIONAL { ?entity nsg:derivation / prov:entity / schema:name ?derivation } . 
  OPTIONAL { ?entity nsg:contribution / prov:agent ?agent } .
  OPTIONAL { ?agent schema:familyName ?familyName } . 
  OPTIONAL { ?agent schema:givenName ?givenName } . 
  OPTIONAL { ?entity nsg:brainLocation / nsg:brainRegion / rdfs:label ?modelledBrainRegion } . 
  OPTIONAL { ?entity nsg:subject / nsg:species / rdfs:label ?modelledSpecies } . 
  OPTIONAL { ?entity schema:license ?license } .  
  BIND (STR(?registered_by) AS ?registered_by_str) .
  BIND (STR(?updated_by) AS ?updated_by_str) .
  FILTER NOT EXISTS { ?entity schema:hasPart ?part } .
}
GROUP BY ?self ?entity ?output ?license ?outputDescription ?modelledBrainRegion ?modelledSpecies ?givenName ?familyName ?contributor ?registeredAt ?updatedAt ?registered_by ?registered_by_str ?registeredBy ?updated_by ?updated_by_str ?updatedBy ?self_wo_tag
LIMIT 100`,
    analysis_results: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX schema: <http://schema.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT (CONCAT(STR(?self_wo_tag), '?tag=TOPO2021.2') AS ?self) ?analysisResult ?analysisResultDescription ?modelledBrainRegion ?modelledSpecies (CONCAT(?givenName, " ", ?familyName) AS ?contributor) 
?codeVersion ?license 
WHERE  {  
  ?entity nxv:self ?self ;
   nxv:deprecated false ;
   a schema:Dataset ;
   schema:name ?analysisResult ;
   schema:description ?analysisResultDescription .
 ?entity nsg:derivation / prov:entity / schema:name ?derivation . 
 ?entity nsg:generation / prov:activity / prov:wasAssociatedWith ?softwareAgent .
 ?softwareAgent a prov:SoftwareAgent ;
                 schema:name ?softwareName ;
                 nsg:softwareSourceCode / schema:codeRepository ?codeRepository ;
                 nsg:softwareSourceCode / schema:version ?codeVersion .
  OPTIONAL { ?entity nsg:contribution / prov:agent ?agent } .
  OPTIONAL { ?agent schema:familyName ?familyName } . 
  OPTIONAL { ?agent schema:givenName ?givenName } . 
  OPTIONAL { ?entity nsg:brainLocation / nsg:brainRegion / rdfs:label ?modelledBrainRegion } . 
  OPTIONAL { ?entity nsg:subject / nsg:species / rdfs:label ?modelledSpecies } . 
  OPTIONAL { ?entity schema:license ?license } .  
  FILTER NOT EXISTS { ?entity schema:hasPart ?part } .
}
LIMIT 100`,
    configurations: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX schema: <http://schema.org/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT DISTINCT (CONCAT(STR(?self_wo_tag), '?tag=TOPO2021.2') AS ?self) ?name (CONCAT(?givenName, " ", ?familyName) AS ?contributor) ?softwareName ?codeVersion ?codeRepository ?runtimePlatform ?license
WHERE {
?entity nxv:self ?self_wo_tag ;
   nxv:deprecated false ;
   nxv:createdAt ?registeredAt ;
   nxv:createdBy ?registered_by ;
   nxv:updatedAt ?updatedAt ;
   nxv:updatedBy ?updated_by ;
   a nsg:Configuration ;
   schema:name ?name ;
  BIND (STR(?registered_by) AS ?registered_by_str) .
  BIND (STR(?updated_by) AS ?updated_by_str) .
OPTIONAL { ?entity nsg:contribution / prov:agent ?agent } .
OPTIONAL { ?agent schema:familyName ?familyName } .
OPTIONAL { ?agent schema:givenName ?givenName } .
OPTIONAL { ?entity schema:license ?license } .
?entity ^prov:used / prov:wasAssociatedWith ?softwareAgent .
?softwareAgent a prov:SoftwareAgent ;
                 schema:name ?softwareName ;
                 nsg:softwareSourceCode / schema:codeRepository ?codeRepository ;
                 nsg:softwareSourceCode / schema:version ?codeVersion ;
                 nsg:softwareSourceCode / schema:runtimePlatform ?runtimePlatform .
}
LIMIT 100`,
    input_data: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX schema: <http://schema.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT DISTINCT (CONCAT(STR(?self_wo_tag), '?tag=TOPO2021.2') AS ?self) ?input ?inputDescription ?modelledBrainRegion ?modelledSpecies (CONCAT(?givenName, " ", ?familyName) AS ?contributor) ?license
WHERE {
?entity nxv:self ?self_wo_tag ;
   nxv:deprecated false ;
   nxv:createdAt ?registeredAt ;
   nxv:createdBy ?registered_by ;
   nxv:updatedAt ?updatedAt ;
   nxv:updatedBy ?updated_by ;
   a schema:Dataset ;
   schema:name ?input ;
   schema:description ?inputDescription .
 FILTER NOT EXISTS { ?entity nsg:derivation / prov:entity / schema:name ?derivation } .
 FILTER NOT EXISTS { ?entity schema:name "notebooks" } .
  OPTIONAL { ?entity nsg:contribution / prov:agent ?agent } .
  OPTIONAL { ?agent schema:familyName ?familyName } . 
  OPTIONAL { ?agent schema:givenName ?givenName } . 
  OPTIONAL { ?entity nsg:brainLocation / nsg:brainRegion / rdfs:label ?modelledBrainRegion } . 
  OPTIONAL { ?entity nsg:subject / nsg:species / rdfs:label ?modelledSpecies } . 
  OPTIONAL { ?entity schema:license ?license } .  
  BIND (STR(?registered_by) AS ?registered_by_str) .
  BIND (STR(?updated_by) AS ?updated_by_str) .
  FILTER NOT EXISTS { ?entity schema:hasPart ?part } .
}
GROUP BY ?self ?entity ?input ?license ?inputDescription ?modelledBrainRegion ?modelledSpecies ?givenName ?familyName ?contributor ?registeredAt ?updatedAt ?registered_by ?registered_by_str ?registeredBy ?updated_by ?updated_by_str ?updatedBy ?self_wo_tag
LIMIT 100`,
    notebooks: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX schema: <http://schema.org/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX vocab: <https://bbp.epfl.ch/nexus/v1/resources/public/topological-sampling/_/>

SELECT DISTINCT (CONCAT(STR(?self_wo_tag), '?tag=TOPO2021.2') AS ?self) ?name ?description (CONCAT(?givenName, " ", ?familyName) AS ?contributor) ?license
WHERE {
?entity nxv:self ?self_wo_tag ;
   nxv:deprecated false ;
   nxv:createdAt ?registeredAt ;
   nxv:createdBy ?registered_by ;
   nxv:updatedAt ?updatedAt ;
   nxv:updatedBy ?updated_by ;
   a vocab:Notebook ;
   schema:name ?name ;
   schema:description ?description ;
  BIND (STR(?registered_by) AS ?registered_by_str) .
  BIND (STR(?updated_by) AS ?updated_by_str) .
OPTIONAL { ?entity nsg:contribution / prov:agent ?agent } .
OPTIONAL { ?agent schema:familyName ?familyName } .
OPTIONAL { ?agent schema:givenName ?givenName } .
OPTIONAL { ?entity schema:license ?license } .
}
LIMIT 100`
};

const fetch_query = async (query: string) => {
    const response = await fetch(url, {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "text/plain",
            "Authorization": token,
        },
        "referrer": "https://bbp.epfl.ch/nexus/v1/views/public/thalamus/https%3A%2F%2Fbluebrain.github.io%2Fnexus%2Fvocabulary%2F20240305SparqlIndex/sparql",
        "body": query,
        "method": "post",
    })
    return await response.json()
}

export const fetch_resource = async (url: string, type: "blob" | "json" = "json"): Promise<any> => {
    const resp = await fetch(url, {
        "credentials": "include",
        "headers": {
            "Accept": type === "json" ? "application/json" : "*/*",
            "Content-Type": "application/json",
            "Authorization": token,
        },
        "method": "get",
        "mode": "cors"
    });
    if (type === "json") return await resp.json();
    else if (type === "blob") {
        console.log('@@url', url, `-- [${resp.ok}]`);
        if (!resp.ok) {
            const _url = `https://bbp.epfl.ch/nexus/v1/resources/public/topological-sampling?deprecated=false&from=0&q=${url}&size=1`;
            const _resp = await fetch(_url, {
                "credentials": "include",
                "headers": {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                "method": "get",
                "mode": "cors"
            });
            const _res = (await _resp.json())._results;
            console.log('@@ES-results', `-- [${_res ? _res.length : "no-results"}]`);
            if (_res && _res.length) {
                const __url = _res[0]._self;
                return await fetch_resource(__url, "blob");
            }
            return null;
        }
        return await (await resp.arrayBuffer())
    };

}

export function isObject(value: any) {
    return value !== null && typeof value === 'object';
}


export const ensureArray = (obj: any) => {
    if (Array.isArray(obj)) return obj;
    else return [obj];
}

export const downloadArtifacts = async (resource: any) => {
    try {
        if (isObject(resource) && "distribution" in resource) {
            const distributions = ensureArray(resource.distribution);
            const artifacts = [];
            for (const distr of distributions) {
                if ("contentUrl" in distr) {
                    const self = resource["_self"];
                    const binary = await fetch_resource(distr.contentUrl, "blob");
                    const type = distr["encodingFormat"];
                    const name = distr["name"];
                    const size = distr["contentSize"]["value"];
                    const url = distr.contentUrl;
                    artifacts.push({
                        self, url, binary, name, size, type,
                    });
                }
            }
            return artifacts;
        }
    } catch (error) {
        console.log('@@error', error)
    }
}


export const data_dashboards_result = await Promise.all(Object.values(data_dashboards).map((query) => {
    return fetch_query(query);
}))


import { mkdir, } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

export const createTemporaryDirectory = async (_path: string) => {
    try {
        if (!existsSync(_path)) {
            const final_path = await mkdir(_path, { recursive: true });
            console.log(`[Directory] ${_path} created`)
            return _path;
        } else {
            console.log(`Directory '${_path}' already exists.`);
            return _path;
        }
    } catch (error) {
        console.log('@@createTemporaryDirectory', error)
    }
}


export const writeFileToDirectory = async (name: string, blob: Buffer) => {
    try {
        if (!existsSync(name)) {
            console.log('@@--> do not exist', name)
            const pro = writeFile(name, blob, { flag: "wx" });

            await pro;
        } else {
            console.log('@@--> exist @@', name)
            return path.resolve(name);
        }
    } catch (error) {
        console.log('@@writeFileToDirectory', error)
    }
}

export async function processPageType(
    dash: any,
    path: string | undefined,
    res_path: string | undefined,
    final_data: any[],
    pages: {
        ws: string;
        type: string;
        columns: Array<{
            id: string;
            key: string;
            name: string;
            enableSorting: boolean;
            enableHiding: boolean;
        }>;
        rows: any[];
    }[],
    k: string,
    ws: string,
) {
    const columns = dash["head"]["vars"];
    try {
        const results = dash["results"]["bindings"].map((o: any) => {
            return Object.entries(o)
                .map(([key, val]) => ({
                    [key]: (val as unknown as any).value,
                }))
                .reduce((acc, cur) => ({ ...acc, ...cur }));
        });
        for (const res of results) {
            const resource = await fetch_resource(res.self);
            const resouce_name = resource.name;
            if (!existsSync(`${res_path}/${resouce_name}.json`) && resource['@context'] !== 'https://bluebrain.github.io/nexus/contexts/error.json') {
                await writeFile(`${res_path}/${resouce_name}.json`, Buffer.from(JSON.stringify(resource)), {
                    flag: "wx",
                });
            }
            await createTemporaryDirectory(`${path}/${k}/${resouce_name}`);
            if ("distribution" in resource) {
                const artifacts = [];
                for (const dist of ensureArray(resource.distribution)) {
                    const name = dist["name"];
                    const self = resource["_self"];
                    const type = dist["encodingFormat"];
                    const size = dist["contentSize"]["value"];
                    const url = dist.contentUrl;
                    if (dist.contentUrl && size <= 2_000_000_000 && !existsSync(`${path}/${k}/${resouce_name}/${name}`)) {
                        const binary = await fetch_resource(dist.contentUrl, "blob");
                        await writeFile(`${path}/${k}/${resouce_name}/${name}`, Buffer.from(binary), {
                            flag: "wx",
                        });
                    } else if (size > 2_000_000_000) {
                        await writeFile(`${path}/0__required.json`, `
                            -----------------
                            ws: ${ws}
                            dash: ${k}
                            resource: ${resouce_name}
                            resource_self: ${res.self}
                            dist_name: ${name}
                            distribution: ${JSON.stringify(dist, null, 2)}
                            `, {
                            flag: "a",
                        });
                    }
                    artifacts.push({
                        name,
                        self,
                        type,
                        size,
                        url,
                        path: dist.url ? dist.url : `/artifacts/${k}/${resouce_name}/${name}`,
                        downloadable: !Boolean(dist.url)
                    });
                }
                final_data.push({
                    ...res,
                    name: resource.name,
                    resource,
                    artifacts,
                });
            } else {
                final_data.push({
                    ...res,
                    resource,
                    artifacts: null,
                });
            }
        }

        pages.push({
            columns: columns
                .filter((col: string) => !["self", "resource"].includes(col))
                .map((col: string) => ({
                    id: col,
                    key: col,
                    name: col,
                    enableSorting: true,
                    enableHiding: true,
                })),
            rows: final_data,
            ws: ws,
            type: k,
        });
    } catch (error) {
        console.error("@@error", error);
    }
}