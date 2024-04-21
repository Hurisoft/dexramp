"use client";

import React from "react";
import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useQueryState } from "nuqs";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const hasKYC = true;

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { disconnect } = useDisconnect();

  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });

  const [trade, setTrade] = useQueryState("trade", { defaultValue: "buy" });

  // useEffect(() => {
  //   if (account.isConnected) {
  //     router.push("/kyc")
  //   }
  // }, [account.isDisconnected]);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-screen z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="">DexRamp</span>
        </Link>
        {pathname !== "/market" ? (
          <div className="flex items-center gap-0.5">
            <Link href="/market?trade=buy">
              <Button className="px-3" variant="ghost">
                Buy
              </Button>
            </Link>
            <Link href="/market?trade=sell">
              <Button className="px-3" variant="ghost">
                Sell
              </Button>
            </Link>
          </div>
        ) : (
          <ToggleGroup
            value={trade}
            onValueChange={(t) => setTrade(t)}
            type="single"
          >
            <ToggleGroupItem value="buy" aria-label="Toggle buy">
              <p className="text-muted-foreground transition-colors hover:text-foreground">
                Buy
              </p>
            </ToggleGroupItem>
            <ToggleGroupItem value="sell" aria-label="Toggle sell">
              <p className="text-muted-foreground transition-colors hover:text-foreground">
                Sell
              </p>
            </ToggleGroupItem>
          </ToggleGroup>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">DexRamp</span>
            </Link>
            {pathname !== "/market" ? (
                <div className="flex flex-col items-start gap-0.5">
                  <Link href="/market?trade=buy">
                    <Button className="px-3" variant="ghost">
                      Buy
                    </Button>
                  </Link>
                  <Link href="/market?trade=sell">
                    <Button className="px-3" variant="ghost">
                      Sell
                    </Button>
                  </Link>
                </div>
            ) : (
                <ToggleGroup
                    value={trade}
                    onValueChange={(t) => setTrade(t)}
                    type="single"
                    className="flex flex-col items-start"
                >
                  <ToggleGroupItem value="buy" aria-label="Toggle buy">
                    <p className="text-muted-foreground transition-colors hover:text-foreground">
                      Buy
                    </p>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="sell" aria-label="Toggle sell">
                    <p className="text-muted-foreground transition-colors hover:text-foreground">
                      Sell
                    </p>
                  </ToggleGroupItem>
                </ToggleGroup>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        {/*<form className="ml-auto flex-1 sm:flex-initial">*/}
        {/*    <div className="relative">*/}
        {/*        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
        {/*        <Input*/}
        {/*            type="search"*/}
        {/*            placeholder="Search products..."*/}
        {/*            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</form>*/}

        <div className="ml-auto flex items-center">
          {openConnectModal && (
            <Button variant="default" onClick={openConnectModal}>
              Connect Wallet
            </Button>
          )}
        </div>

        {openAccountModal && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full ml-auto"
              >
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="overflow-ellipsis">Address: {account.address}</DropdownMenuItem>
              <DropdownMenuItem>
                Balance: {balance?.data?.symbol} {balance?.data?.formatted}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/my-ads");
                }}
              >
                My Ads
              </DropdownMenuItem>
              {hasKYC ? (
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/new-ad");
                  }}
                >
                  Post Ad
                </DropdownMenuItem>
              ) : (
                  <DropdownMenuItem
                      onClick={() => {
                        router.push("/kyc");
                      }}
                  >
                    Post Ad
                  </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/orders");
                }}
              >
                Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/payment-methods");
                }}
              >
                Payment Methods
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  disconnect();
                }}
              >
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

export default Navbar;
