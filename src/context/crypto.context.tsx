import { useState, useEffect, createContext, useContext } from 'react'

import { IAsset, ICrypto } from '../types/crypto.type'
import { fetchAssets, fetchCrypto } from '../api'
import { percentDifference } from '../utils/math.util'

type TypeCryptoContext = {
	assets: IAsset[]
	crypto: ICrypto[]
	loading: boolean
}

export const CryptoContext = createContext<TypeCryptoContext>({
	assets: [],
	crypto: [],
	loading: false
})

export function useCryptoContext() {
	return useContext(CryptoContext)
}

export function CryptoContextProvider({ children }: { children: JSX.Element }) {
	// * Loader state
	const [loading, setLoading] = useState(false)
	// * Crypto state
	const [crypto, setCrypto] = useState<ICrypto[]>([])
	// * Assets state
	const [assets, setAssets] = useState<IAsset[]>([])

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const { result }: { result: ICrypto[] } = await fetchCrypto()
			const assetsFetched: IAsset[] = await fetchAssets()

			setCrypto(result)
			setAssets(
				assetsFetched.map(asset => {
					const coin: ICrypto | undefined = result.find(
						coin => coin.id === asset.id
					)
					return {
						grow: asset.price < (coin?.price as number),
						growPercent: percentDifference(asset.price, coin?.price as number),
						totalAmount: asset.amount * (coin?.price as number),
						totalProfit:
							asset.amount * (coin?.price as number) -
							asset.amount * asset.price,
						...asset
					}
				})
			)
			setLoading(false)
		}

		preload()
	}, [])

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets }}>
			{children}
		</CryptoContext.Provider>
	)
}
