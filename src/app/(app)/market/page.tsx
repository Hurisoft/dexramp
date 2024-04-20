import React, {Suspense} from 'react';
import {Trades} from "@/components/trades";

function Page() {
    return (
        <div>
            <Suspense>
                <Trades />
            </Suspense>
        </div>
    );
}

export default Page;