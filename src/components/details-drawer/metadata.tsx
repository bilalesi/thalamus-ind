import type { Resource } from "@/lib/shared"
import { getField, isValidHttpUrl } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"

export default function Metadata({ resource }: { resource: Resource }) {
    const fields = {
        type: "@type",
        subject: "subject.species.label",
        "brain region": "brainLocation.brainRegion.label",
        "classification": {
            key: "annotation",
            path: "hasBody['@type']",
            possibleValues: ["MType", "EType"],
            property: "hasBody.label",
        },
        "object of study": "objectOfStudy.label",
        license: "license[@id]"
    }
    const fieldsMapping = Object.keys(fields).map(f => ({ key: f, value: getField(resource, (fields as any)[f]) }))
    return (
        <div className='flex flex-col items-start justify-start gap-3'>
            {fieldsMapping.map(({ key, value }) => {
                if (Array.isArray(value) && value.some((o: any) => typeof o !== "string")) {
                    return (
                        <div key={key} className='flex flex-col items-start justify-center gap-2'>
                            <div className='border rounded-sm border-gray-400 px-4 py-2 capitalize font-bold'>{key}</div>
                            <div className='ml-4 flex gap-2'>
                                {value.map((o: any) => (
                                    <div className='h-full flex items-center gap-2 border rounded-sm border-gray-200'>
                                        <div className='px-4 py-2 font-bold capitalize'>{o.key}</div>
                                        <div className='h-auto w-px bg-gray-400' />
                                        <div className='px-4 py-2'>{isValidHttpUrl(o.value) ? (
                                            <a href={o.value} target="_blank" rel="noopener noreferrer">
                                                <ExternalLinkIcon size={16} color='blue' />
                                            </a>
                                        ) : o.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                } else if (Array.isArray(value)) {
                    return (
                        <div key={key} className='flex flex-col items-start justify-center gap-2'>
                            <div className='border rounded-sm border-gray-400 px-4 py-2 capitalize font-bold'>{key}</div>
                            <div className='ml-4 flex flex-row flex-wrap items-start gap-2'>
                                {value.map((o: any) => (
                                    <div className='border rounded-sm border-gray-200 px-4 py-2'>{o}</div>
                                ))}
                            </div>
                        </div>)
                } else if (value) {
                    return (
                        <div key={key} className='flex items-center justify-center gap-2'>
                            <div className='border rounded-sm border-gray-400 px-4 py-2 capitalize font-bold'>{key}</div>
                            <div className='px-4 py-2'>{isValidHttpUrl(value) ? (
                                <a href={value}>
                                    <ExternalLinkIcon size={16} color='blue' />
                                </a>
                            ) : value}</div>
                        </div>
                    )
                }
                return null;
            }).filter(o => o !== null)}
        </div>
    )
}