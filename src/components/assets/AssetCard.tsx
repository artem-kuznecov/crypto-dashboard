import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Statistic, List, Typography, Tag } from 'antd'

import { capitalize } from '../../utils/typography.util'
import { FC } from 'react'
import { IAsset } from '../../types/crypto.type'

const AssetCard: FC<{ asset: IAsset }> = ({ asset }) => {
	return (
		<Card style={{ marginBottom: '1rem' }}>
			<Statistic
				title={capitalize(asset.id)}
				value={asset.totalAmount}
				precision={2}
				valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
				prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
				suffix='$'
			/>
			<List
				size='small'
				dataSource={[
					{
						title: 'Динамика',
						value: asset.totalProfit,
						isTagged: true
					},
					{
						title: 'Количество монет',
						value: asset.amount,
						isPlain: true
					}
				]}
				renderItem={item => (
					<List.Item>
						<span>{item.title}</span>

						<span>
							{item.isTagged && (
								<Tag
									color={asset.grow ? 'green' : 'red'}
									style={{ fontFamily: 'Ubuntu' }}
								>
									{asset.growPercent?.toFixed(2)}%
								</Tag>
							)}
							{item.isPlain && item.value}

							{!item.isPlain && (
								<Typography.Text
									type={asset.grow ? 'success' : 'danger'}
									style={{ fontFamily: 'Ubuntu' }}
								>
									{item.value?.toFixed(2)}$
								</Typography.Text>
							)}
						</span>
					</List.Item>
				)}
			/>
		</Card>
	)
}

export { AssetCard }
