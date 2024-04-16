import React from "react";
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
} from "@/components/ui/accordion"

function MyAdsTableItem() {
    const { openConnectModal } = useConnectModal();

    return (
        <TableRow>
            <TableCell className="text-xl">13.50 GHS</TableCell>
            <TableCell>
                <p>2,081.71 USDT</p>
                <p className="text-neutral-500 mt-1">GH₵200 - GH₵3,000</p>
            </TableCell>
            <TableCell className="flex flex-col gap-2 items-start">
                <Badge variant="secondary">MoMo</Badge>
                <Badge variant="secondary">Telecel cash</Badge>
            </TableCell>
            <TableCell>
                <div className="flex gap-4 max-w-sm">
                    <Button variant="secondary" className="w-full">Disable ad</Button>
                    <Dialog>
                        <DialogTrigger className="w-full">
                            <Button variant="destructive" className="w-full">Delete ad</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Ad</DialogTitle>
                                <DialogDescription className="flex justify-between gap-2 items-center py-4">
                                    Are you sure you want to delete this add? This action cannot be undone if you proceed.
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
                </div>
            </TableCell>
        </TableRow>
    );
}

export default MyAdsTableItem;
