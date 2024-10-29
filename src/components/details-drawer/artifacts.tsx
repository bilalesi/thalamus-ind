"use client";

import { DownloadIcon } from "lucide-react";
import {
    TableCell,
    Table,
    TableBody,

    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { bytesToMB } from "@/lib/utils";
import type { Artifact, } from '@/lib/shared';


export default function Artifacts({ self, artifacts }: { self: string; artifacts: Array<Artifact> }) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">...</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {artifacts.map((distr) => (
                        <TableRow key={distr.url}>
                            <TableCell className="font-medium">{distr.name}</TableCell>
                            <TableCell>{distr.type}</TableCell>
                            <TableCell>{bytesToMB(distr.size)} mb</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="icon">
                                    {distr.downloadable ? (
                                        <a download={distr.name} href={distr.path} >
                                            <DownloadIcon className="h-4 w-4" />
                                        </a>
                                    ) : (
                                        <a target="_blank" rel="noopener noreferrer" href={distr.path} >
                                            <DownloadIcon className="h-4 w-4" />
                                        </a>
                                    )}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{artifacts.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}