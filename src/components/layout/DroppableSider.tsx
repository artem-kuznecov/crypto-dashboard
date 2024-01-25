import { FC } from 'react'
import { Layout } from 'antd'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import type { DropResult } from 'react-beautiful-dnd'
import type { CSSProperties } from 'react'

import { useCryptoContext } from '../../context/crypto.context'
import { AssetCard } from '../assets/AssetCard'

const siderStyle: CSSProperties = {
	padding: '1rem',
	overflow: 'scroll',
	borderRight: '1px solid gray',
	borderTop: '1px solid gray'
}

const DroppableSider: FC<{ type: string }> = ({ type }) => {
	const { assets, ReorderAssets } = useCryptoContext()

	const handleDragEnd = (result: DropResult) => {
		const src = result.source
		const dest = result.destination

		// * If the component was dropped outside the droppable area
		if (!dest) return

		return ReorderAssets([...assets], src.index, dest.index)
	}

	return (
		<Layout.Sider width='25%' style={siderStyle}>
			<DragDropContext onDragEnd={handleDragEnd}>
				<Droppable droppableId={type} type='task'>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							// style={{ height: '100vh' }}
							// className='dev'
						>
							{assets.map((asset, index) => (
								<Draggable
									key={index}
									draggableId={index.toString()}
									index={index}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<AssetCard asset={asset} />
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</Layout.Sider>
	)
}

export { DroppableSider }
