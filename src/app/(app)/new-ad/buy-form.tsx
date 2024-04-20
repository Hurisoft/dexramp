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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import AddPaymentMethodButton from "@/components/custom/AddPaymentMethodButton";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const FormSchema = z.object({
  asset: z.string({
    required_error: "Please select a crypto asset",
  }),
  fiat: z.string({
    required_error: "Please select a fiat currency",
  }),
  price: z.coerce
    .number({
      required_error: "Please enter price",
    })
    .gt(0, { message: "Please enter a price greater than 0" }),
  totalAmount: z.coerce
    .number({
      required_error: "Please enter total amount",
    })
    .gt(0, { message: "Please enter an amount greater than 0" }),
  orderLimitMin: z.coerce
    .number({
      required_error: "Please enter minimum order",
    })
    .gt(0, { message: "Please enter an amount greater than 0." }),
  orderLimitMax: z.coerce
    .number({
      required_error: "Please enter maximum order",
    })
    .gt(0, { message: "Please enter an amount greater than 0." }),
  paymentMethod: z.string({
    required_error: "Please select a payment method",
  }),
  timeLimit: z.string({
    required_error: "Please select a time limit",
  }),
  terms: z.string().optional(),
});

function onSubmit(data: z.infer<typeof FormSchema>) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 rounded-md p-4 w-[340px] bg-slate-950">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  });
}

function BuyForm() {
  const [assetContainerRef] = useAutoAnimate();
  const [fiatContainerRef] = useAutoAnimate();
  const [priceContainerRef] = useAutoAnimate();
  const [amountContainerRef] = useAutoAnimate();
  const [minContainerRef] = useAutoAnimate();
  const [maxContainerRef] = useAutoAnimate();
  const [paymentMethodContainerRef] = useAutoAnimate();
  const [timeLimitContainerRef] = useAutoAnimate();

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="px-8 flex flex-col gap-6 py-6">
          <p className="font-semibold">Type and price</p>
          <div className="flex items-center gap-6">
            <div className="w-full max-w-sm flex flex-col gap-3">
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem ref={assetContainerRef}>
                    <FormLabel>Asset</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="asset">
                          <SelectValue placeholder="Asset" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="usdt">USDT</SelectItem>
                        <SelectItem value="btc">BTC</SelectItem>
                        <SelectItem value="fdusd">FDUSD</SelectItem>
                        <SelectItem value="bnb">BNB</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value="sol">SOL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full max-w-sm flex flex-col gap-3">
              <FormField
                control={form.control}
                name="fiat"
                render={({ field }) => (
                  <FormItem ref={fiatContainerRef}>
                    <FormLabel>With Fiat</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="fiat">
                          <SelectValue placeholder="Fiat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        <SelectItem value="ghs">GHS</SelectItem>
                        <SelectItem value="ngn">NGN</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem ref={priceContainerRef}>
                  <FormLabel>My Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    I want to pay {form.getValues("fiat")?.toUpperCase()}{" "}
                    {form.getValues("price")} for each{" "}
                    {form.getValues("asset")?.toUpperCase()}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <p className="font-semibold mt-4">Amount and method</p>
          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <div ref={amountContainerRef}>
                <Card className="py-3 px-4 bg-black max-w-[792px]">
                  <div className="flex flex-col gap-2">
                    <FormItem>
                      <FormLabel className="text-sm text-muted-foreground">
                        Total Amount
                      </FormLabel>
                      <div className="flex justify-between items-center">
                        <FormControl>
                          <input
                            type="number"
                            placeholder="0"
                            className="border-none bg-transparent text-2xl outline-0 px-0 outline-none "
                            {...field}
                          />
                        </FormControl>
                        <span className="text-2xl">
                          {form.getValues("asset")?.toUpperCase()}
                        </span>
                      </div>
                    </FormItem>
                    <div className="flex justify-between items-center">
                      <p className="text-xs">
                        Available: 2,081.71{" "}
                        {form.getValues("asset")?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Card>
                <FormMessage className="mt-2" />
              </div>
            )}
          />

          <div className="flex flex-col gap-4">
            <Label>Order Limit</Label>
            <div className="flex items-end gap-6">
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <FormField
                  control={form.control}
                  name="orderLimitMin"
                  render={({ field }) => (
                    <div ref={minContainerRef}>
                      <Card className="py-3 px-4 bg-black max-w-[792px]">
                        <div className="flex flex-col gap-2">
                          <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">
                              Minimum
                            </FormLabel>
                            <div className="flex justify-between items-center">
                              <FormControl>
                                <input
                                  type="number"
                                  placeholder="0"
                                  className="border-none bg-transparent text-2xl outline-0 px-0 outline-none "
                                  {...field}
                                />
                              </FormControl>
                              <span className="text-2xl">
                                {form.getValues("fiat")?.toUpperCase()}
                              </span>
                            </div>
                          </FormItem>
                          <div className="flex justify-between items-center">
                            <p className="text-xs">
                              ≈ 81.71 {form.getValues("asset")?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </Card>
                      <FormMessage className="mt-2" />
                    </div>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <FormField
                  control={form.control}
                  name="orderLimitMax"
                  render={({ field }) => (
                    <div ref={maxContainerRef}>
                      <Card className="py-3 px-4 bg-black max-w-[792px]">
                        <div className="flex flex-col gap-2">
                          <FormItem>
                            <FormLabel className="text-sm text-muted-foreground">
                              Maximum
                            </FormLabel>
                            <div className="flex justify-between items-center">
                              <FormControl>
                                <input
                                  type="number"
                                  placeholder="0"
                                  className="border-none bg-transparent text-2xl outline-0 px-0 outline-none "
                                  {...field}
                                />
                              </FormControl>
                              <span className="text-2xl">
                                {form.getValues("fiat")?.toUpperCase()}
                              </span>
                            </div>
                          </FormItem>
                          <div className="flex justify-between items-center">
                            <p className="text-xs">
                              ≈ 81.71 {form.getValues("asset")?.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </Card>
                      <FormMessage className="mt-2" />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-between items-center max-w-[792px]">
            <div className="max-w-sm flex flex-col gap-4 flex-1">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem ref={paymentMethodContainerRef}>
                    <FormLabel>Payment Methods</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Payment Method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent position="popper">
                        {paymentMethodsOptions.map((method) => (
                          <SelectItem value={method.accountNumber}>
                            <p>
                              {method.label}{" "}
                              <span className="text-muted-foreground">
                                {method.accountNumber}
                              </span>
                              <span> {method.accountName}</span>
                            </p>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AddPaymentMethodButton />
          </div>

          <div className="w-full max-w-sm flex flex-col gap-3">
            <FormField
              control={form.control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem ref={timeLimitContainerRef}>
                  <FormLabel>Payment Time Limit</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Time Limit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      <SelectItem value="10">10 Minutes</SelectItem>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="20">20 Minutes</SelectItem>
                      <SelectItem value="25">25 Minutes</SelectItem>
                      <SelectItem value="30">30 Minutes</SelectItem>
                      <SelectItem value="60">1 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <p className="font-semibold mt-4">Terms</p>
          <div className="flex flex-col gap-4 max-w-[792px]">
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your terms here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-12">
            Post Ad
          </Button>
        </Card>
      </form>
    </Form>
  );
}

export default BuyForm;
