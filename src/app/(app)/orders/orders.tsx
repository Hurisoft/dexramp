"use client";

import React, { Suspense } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BuyTableItem from "@/components/custom/BuyTableItem";
import OrderTableItem from "@/components/custom/OrderTableItem";
import {useLocalStorage} from "usehooks-ts";

function Orders() {
    const [orderType, setCrypto] = useQueryState("orderType", {
        defaultValue: "all",
    });

    const [offers, setOffers, removeOffers] = useLocalStorage("offers", []);


    return (
        <div className="md:p-6 max-w-screen-2xl mx-auto">
            <div className="flex gap-2 mb-4">
                <ToggleGroup
                    value={orderType}
                    onValueChange={(cryp) => setCrypto(cryp)}
                    type="single"
                >
                    <ToggleGroupItem value="all" aria-label="Toggle buy">
                        <Button variant="ghost">All</Button>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="completed" aria-label="Toggle sell">
                        <Button variant="ghost">Completed</Button>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="canceled" aria-label="Toggle sell">
                        <Button variant="ghost">Canceled</Button>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Coin/Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Counterparty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order ID/Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <Suspense>
                    <TableBody>
                        {offers.map(offer => <OrderTableItem key={offer} offer={JSON.parse(offer)} />)}
                    </TableBody>
                </Suspense>
            </Table>
        </div>
    );
}

export default Orders;
