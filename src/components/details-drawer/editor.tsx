"use client";

import { Drawer } from 'vaul';
import { XIcon } from "lucide-react";
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import type { Artifact, Resource } from '@/lib/shared';
import Preview from './preview';
import Metadata from './metadata';
import Artifacts from './artifacts';
import get from 'lodash/get';
import Video from './video';





export function ResourceViewer(
    { open, resource, artifacts, onClose }:
        { open: boolean; resource: Resource | null; artifacts: Array<Artifact> | null; onClose: () => void }
) {
    if (!resource) return null;
    return (
        <Drawer.Root
            modal
            direction="right"
            open={open}
            onClose={onClose}
        >
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content
                    className="right-2 top-2 bottom-2 fixed z-10 outline-none max-w-3xl w-full flex !select-text"
                    style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
                >
                    <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[2px]  overflow-scroll">
                        <Drawer.Title className="py-4 pb-0 mb-4 font-bold text-xl text-blue-800 grid grid-cols-[1fr_25px] items-center justify-between gap-4">
                            <h1 className='line-clamp-2'>{resource?.["name"]}</h1>
                            <XIcon onClick={onClose} className='cursor-pointer' color='gray' />
                        </Drawer.Title>
                        <Drawer.Description className="text-zinc-600 mb-2">
                            <Preview resource={resource} />
                            <Accordion type="single" collapsible className="w-full" defaultValue="resource">
                                {artifacts && artifacts.length && <AccordionItem value="artifacts" className='border-none'>
                                    <AccordionTrigger className='border border-gray-100 px-4 py-3 rounded-md mb-3 bg-blue-100 hover:bg-blue-800 hover:text-white hover:no-underline'>Artifacts</AccordionTrigger>
                                    <AccordionContent className='px-4'>
                                        <Artifacts
                                            self={resource["_self"]}
                                            artifacts={artifacts}
                                        />
                                    </AccordionContent>
                                </AccordionItem>}
                                <AccordionItem value="Metadata" className='border-none'>
                                    <AccordionTrigger className='border border-gray-100 px-4 py-3 rounded-md mb-3 bg-blue-100 hover:bg-blue-800 hover:text-white hover:no-underline'>Metadata</AccordionTrigger>
                                    <AccordionContent className='px-4'>
                                        <Metadata resource={resource} />
                                    </AccordionContent>
                                </AccordionItem>
                                {get(resource, "video.embedUrl") &&
                                    <AccordionItem value="Preview" className='border-none'>
                                        <AccordionTrigger className='border border-gray-100 px-4 py-3 rounded-md mb-3 bg-blue-100 hover:bg-blue-800 hover:text-white hover:no-underline'>Preview</AccordionTrigger>
                                        <AccordionContent className='px-4 flex items-center justify-center'>
                                            <Video link={get(resource, "video.embedUrl", "")} />
                                        </AccordionContent>
                                    </AccordionItem>}
                                <AccordionItem value="resource" className='border-none'>
                                    <AccordionTrigger className='border border-gray-100 px-4 py-3 rounded-md mb-3 bg-blue-100 hover:bg-blue-800 hover:text-white hover:no-underline'>Resource</AccordionTrigger>
                                    <AccordionContent className='px-4 mb-0'>
                                        <div className="p-4 pb-0">
                                            <JsonView
                                                src={resource}
                                                collapsed={1}
                                                displaySize={3}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                        </Drawer.Description>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
