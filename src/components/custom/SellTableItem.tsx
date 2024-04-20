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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClockIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Option } from "@/components/ui/multiple-selector";

const paymentMethodsOptions = [
  {
    label: "MTN MoMo",
    value: "momo",
    accountNumber: "0591244439",
    accountName: "Some Guy",
  },
  {
    label: "Telecel Cash",
    value: "tcash",
    accountNumber: "0504954579",
    accountName: "Some Guy",
  },
  {
    label: "AT Money",
    value: "atmoney",
    accountNumber: "0566146140",
    accountName: "Some Guy",
  },
  {
    label: "Standard Chartered",
    value: "stanchart",
    accountNumber: "0013323803823203",
    accountName: "Some Cool Guy",
  },
];

function SellTableItem() {
  const { openConnectModal } = useConnectModal();
  const { toast } = useToast();
  const router = useRouter();
  const [parent, enableAnimations] = useAutoAnimate();

  let rate = 13.5;
  let min = 200;
  let max = 3000;

  const [fiatAmount, setFiatAmount] = useState<number | null>(null);
  const [cryptoAmount, setCryptoAmount] = useState<number | null>(null);
  const [cryptoError, setCryptoError] = useState<string | null>(null);
  const [fiatError, setFiatError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [paymentMethodError, setPaymentMethodError] = useState<string | null>(
    null,
  );

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div>
            <p>SomeGuy69</p>
            <p className="text-sm text-neutral-500 mt-1">
              57 orders | 98.30% completion
            </p>
          </div>
        </div>
      </TableCell>
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
        {/* If user has connected wallet, show trading modal, else show connect wallet modal */}
        {openConnectModal ? (
          <Button className="w-full" onClick={openConnectModal}>
            Sell USDT
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger className="w-full">
              <Button className="w-full">Sell USDT</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sell USDT</DialogTitle>
                <DialogDescription className="flex justify-between gap-2 items-center py-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Avatar>
                      <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                      <p>SomeGuy69</p>
                      <p className="text-xs text-neutral-500 mt-1">
                        57 orders | 98.30% completion
                      </p>
                      <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                        <ClockIcon className="w-4" /> 15 Minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex-wrap justify-end flex gap-2">
                    <Badge variant="secondary">MoMo</Badge>
                    <Badge variant="secondary">Telecel cash</Badge>
                    <Badge variant="secondary">Telecel cash</Badge>
                    <Badge variant="secondary">Telecel cash</Badge>
                  </div>
                </DialogDescription>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Advertiser's terms</AccordionTrigger>
                    <AccordionContent>
                      Fast payments only. Stay online
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DialogHeader>
              <DialogBody>
                <div ref={parent}>
                  <Card className="py-3 px-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">Selling</p>
                      <div className="flex justify-between items-center">
                        <input
                          className="appearance-none text-2xl bg-transparent outline-0"
                          type="number"
                          placeholder="0"
                          required
                          onChange={(e) => {
                            setCryptoAmount(Number(e.target.value));
                            setFiatAmount(Number(e.target.value) * rate);
                          }}
                          // @ts-ignore
                          value={cryptoAmount}
                        />
                        <span className="text-2xl">USDT</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs">Balance: 2,081.71 USDT</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="py-3 px-4 mt-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">
                        I will receive
                      </p>
                      <div className="flex justify-between items-center">
                        <input
                          className="appearance-none text-2xl bg-transparent outline-0"
                          type="number"
                          placeholder={`${min} - ${max}`}
                          required
                          onChange={(e) => {
                            setFiatAmount(Number(e.target.value));
                            setCryptoAmount(
                              +(Number(e.target.value) / rate).toFixed(2),
                            );
                          }}
                          // @ts-ignore
                          value={fiatAmount}
                        />
                        <span className="text-2xl">GHS</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs">Rate: GHS 13.50</p>
                      </div>
                    </div>
                  </Card>
                  {!!fiatError && (
                    <p className="text-red-600 text-xs mt-1">{fiatError}</p>
                  )}

                  <Select onValueChange={(value) => setPaymentMethod(value)}>
                    <SelectTrigger className="w-full mt-5 bg-card">
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethodsOptions.map((method) => (
                        <SelectItem value={method.accountNumber}>
                          <p>
                            {method.label}{" "}
                            <span className="text-muted-foreground">
                              {method.accountNumber}
                            </span>
                          </p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!!paymentMethodError && (
                    <p className="text-red-600 text-xs mt-1">
                      {paymentMethodError}
                    </p>
                  )}
                </div>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    // @ts-ignore
                    if (fiatAmount < min) {
                      setFiatError(`Fiat amount cannot be less than ${min}`);
                      // @ts-ignore
                    } else if (fiatAmount > max) {
                      setFiatError(`Fiat amount cannot be more than ${max}`);
                    } else {
                      setFiatError(null);

                      if (!paymentMethod) {
                        setPaymentMethodError("Please select a payment method");
                      } else {
                        setPaymentMethodError(null);
                        toast({
                          title: "You have successfully placed the order",
                          action: (
                            <ToastAction
                              onClick={() =>
                                router.push("/orders/439e8dj8j9de3d3e")
                              }
                              altText="See order"
                            >
                              See order
                            </ToastAction>
                          ),
                        });
                      }
                    }
                  }}
                  className="w-full"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </TableCell>
    </TableRow>
  );
}

export default SellTableItem;