import { isValidDate, isValidHttpUrl } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import get from "lodash/get";
import type { Resource } from "@/lib/shared";

export default function Preview({ resource }: { resource: Resource }) {
    const fields = {
        "_createdBy": "created by",
        "_updatedBy": "updated by",
        "_createdAt": "created at",
        "_updatedAt": "updated at",
        "@type": `types`,
    }
    return (
        <Card className='grid grid-cols-2 items-start px-4 py-4 gap-y-1 gap-x-4 rounded-sm mb-4 shadow-md'>
            {Object.keys(fields).map(o => {
                const data = get(resource, o, null);
                if (!data) return null;
                return (
                    <div key={o} className='px-2 py-1 grid grid-cols-[100px_1fr] items-start justify-start gap-2'>
                        <div className="font-medium capitalize text-base">{(fields as any)[o]}</div>
                        <div className='flex flex-row flex-wrap items-start gap-2'>
                            {Array.isArray(data) ? (
                                <>
                                    {(data as any)?.sort((a: string, b: string) => b.length - a.length).map((v: any) => (
                                        <div className='font-light text-sm border border-gray-300 px-2 py-1 rounded-base text-blue-800'>{v}</div>
                                    ))}
                                </>
                            ) : (
                                <div className='flex flex-row flex-wrap items-start gap-2 font-light text-base text-blue-800'>
                                    {
                                        isValidHttpUrl(data) ?
                                            (data as any)?.split('/')?.pop() :
                                            isValidDate(data) ?
                                                new Intl.DateTimeFormat('fr-CH').format(new Date(data)) :
                                                data
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                )
            }).filter(o => o != null)}
        </Card>
    )
}