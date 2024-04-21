"use client"


import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SendIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {useToast} from "@/components/ui/use-toast";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {contractAddress} from "@/app/WalletProvider";
import abi from "@/abi/OptimisticP2P.json";
import {sha256} from "viem";
import {useQueryState} from "nuqs";
import {useLocalStorage} from "usehooks-ts";
import {useAppConfig} from "@/app/ConfigContext";

export function OrderDetails({offer}: {offer: Offer}) {

  const config = useAppConfig();
  const [parent] = useAutoAnimate();
  const [modalBodyRef] = useAutoAnimate();
  const { toast } = useToast();
  const [orderPaid, setOrderPaid] = useState(false)
  const [reason, setReason] = useState("")
  const [reasonError, setReasonError] = useState<string | null>(null)
  const { data: hash, writeContractAsync } = useWriteContract();


  function getTokenName() {
    return config?.tradeTokens.find(token => token.address === offer.asset)?.symbol
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });

  console.log("isLoading", isConfirming);
  console.log("isConfirmed", isConfirmed);
  console.log("hash", hash);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-7xl mx-auto md:p-6">
      <div className="flex-1 space-y-6">
        <div className=" md:p-6 rounded-lg shadow space-y-4">
          <h1 className="text-2xl font-semibold">{orderPaid ? "Pending Release" : "Order Created"}</h1>
          {orderPaid ? <p className="text-sm">
            Wait for the seller to confirm payment and release the coin.
          </p> : <p className="text-sm">
            Pay the seller within{" "}
            <span className="font-semibold">14 : 22</span>
          </p>}
          <div className="space-y-4">
            <Card className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold">1. Confirm order info</h2>
              <div className="flex justify-between mt-2">
                <div>
                  <div className="text-sm text-gray-500">Amount</div>
                  <div className="text-lg font-semibold">{offer?.fiat} {offer?.totalAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-lg font-semibold">{offer?.fiat} {offer?.price}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Receive Quantity</div>
                  <div className="text-lg font-semibold">39.62 {getTokenName()}</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold">2. Make Payment</h2>
              <div className="mt-2">
                <div className="bg-stone-800 p-3 rounded-lg flex items-center justify-between">
                  <span className="font-semibold">{offer?.paymentMethod}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Advertiser&apos;s terms</span>
                    <span className="font-semibold text-muted-foreground">
                      {offer?.terms}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Full Name</span>
                    <span className="font-semibold text-muted-foreground">
                      {offer?.accountName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Number</span>
                    <span className="font-semibold text-muted-foreground">
                      {offer?.accountNumber}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold">3. Notify Seller</h2>
              <p className="text-sm mt-2">
                After payment, remember to click the &lsquo;Transferred, Notify
                Seller&rsquo; button to facilitate the crypto release by the seller.
              </p>
              <div ref={parent} className="flex space-x-4 mt-4">
                {!orderPaid && <Dialog>
                  <DialogTrigger>
                    <Button className="text-white">
                      Transferred, notify seller
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Payment Confirmation</DialogTitle>
                      <DialogDescription className="flex justify-between gap-2 items-center py-4">
                        Please confirm that you have sent the money to the seller with the details below.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <Card className="p-4">
                        <p className="font-semibold">MTN Mobile Money</p>
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-muted-foreground">Full Name</p>
                          <p>{offer?.accountName}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground">Account Number</p>
                          <p>{offer?.accountNumber}</p>
                        </div>
                      </Card>
                    </DialogBody>
                    <DialogFooter className="gap-5">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Close
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button onClick={() => {
                          setOrderPaid(true)
                          toast({
                            title: "Order has been marked as paid"
                          })
                        }} className="w-full">Confirm</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>}
                {orderPaid && <Dialog>
                  <DialogTrigger>
                    <Button className="text-white">
                     Appeal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Appeal Payment</DialogTitle>
                      <DialogDescription className="flex justify-between gap-2 items-center py-4">
                        Please fill the form below to appeal the payment.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <div ref={modalBodyRef}>
                        <Label>Reason</Label>
                        <Textarea className="mt-4 mb-2" onChange={(e) => setReason(e.target.value)} placeholder="Please type your reason for the appeal here..." />
                        {!!reasonError && <p className="text-sm text-red-600">{reasonError}</p>}
                      </div>
                    </DialogBody>
                    <DialogFooter className="gap-5">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Close
                        </Button>
                      </DialogClose>
                        <Button onClick={async () => {
                          if (reason.length > 0) {
                            setOrderPaid(true)
                            setReasonError(null)
                            let txn = await writeContractAsync({
                              address: contractAddress,
                              abi: abi.abi,
                              functionName: "appealOrder",
                              args:[2323, sha256(`0x${reason}`)]
                            });
                            toast({
                              title: "An appeal has been made for this order"
                            })
                          } else {
                            setReasonError("Please enter a reason")
                          }
                        }} className="w-full">Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>}
                <Dialog>
                  <DialogTrigger>
                    <Button variant="outline">
                      Cancel Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Order</DialogTitle>
                      <DialogDescription className="flex justify-between gap-2 items-center py-4">
                        Are you sure you want to cancel this order? This action cannot
                        be undone if you proceed.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-5">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Close
                        </Button>
                      </DialogClose>
                      <Button className="w-full">Proceed</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="lg:w-96 space-y-4">
        <div className="p-4 rounded-lg shadow space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground">Order ID</h2>
            <span className="text-xs">{offer.offerId}</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground">Time created</h2>
            <span className="text-xs">{new Date().toUTCString()}</span>
          </div>
        </div>
        <Card className=" p-4 rounded-lg shadow space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="SOME_GUY69"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>{offer?.accountName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{offer?.accountName}</h2>
            </div>
          </div>
          <div className="bg-stone-800 p-3 rounded-lg">
            <p className="text-sm">Please send the money ASAP!!!</p>
          </div>
        </Card>
        <Card className=" p-4 rounded-lg shadow flex items-center space-x-4">
          <Textarea className="flex-1" placeholder="write a message..." />
          <Button variant="ghost">
            <SendIcon className="h-5 w-5 text-gray-500" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
