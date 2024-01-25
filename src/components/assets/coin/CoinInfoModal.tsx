import { FC } from 'react'
import { ICrypto } from '../../../types/crypto.type'
import { Divider, Tag, Typography } from 'antd'
import { CoinInfoBlock } from './CoinInfoBlock'

const CoinInfoModal: FC<{ coin: ICrypto }> = ({ coin }: { coin: ICrypto }) => {
	return (
		<>
			<CoinInfoBlock coin={coin} withSymbol={true} />

			<Divider />

			<Typography.Paragraph>
				<Typography.Text strong>1 час: </Typography.Text>
				<Tag
					color={coin.priceChange1h > 0 ? 'green' : 'red'}
					style={{ fontFamily: 'Ubuntu' }}
				>
					{coin.priceChange1h}%
				</Tag>

				<Typography.Text strong>1 день: </Typography.Text>
				<Tag
					color={coin.priceChange1d > 0 ? 'green' : 'red'}
					style={{ fontFamily: 'Ubuntu' }}
				>
					{coin.priceChange1d}%
				</Tag>

				<Typography.Text strong>1 неделя: </Typography.Text>
				<Tag
					color={coin.priceChange1w > 0 ? 'green' : 'red'}
					style={{ fontFamily: 'Ubuntu' }}
				>
					{coin.priceChange1w}%
				</Tag>
			</Typography.Paragraph>

			<Typography.Paragraph style={{ fontFamily: 'Ubuntu' }}>
				<Typography.Text strong>Цена: </Typography.Text>
				{coin.price.toFixed(2)}$
			</Typography.Paragraph>

			<Typography.Paragraph style={{ fontFamily: 'Ubuntu' }}>
				<Typography.Text strong>Цена BTC: </Typography.Text>
				{coin.priceBtc.toFixed(2)}BTC
			</Typography.Paragraph>

			<Typography.Paragraph style={{ fontFamily: 'Ubuntu' }}>
				<Typography.Text strong>Капитализация: </Typography.Text>
				{coin.marketCap}
			</Typography.Paragraph>

			{coin.contractAddress && (
				<Typography.Paragraph style={{ fontFamily: 'Ubuntu' }}>
					<Typography.Text strong>Контрактный адрес: </Typography.Text>
					{coin.contractAddress}
				</Typography.Paragraph>
			)}
		</>
	)
}

export { CoinInfoModal }
