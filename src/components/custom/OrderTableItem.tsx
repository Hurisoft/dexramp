"use client";

import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import { Card } from "@/components/ui/card";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ClockIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ToastAction } from "@/components/ui/toast";
import {useRouter} from "next/navigation";
import {useAppConfig} from "@/app/ConfigContext";

function OrderTableItem({offer}: {offer: Offer}) {
    const config = useAppConfig();

    const router = useRouter()
    function getTokenName() {
        return config?.tradeTokens.find(token => token.address === offer.asset)?.symbol
    }

    return (
        <TableRow className="cursor-pointer" onClick={() => router.push(`/orders/detail?id=${offer.offerId}`)}>
            <TableCell>
                <div className="flex items-center gap-2">
                    <div>
                        <p>{getTokenName()}</p>
                        {offer.orderType === 0 ? <p className="text-sm text-green-500 mt-1">
                            Buy
                        </p> : <p className="text-sm text-red-500 mt-1">
                            Sell
                        </p>}
                    </div>
                </div>
            </TableCell>
            <TableCell className="">{offer?.fiat} {offer?.price}</TableCell>
            <TableCell>
                <p>{offer?.totalAmount} {getTokenName()}</p>
                {/*<p className="text-neutral-500 mt-1">200.00 GHS</p>*/}
            </TableCell>
            <TableCell>
                <p>{offer?.accountName}</p>
            </TableCell>
            <TableCell>
                <p>Completed</p>
            </TableCell>
            <TableCell>
                <p>{offer?.offerId}</p>
                <p className="text-neutral-500 mt-1">{new Date().toUTCString()}</p>
            </TableCell>
            <TableCell>
                <Dialog>
                    <DialogTrigger className="w-full">
                        <Button variant="destructive" className="w-full">
                            Delete ad
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Order</DialogTitle>
                            <DialogDescription className="flex justify-between gap-2 items-center py-4">
                                Are you sure you want to delete this order? This action cannot
                                be undone if you proceed.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="secondary" className="w-full">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button className="w-full">Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
}

export default OrderTableItem;
