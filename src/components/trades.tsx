"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { parseAsInteger, useQueryState } from "nuqs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

export function Trades() {
  const [amount, setAmount] = useQueryState("amount");
  const [currency, setCurrency] = useQueryState("currency");
  const [paymentMethod, setPaymentMethod] = useQueryState("paymentMethod");
  const [crypto, setCrypto] = useQueryState("crypto", {defaultValue: "usdt"});

  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <ToggleGroup
          value={crypto}
          onValueChange={(cryp) => setCrypto(cryp)}
          type="single"
        >
          <ToggleGroupItem value="usdt" aria-label="Toggle buy">
            <Button variant="ghost">USDT</Button>
          </ToggleGroupItem>
          <ToggleGroupItem value="btc" aria-label="Toggle sell">
            <Button variant="ghost">BTC</Button>
          </ToggleGroupItem>
          <ToggleGroupItem value="fdusd" aria-label="Toggle sell">
            <Button variant="ghost">FDUSD</Button>
          </ToggleGroupItem>
          <ToggleGroupItem value="bnb" aria-label="Toggle sell">
            <Button variant="ghost">BNB</Button>
          </ToggleGroupItem>
          <ToggleGroupItem value="eth" aria-label="Toggle sell">
            <Button variant="ghost">ETH</Button>
          </ToggleGroupItem>
          <ToggleGroupItem value="sol" aria-label="Toggle sell">
            <Button variant="ghost">SOL</Button>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex gap-4 mb-6 max-w-3xl">
        <Input
          className="appearance-none"
          type="number"
          onChange={(amt) => setAmount(amt.target.value)}
          placeholder="Enter amount"
        />
        <Select onValueChange={(currency) => setCurrency(currency)}>
          <SelectTrigger id="currency">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="ghs">GHS</SelectItem>
            <SelectItem value="ngn">NGN</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(method) => setPaymentMethod(method)}>
          <SelectTrigger id="payment-method">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="mtn">MTN MoMo</SelectItem>
            <SelectItem value="telecel">Telecel Cash</SelectItem>
            <SelectItem value="airteltigo">AT Money</SelectItem>
            <SelectItem value="bank">Bank</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Advertisers</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available/Limit</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Trade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
              <Badge variant="secondary">Vodafone cash</Badge>
            </TableCell>
            <TableCell>
              <Button className="w-full">Buy USDT</Button>
            </TableCell>
          </TableRow>
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
              <Badge variant="secondary">Vodafone cash</Badge>
            </TableCell>
            <TableCell>
              <Button className="w-full">Buy USDT</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
