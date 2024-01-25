import { FC, CSSProperties } from 'react'
import { Layout } from 'antd'

import { useCryptoContext } from '../../context/crypto.context'
import { AssetCard } from '../assets/AssetCard'

const siderStyle: CSSProperties = {
	padding: '1rem',
	overflow: 'scroll',
	border: '1px solid gray'
}

const AppSider: FC = () => {
	const { assets } = useCryptoContext()

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map((asset, index) => (
				<AssetCard key={index} asset={asset} />
			))}
		</Layout.Sider>
	)
}

export { AppSider }
