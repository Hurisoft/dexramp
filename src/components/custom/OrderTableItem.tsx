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

function OrderTableItem() {
    const { openConnectModal } = useConnectModal();
    const { toast } = useToast();
    const router = useRouter()
    const [parent, enableAnimations] = useAutoAnimate();

    let rate = 13.5;
    let min = 200;
    let max = 3000;

    const [fiatAmount, setFiatAmount] = useState<number | null>(null);
    const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
    const [cryptoError, setCryptoError] = useState<string | null>(null);
    const [fiatError, setFiatError] = useState<string | null>(null);

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-2">
                    <div>
                        <p>USDT</p>
                        <p className="text-sm text-green-500 mt-1">
                            Buy
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell className="">13.50 GHS</TableCell>
            <TableCell>
                <p>14.38 USDT</p>
                <p className="text-neutral-500 mt-1">200.00 GHS</p>
            </TableCell>
            <TableCell>
                <p>anotherGuy69</p>
            </TableCell>
            <TableCell>
                <p>Completed</p>
            </TableCell>
            <TableCell>
                <p>328398e9u83929932</p>
                <p className="text-neutral-500 mt-1">19/04/2024 11:37</p>
            </TableCell>
        </TableRow>
    );
}

export default OrderTableItem;
