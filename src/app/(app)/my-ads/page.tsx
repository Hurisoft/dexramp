"use client"

import React, {Suspense} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import MyAdsTableItem from "@/components/custom/MyAdsTableItem";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

function Page() {
    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <div className="mb-6"><Link href="/new-ad"><Button variant="secondary"><PlusIcon /> New Ad</Button></Link></div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Price</TableHead>
                        <TableHead>Available/Limit</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <Suspense>
                    <TableBody>
                        <MyAdsTableItem />
                        <MyAdsTableItem />
                    </TableBody>
                </Suspense>
            </Table>
        </div>
    );
}

export default Page;