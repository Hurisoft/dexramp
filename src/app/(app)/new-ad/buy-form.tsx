"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryState } from "nuqs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormDescription } from "@/components/ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import AddPaymentMethodButton from "@/components/custom/AddPaymentMethodButton";

function BuyForm() {
  const [asset, setAsset] = useQueryState("asset");
  const [fiat, setFiat] = useQueryState("fiat");
  const [price, setPrice] = useQueryState("price", { defaultValue: "0" });
  const [timeLimit, setTimeLimit] = useQueryState("timeLimit", {
    defaultValue: "15",
  });
  const [paymentMethods, setPaymentMethods] = useQueryState("paymentMethods");

  const paymentMethodsOptions: Option[] = [
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

  return (
    <Card className="px-8 flex flex-col gap-6 py-6">
      <p className="font-semibold">Type and price</p>
      <div className="flex items-center gap-6">
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Label>Asset</Label>
          <Select
            value={asset ?? ""}
            onValueChange={(currency) => setAsset(currency)}
          >
            <SelectTrigger id="asset">
              <SelectValue placeholder="Asset" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="fdusd">FDUSD</SelectItem>
              <SelectItem value="bnb">BNB</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="sol">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full max-w-sm flex flex-col gap-3">
          <Label>With Fiat</Label>
          <Select
            value={fiat ?? ""}
            onValueChange={(currency) => setFiat(currency)}
          >
            <SelectTrigger id="fiat">
              <SelectValue placeholder="Fiat" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="ghs">GHS</SelectItem>
              <SelectItem value="ngn">NGN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full max-w-sm flex flex-col gap-3">
        <Label>My Price</Label>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        ></Input>
        <p className="-mt-2 text-xs text-muted-foreground">
          I want to pay {fiat?.toUpperCase()} {price} for each{" "}
          {asset?.toUpperCase()}
        </p>
      </div>

      <Separator />

      <p className="font-semibold mt-4">Amount and method</p>
      <Card className="py-3 px-4 bg-black max-w-[792px]">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <div className="flex justify-between items-center">
            <input
              className="appearance-none text-2xl bg-transparent outline-0"
              type="text"
              placeholder="0"
            />
            <span className="text-2xl">{asset?.toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs">
              Available: 2,081.71 {asset?.toUpperCase()}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-end gap-6">
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Label>Order Limit</Label>
          <Card className="py-3 px-4 bg-black">
            <p className="text-sm text-muted-foreground">Minimum</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <input
                  className="appearance-none text-2xl bg-transparent outline-0"
                  type="text"
                  placeholder="0"
                />
                <span className="text-2xl">{fiat?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs">≈ 81.71 {asset?.toUpperCase()}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <Card className="py-3 px-4 bg-black">
            <p className="text-sm text-muted-foreground">Maximum</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <input
                  className="appearance-none text-2xl bg-transparent outline-0"
                  type="text"
                  placeholder="0"
                />
                <span className="text-2xl">{fiat?.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs">≈ 81.71 {asset?.toUpperCase()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex gap-6 justify-between items-center max-w-[792px]">
        <div className="max-w-sm flex flex-col gap-4 flex-1">
          <Label>Payment Methods</Label>
          <MultipleSelector
            defaultOptions={paymentMethodsOptions}
            placeholder="Select payment methods"
            maxSelected={3}
            onChange={(methods) => {
              // @ts-ignore
              setPaymentMethods(methods.map((method) => method?.accountNumber));
            }}
            emptyIndicator={
              <p className="text-center leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </div>

        <AddPaymentMethodButton />
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3">
        <Label>Payment Time Limit</Label>
        <Select
          value={timeLimit ?? ""}
          onValueChange={(time) => setTimeLimit(time)}
        >
          <SelectTrigger id="time">
            <SelectValue placeholder="Time Limit" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="10">10 Minutes</SelectItem>
            <SelectItem value="15">15 Minutes</SelectItem>
            <SelectItem value="20">20 Minutes</SelectItem>
            <SelectItem value="25">25 Minutes</SelectItem>
            <SelectItem value="30">30 Minutes</SelectItem>
            <SelectItem value="60">1 Hour</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <p className="font-semibold mt-4">Terms</p>
      <div className="flex flex-col gap-4 max-w-[792px]">
        <Label>Terms (optional)</Label>
        <Textarea placeholder="Type your terms here..." />
      </div>

      <Button className="mt-12">Post Ad</Button>
    </Card>
  );
}

export default BuyForm;
