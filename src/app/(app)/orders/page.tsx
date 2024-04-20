import React, {Suspense} from 'react';
import Orders from "@/app/(app)/orders/orders";

function Page() {
    return (
        <div>
          <Suspense>
            <Orders />
          </Suspense>
        </div>
    );
}

export default Page;