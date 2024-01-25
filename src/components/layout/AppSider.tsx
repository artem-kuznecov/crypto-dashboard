import { FC, CSSProperties } from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd'

import { capitalize } from '../../utils/typography.util'
import { useCryptoContext } from '../../context/crypto.context'

import { mainStyles } from '../assets/AntdTag'

const siderStyle: CSSProperties = {
	// ...mainStyles,
	padding: '1rem'
	// overflow: 'scroll'
}

const AppSider: FC = () => {
	const { assets } = useCryptoContext()

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			{assets.map((asset, index) => {
				return (
					<Card key={index} style={{ marginBottom: '1rem' }}>
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
			})}
		</Layout.Sider>
	)
}

export { AppSider }
