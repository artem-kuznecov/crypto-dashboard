import { cryptoAssets, cryptoData } from './data/data'
import { IAsset, ICrypto } from './types/crypto.type'

const DEV_DELAY_TIME: number = 1

export async function fetchCrypto(): Promise<{ result: ICrypto[] }> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoData)
		}, DEV_DELAY_TIME)
	})
}

export async function fetchAssets(): Promise<IAsset[]> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoAssets)
		}, DEV_DELAY_TIME)
	})
}
