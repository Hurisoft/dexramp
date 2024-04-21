type Config = {
    offerFee: string; // fee charged for creating an offer
    contractAddress: string; // p2p contract address
    paymentMethods: string[]; // list of supported payment methods
    tradeTokens: { address: string; symbol: string }[]; // list of supported trade tokens
    currencies: string[]; // list of supported currencies
};

enum TradeType {
    buy,
    sell,
}
type Offer = {
    rate: number; // currency rate of token
    token: string; // symbol
    minOrder: number; // minimum order that trader can place
    maxOrder: number; // maximum order that trader can place
    currency: string; // symbol of currency that merchant can settle, only one currency for now
    paymentMethod: string;
    depositAddress: string; // address tokens should be deposited to 0 address in case of sell
    accountName: string;
    accountNumber: string;
    merchant: string; // address of merchant
    offerType: TradeType;
    offerId: number;
    fiat: string,
    asset: string,
    totalAmount: string,
    price: string,
    orderLimitMin: string,
    orderLimitMax: string,
    timeLimit: string,
    terms: string,
    orderType: number
};
type LightOffer = Omit<Offer, "accountName" | "accountNumber"> & {
    accountHash: string; // hash(accountName+accountNumber)
};
type offers = LightOffer[];