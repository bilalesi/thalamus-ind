const url = "https://bbp.epfl.ch/nexus/v1/views/public/synthetic_axonal_morphologies/https%3A%2F%2Fbluebrain.github.io%2Fnexus%2Fvocabulary%2FdefaultSparqlIndex/sparql";
const token = "Bearer xxx";

const data = {
    neuron_morphology: `PREFIX nxv: <https://bluebrain.github.io/nexus/vocabulary/>
PREFIX nsg: <https://neuroshapes.org/>
PREFIX schema: <http://schema.org/>
PREFIX prov: <http://www.w3.org/ns/prov#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#> 

PREFIX bmo: <https://bbp.epfl.ch/ontologies/core/bmo/>

SELECT DISTINCT ?self ?name ?brainRegion ?subjectName ?subjectSpecies ?subjectStrain ?mtype ?contributor ?description ?license
WHERE { 
  GRAPH ?g0 {
?entity nxv:self ?self ;
        a nsg:NeuronMorphology ;
        nxv:deprecated false ;
        schema:name ?name ;
        schema:description ?description ;
        nxv:createdBy ?registered_by ;
        nxv:createdAt ?registeredAt .

OPTIONAL { ?entity nsg:subject / schema:name ?subjectName } .
OPTIONAL { ?entity nsg:subject / nsg:species / rdfs:label ?subjectSpecies } .
OPTIONAL { ?entity nsg:subject / nsg:strain / rdfs:label ?subjectStrain } .
OPTIONAL { ?entity nsg:brainLocation / nsg:coordinatesInBrainAtlas / nsg:valueX ?xCoordinate ;
         		   nsg:brainLocation / nsg:coordinatesInBrainAtlas / nsg:valueY ?yCoordinate ;
         		   nsg:brainLocation / nsg:coordinatesInBrainAtlas / nsg:valueZ ?zCoordinate} .
OPTIONAL { ?entity  nsg:brainLocation / nsg:atlasSpatialReferenceSystem ?atlas_identifier } .
OPTIONAL { ?entity  nsg:generation / prov:activity / nsg:hadProtocol / schema:keywords ?reconstructionSystem } .
OPTIONAL { ?entity  nsg:generation / prov:activity / nsg:hadProtocol / schema:citation ?paperCitation } .
OPTIONAL { ?entity nsg:annotation ?ssomaAnnotation .
          ?ssomaAnnotation bmo:compartment "Soma" ;
                      nsg:hasBody ?somaBody .
          ?somaBody nsg:isMeasurementOf / rdfs:label "Soma Number Of Points" ;
                nsg:series ?soma_mean_stat .
          ?soma_mean_stat nsg:statistic "N" ;
                     schema:value ?somaNumberOfPoints } .
OPTIONAL { ?entity nsg:annotation ?axonAnnotation .
          ?axonAnnotation bmo:compartment "Axon" ;
                      nsg:hasBody ?axonBody .
          ?axonBody nsg:isMeasurementOf / rdfs:label "Total Length" ;
                nsg:series ?axon_mean_stat .
          ?axon_mean_stat nsg:statistic "mean" ;
                     schema:value ?length ;
         			 schema:unitCode ?unit } .
    
    
 OPTIONAL { ?entity nsg:annotation ?mtypeAnnotation. 
            ?mtypeAnnotation a nsg:MTypeAnnotation ;
                               nsg:hasBody / rdfs:label ?mtype } .   
    
      OPTIONAL { ?entity schema:license ?license } . 
    
BIND (STR(?registered_by) AS ?registered_by_str) . 
BIND (STR(?atlas_identifier) AS ?atlas_identifier_) . 
 }
  OPTIONAL { ?entity nsg:contribution / prov:agent / schema:name ?contributor } .
GRAPH ?g {
    OPTIONAL {
      ?entity nsg:brainLocation / nsg:brainRegion / rdfs:label ?brainRegion .
    }
  }
}   
LIMIT 1000`,
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
            const _url = `https://bbp.epfl.ch/nexus/v1/resources/public/synthetic_axonal_morphologies?deprecated=false&from=0&q=${url}&size=1`;
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


export const data_dashboards_result = await Promise.all(Object.values(data).map((query) => {
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