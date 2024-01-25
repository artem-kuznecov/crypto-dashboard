import { FC, CSSProperties, useState, useEffect } from 'react'
import { Layout, Select, SelectProps, Space, Button, Modal } from 'antd'
import { useCryptoContext } from '../../context/crypto.context'
import { CoinInfoModal } from '../assets/CoinInfoModal'
import { ICrypto } from '../../types/crypto.type'

const headerStyle: CSSProperties = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center'
}

const AppHeader: FC = () => {
	// * isOpen state for select
	const [selectOpen, setSelectOpen] = useState(false)
	// * active (selected) coin state
	const [activeCoin, setActiveCoin] = useState<ICrypto | undefined>(undefined)
	// * isOpen state for modal
	const [modalOpen, setModalOpen] = useState(false)

	const { crypto } = useCryptoContext()

	useEffect(() => {
		const keyPress = (e: globalThis.KeyboardEvent): void => {
			if (e.key === '/') setSelectOpen(prev => !prev)
		}

		document.addEventListener('keypress', keyPress)

		return () => document.removeEventListener('keypress', keyPress)
	}, [])

	const handleSelect = (value: string) => {
		setModalOpen(true)
		setActiveCoin(crypto.find(coin => coin.id === value))
	}

	const options: SelectProps['options'] = crypto.map(coin => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon
	}))

	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{ width: 250 }}
				open={selectOpen}
				onChange={handleSelect}
				onClick={() => setSelectOpen(prev => !prev)}
				value='Нажмите /, чтобы открыть'
				options={options}
				optionRender={option => (
					<Space>
						<img
							style={{ width: 20 }}
							src={option.data.icon}
							alt={option.data.label}
						/>{' '}
						{option.data.label}
					</Space>
				)}
			/>

			<Button type='primary'>Добавить ассет</Button>

			<Modal
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				footer={null}
			>
				<CoinInfoModal coin={activeCoin as ICrypto} />
			</Modal>
		</Layout.Header>
	)
}

export { AppHeader }
