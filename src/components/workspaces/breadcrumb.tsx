
"use client";

import { SlashIcon } from "@radix-ui/react-icons";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import type { DataDashboardsListKeys } from "../../lib/shared";
import { data, workspacesList } from "../../lib/shared";

type Location = {
    ws: Workspace;
    dash: Dashboard;
} | null;

type Workspace = "data";
type Dashboard = DataDashboardsListKeys;

const getWorkspace = (value?: Workspace) => value && workspacesList[value];
const getDashboard = ({ ws, value }: { ws: Workspace, value: Dashboard }) => {
    if (ws === "data") return data[value as DataDashboardsListKeys];
    else null;
}

export function BreadcrumbWithDropdown() {
    const [location, setLocation] = useState<Location>(null);

    const onLocationChange = (value: Location) => {
        if (value === null) return;
        const url = new URL(window.location.href);
        url.pathname = `/result/${value.ws}-${value.dash}`;
        window.location.replace(url);
    }

    useEffect(() => {
        // NOTE: this is done for the some static hosting provider that will add the trailing slash at the end
        const url = new URL(window.location.href);
        let pathname = url.pathname;
        if (url.pathname.endsWith('/')) {
            pathname = url.pathname.slice(0, -1);
        }
        const ws = pathname.split("/").pop()?.split('-').at(0) as Workspace;
        const dash = pathname.split("/").pop()?.split('-').at(1) as Dashboard;
        if (ws && dash) setLocation({ ws, dash });
    }, []);


    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <DropdownMenu dir="ltr">
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{location?.ws ? getWorkspace(location?.ws) : "Workspaces"}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="start" className="w-56">
                            {Object.keys(data).map(i => (
                                <DropdownMenuItem
                                    key={i}
                                    textValue={i}
                                    onSelect={() => {
                                        onLocationChange({ ws: "data", dash: i as DataDashboardsListKeys })
                                    }}
                                >
                                    {data[i as DataDashboardsListKeys]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
                {location && location.dash && (
                    <>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{getDashboard({
                                ws: location.ws,
                                value: location.dash,
                            })}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
