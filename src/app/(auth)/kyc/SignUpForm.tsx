"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAddress } from "@/app/WalletProvider";
import abi from "@/abi/OptimisticP2P.json";
import { sha256 } from "viem";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export function SignUpForm() {
  const router = useRouter();
  const { data: hash, writeContractAsync } = useWriteContract();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let txn = await writeContractAsync({
      address: contractAddress,
      abi: abi.abi,
      functionName: "registerMerchant",
    });
    router.push("/new-ad");
    toast({
      title: "KYC has successfully been completed.",
    });
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  console.log("isLoading", isConfirming);
  console.log("isConfirmed", isConfirmed);
  console.log("hash", hash);

  return (
    <Form {...form}>
      <form className="w-screen p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">KYC</CardTitle>
            <CardDescription>
              Enter your information to complete KYC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
