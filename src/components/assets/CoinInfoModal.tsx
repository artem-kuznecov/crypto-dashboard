import { FC } from 'react'
import { ICrypto } from '../../types/crypto.type'

const CoinInfoModal: FC<{ coin: ICrypto }> = ({ coin }: { coin: ICrypto }) => {
	return <h2>{coin.name}</h2>
}

export { CoinInfoModal }
