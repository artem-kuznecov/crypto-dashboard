export interface ICrypto {
	id: string
	icon: string
	name: string
	symbol: string
	rank: number
	price: number
	priceBtc: number
	volume: number
	marketCap: number
	availableSupply: number
	totalSupply: number
	priceChange1h: number
	priceChange1d: number
	priceChange1w: number
	redditUrl: string
	websiteUrl: string
	twitterUrl: string
	contractAddress?: string
	explorers: string[]
}

export interface IAsset {
	id: string
	amount: number
	price: number
	date: Date
	name?: string
	grow?: boolean
	growPercent?: number
	totalAmount?: number
	totalProfit?: number
}
