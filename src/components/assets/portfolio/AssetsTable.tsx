import React from 'react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { useCryptoContext } from '../../../context/crypto.context'

interface DataType {
	key: string
	name: string | undefined
	price: number
	amount: number
}

const columns: TableColumnsType<DataType> = [
	{
		title: 'Название',
		dataIndex: 'name',
		showSorterTooltip: false,
		sorter: (a, b) => (a.name as string).length - (b.name as string).length,
		sortDirections: ['descend']
	},
	{
		title: 'Цена, $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		showSorterTooltip: false,
		sorter: (a, b) => a.price - b.price
	},
	{
		title: 'Количество',
		dataIndex: 'amount'
	}
]

const AssetsTable: React.FC = () => {
	const { assets } = useCryptoContext()

	const data = assets.map((asset, index) => ({
		key: index,
		name: asset.name,
		price: asset.price,
		amount: asset.amount
	}))

	return (
		<div
			style={{
				borderRadius: '12px',
				overflow: 'hidden'
			}}
		>
			<Table columns={columns} dataSource={data} pagination={false} />
		</div>
	)
}

export { AssetsTable }
