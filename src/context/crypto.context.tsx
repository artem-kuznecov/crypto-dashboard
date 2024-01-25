import { useState, useEffect, createContext, useContext } from 'react'

import { IAsset, ICrypto } from '../types/crypto.type'
import { fetchAssets, fetchCrypto } from '../api'
import { percentDifference } from '../utils/math.util'

type TypeCryptoContext = {
	assets: IAsset[]
	crypto: ICrypto[]
	loading: boolean
	AddAsset: (asset: IAsset) => void
}

export const CryptoContext = createContext<TypeCryptoContext>({
	assets: [],
	crypto: [],
	loading: false,
	AddAsset() {}
})

export function useCryptoContext() {
	return useContext(CryptoContext)
}

function MapAssets(assets: IAsset[], result: ICrypto[]) {
	return assets.map(asset => {
		const coin: ICrypto | undefined = result.find(coin => coin.id === asset.id)
		return {
			name: coin?.name,
			grow: asset.price < (coin?.price as number),
			growPercent: percentDifference(asset.price, coin?.price as number),
			totalAmount: asset.amount * (asset.price || (coin?.price as number)),
			totalProfit:
				asset.amount * (coin?.price as number) - asset.amount * asset.price,
			...asset
		}
	})
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
			setAssets(MapAssets(assetsFetched, result))
			setLoading(false)
		}

		preload()
	}, [])

	function AddAsset(asset: IAsset) {
		setAssets(prev => MapAssets([...prev, asset], crypto))
	}

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets, AddAsset }}>
			{children}
		</CryptoContext.Provider>
	)
}
