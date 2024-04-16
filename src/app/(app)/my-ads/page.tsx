"use client"

import React from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import TradeTableItem from "@/components/custom/TradeTableItem";
import MyAdsTableItem from "@/components/custom/MyAdsTableItem";

function Page() {
    return (
        <div className="p-6 max-w-screen-2xl mx-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Price</TableHead>
                        <TableHead>Available/Limit</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <MyAdsTableItem />
                    <MyAdsTableItem />
                </TableBody>
            </Table>
        </div>
    );
}

export default Page;