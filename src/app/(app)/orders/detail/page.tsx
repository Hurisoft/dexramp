"use client"

import React, {Suspense} from 'react';
import {OrderDetails} from "@/components/order-details";
import {useLocalStorage} from "usehooks-ts";
import {useQueryState} from "nuqs";

function Page() {
    const [orderId, setOrderId] = useQueryState("id");

    const [offers, setOffers, removeOffers] = useLocalStorage("offers", []);

    const offer = offers.find(of => JSON.parse(of).offerId === orderId)

    if (!offer) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Suspense>
                <OrderDetails offer={JSON.parse(offer)} />
            </Suspense>
        </div>
    );
}

export default Page;