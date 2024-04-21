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
import React, {useEffect, useState} from "react";
import BuyTableItem from "@/components/custom/BuyTableItem";
import SellTableItem from "@/components/custom/SellTableItem";
import abi from "@/abi/OptimisticP2P.json"
import {useWatchContractEvent, useReadContract} from "wagmi";
import {contractAddress} from "@/app/WalletProvider";
import {useAppConfig} from "@/app/ConfigContext";
import {configEndpoint, offersEndpoint} from "@/services/app_urls";
import {useLocalStorage} from "usehooks-ts";

export function Trades() {
  const config = useAppConfig();

  const [amount, setAmount] = useQueryState("amount");
  const [currency, setCurrency] = useQueryState("currency");
  const [paymentMethod, setPaymentMethod] = useQueryState("paymentMethod");
  const [crypto, setCrypto] = useQueryState("crypto", { defaultValue: "trk" });
  const [trade, setTrade] = useQueryState("trade", { defaultValue: "buy" });

  const [offers, setOffers, removeOffers] = useLocalStorage("offers", []);


  // const [offers, setOffers] = useState([])
  //
  // useEffect(() => {
  //   const fetchOffers = async () => {
  //     try {
  //       const response = await fetch(offersEndpoint);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch offers');
  //       }
  //       const data = await response.json();
  //       setOffers(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //
  //   fetchOffers();
  // }, []);


  return (
    <div className="md:p-6 max-w-screen-2xl mx-auto">
      <div className="flex gap-2 mb-4">
        <ToggleGroup
          value={crypto}
          onValueChange={(cryp) => setCrypto(cryp)}
          type="single"
          className="flex flex-wrap justify-start"
        >
          {config?.tradeTokens.map((ass) => (
              <ToggleGroupItem key={ass.address} value={ass.address} aria-label="Toggle buy">
                <Button variant="ghost">{ass.symbol}</Button>
              </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-3xl">
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
            {config?.currencies.map((curr) => (
              <SelectItem key={curr} value={curr}>
                {curr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(method) => setPaymentMethod(method)}>
          <SelectTrigger id="payment-method">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent position="popper">
            {config?.paymentMethods.map((meth) => (
              <SelectItem key={meth} value={meth}>
                {meth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Advertisers</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available/Limit</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Trade</TableHead>
          </TableRow>
        </TableHeader>
        {trade === "sell" ? (
          <TableBody>
            {offers.filter(offer => JSON.parse(offer).orderType === 1).map(o => <SellTableItem key={o} offer={JSON.parse(o)} />)}
          </TableBody>
        ) : (
          <TableBody>
            {offers.filter(offer => JSON.parse(offer).orderType === 0).map(o => <BuyTableItem key={o} offer={JSON.parse(o)} />)}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
