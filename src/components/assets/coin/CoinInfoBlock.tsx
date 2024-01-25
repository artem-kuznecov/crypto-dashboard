import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { ICrypto } from '../../../types/crypto.type'

type TypeProps = {
	coin: ICrypto
	withSymbol: boolean
}

const CoinInfoBlock: FC<TypeProps> = ({ coin, withSymbol }: TypeProps) => {
	return (
		<Flex align='center'>
			<img
				src={coin.icon}
				alt={coin.name}
				style={{ width: 40, marginRight: 10 }}
			/>

			<Typography.Title level={2} style={{ margin: 0, fontFamily: 'Ubuntu' }}>
				{withSymbol && `(${coin.symbol})`} {coin.name}
			</Typography.Title>

			{/* <Button type='primary' htmlType='submit'>
					Выбрать заново
				</Button> */}
		</Flex>
	)
}

export { CoinInfoBlock }
