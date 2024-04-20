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

export function OrderDetails() {
  const [parent, enableAnimations] = useAutoAnimate();
  const { toast } = useToast();
  const [orderPaid, setOrderPaid] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-7xl mx-auto p-6">
      <div className="flex-1 space-y-6">
        <div className=" p-6 rounded-lg shadow space-y-4">
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
                  <div className="text-lg font-semibold">GH₵ 550.00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="text-lg font-semibold">GH₵ 13.88</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Receive Quantity</div>
                  <div className="text-lg font-semibold">39.62 USDT</div>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold">2. Make Payment</h2>
              <div className="mt-2">
                <div className="bg-stone-800 p-3 rounded-lg flex items-center justify-between">
                  <span className="font-semibold">MTN Mobile Money</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reference message</span>
                    <span className="font-semibold text-muted-foreground">
                      20614578271356063744
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Full Name</span>
                    <span className="font-semibold text-muted-foreground">
                      Some Guy
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone Number</span>
                    <span className="font-semibold text-muted-foreground">
                      059320562
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-4 rounded-lg">
              <h2 className="text-lg font-semibold">3. Notify Seller</h2>
              <p className="text-sm mt-2">
                After payment, remember to click the 'Transferred, Notify
                Seller' button to facilitate the crypto release by the seller.
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
                          <p>Some Guy</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground">Phone Number</p>
                          <p>0591234343</p>
                        </div>
                      </Card>
                    </DialogBody>
                    <DialogFooter>
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
                    <DialogFooter>
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
            <h2 className="text-muted-foreground">Order number</h2>
            <span>20614578271356063744</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground">Time created</h2>
            <span>2024-04-19 10:01:22</span>
          </div>
        </div>
        <Card className=" p-4 rounded-lg shadow space-y-2">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                alt="SOME_GUY69"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">SOME_GUY69</h2>
            </div>
          </div>
          <div className="bg-stone-800 p-3 rounded-lg">
            <p className="text-sm">
              You have successfully created order. Please copy and add reference
              message 20614578271356063744 to the remark/description during your
              payment so the seller can identify the payment.
            </p>
          </div>
          <div className="bg-stone-800 p-3 rounded-lg">
            <p className="text-sm">Please send the money ASAP!!!</p>
          </div>
        </Card>
        <Card className=" p-4 rounded-lg shadow flex items-center space-x-4">
          <Input className="flex-1" placeholder="write a message..." />
          <Button variant="ghost">
            <SendIcon className="h-5 w-5 text-gray-500" />
          </Button>
        </Card>
      </div>
    </div>
  );
}

function CircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function ClipboardCopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v4" />
      <path d="M21 14H11" />
      <path d="m15 10-4 4 4 4" />
    </svg>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}
