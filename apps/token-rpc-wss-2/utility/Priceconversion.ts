type BinanceTickerPrice = {
	symbol: string;
	price: string;
};

type EthUsdConversion = {
	ethValue: number;
	usdValue: number;
	ethUsdPrice: number;
};


export async function fetchEthUsdConversion(ethValue: number): Promise<EthUsdConversion> {
	const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT");

	if (!res.ok) {
		throw new Error("Could not fetch ETH/USD price from Binance");
	}

	const data = (await res.json()) as BinanceTickerPrice;
	const ethUsdPrice = Number(data.price);

	if (!Number.isFinite(ethUsdPrice) || ethUsdPrice <= 0) {
		throw new Error("Invalid ETH/USD price received from Binance");
	}

	return {
		ethValue,
		ethUsdPrice,
		usdValue: Number((ethValue * ethUsdPrice).toFixed(6)),
	};
}
