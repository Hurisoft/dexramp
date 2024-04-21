import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BuyForm from "@/app/(app)/new-ad/buy-form";
import SellForm from "@/app/(app)/new-ad/sell-form";


function Page() {
    return (
        <div className="md:p-6 max-w-screen-2xl mx-auto">
            <Tabs defaultValue="buy" className="w-full">
                <TabsList>
                    <TabsTrigger value="buy">I want to buy</TabsTrigger>
                    <TabsTrigger value="sell">I want to sell</TabsTrigger>
                </TabsList>
                <TabsContent value="buy"><BuyForm /></TabsContent>
                <TabsContent value="sell"><SellForm /></TabsContent>
            </Tabs>
        </div>
    );
}

export default Page;