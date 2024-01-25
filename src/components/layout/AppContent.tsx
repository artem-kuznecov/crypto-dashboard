import { FC, CSSProperties } from 'react'
import { Layout, Typography } from 'antd'

import { useCryptoContext } from '../../context/crypto.context'
import { PortfolioChart } from '../assets/portfolio/PortfolioChart'
import { AssetsTable } from '../assets/portfolio/AssetsTable'

const contentStyle: CSSProperties = {
	textAlign: 'center',
	height: 'calc(100vh - 60)',
	minHeight: 'calc(100vh - 60)',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem'
}

// for optimization (no need to do .find inside assets mapping)
type TypeCryptoMap = {
	// * (example) 'bitcoin': 44870.39834657236
	[key: string]: number
}

const AppContent: FC = () => {
	const { assets, crypto } = useCryptoContext()

	const cryptoPriceMap = crypto.reduce((acc: TypeCryptoMap, coin) => {
		acc[coin.id] = coin.price
		return acc
	}, {})

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title
				level={3}
				style={{ textAlign: 'left', color: '#fff', fontFamily: 'Ubuntu' }}
			>
				Портфель:{' '}
				{assets
					.map(asset => {
						return asset.amount * cryptoPriceMap[asset.id]
					})
					.reduce((acc, value) => (acc += value), 0)
					.toFixed(2)}
				$
			</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	)
}

export { AppContent }
