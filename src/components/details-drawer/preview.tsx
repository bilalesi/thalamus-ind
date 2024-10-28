import { isValidDate, isValidHttpUrl } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import get from "lodash/get";
import type { Resource } from "@/lib/shared";

export default function Preview({ resource }: { resource: Resource }) {
    const fields = {
        "_createdBy": "created by",
        "_createdAt": "created at",
        "_updatedBy": "updated by",
        "_updatedAt": "updated at",
        "@type": `types`,
    }
    return (
        <Card className='flex flex-wrap items-start px-4 py-4 gap-y-1 gap-x-4 rounded-sm mb-4 shadow-md'>
            {Object.keys(fields).map(o => {
                const data = get(resource, o, null);
                if (!data) return null;
                return (
                    <div key={o} className='px-2 py-1 grid grid-cols-[minmax(200px,1fr)_auto] items-start justify-center gap-2'>
                        <div className="font-medium capitalize text-base">{(fields as any)[o]}</div>
                        <div className='flex flex-row flex-wrap items-start gap-2'>
                            {Array.isArray(data) ? (
                                <>
                                    {(data as any)?.map((v: any) => (
                                        <div className='font-light text-sm border border-gray-300 px-2 py-1 rounded-base text-blue-800'>{v}</div>
                                    ))}
                                </>
                            ) : (
                                <div className='flex flex-row flex-wrap items-start gap-2 font-light text-base text-blue-800'>
                                    {
                                        isValidHttpUrl(data) ?
                                            (data as any)?.split('/')?.pop() :
                                            isValidDate(data) ?
                                                new Intl.DateTimeFormat('en-US').format(new Date(data)) :
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