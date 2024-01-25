import {
	Select,
	Space,
	Divider,
	Form,
	Button,
	DatePicker,
	InputNumber,
	Result
} from 'antd'

import type { SelectProps } from 'antd'
import { FC, useRef, useState } from 'react'

import { useCryptoContext } from '../../context/crypto.context'
import { IAsset, ICrypto } from '../../types/crypto.type'
import { CoinInfoBlock } from './coin/CoinInfoBlock'

// const validateMessages = {
// 	required: 'Поле ${label} является обазательным',
// 	types: {
// 		number: 'Значение поля ${label} должно быть числом'
// 	},
// 	number: {
// 		range: 'Значение поля ${label} должно попадать в диапазон [${min} - ${max}]'
// 	}
// }

const NewAssetForm: FC<{ onClose: () => void }> = ({ onClose }) => {
	const [form] = Form.useForm()

	const { crypto, AddAsset } = useCryptoContext()

	const [coin, setCoin] = useState<ICrypto | undefined>(undefined)

	const [submitted, setSubmitted] = useState<boolean>(false)

	const assetRef = useRef<IAsset>()

	const options: SelectProps['options'] = crypto.map(coin => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon
	}))

	if (submitted)
		return (
			<Result
				status='success'
				title='Вклад добавлен в активы'
				subTitle={`Добавлен ${assetRef.current?.amount}${coin?.symbol} (${coin?.name}) по стоимости ${assetRef.current?.price}$`}
				extra={[
					<Button type='primary' key='console' onClick={onClose}>
						Закрыть
					</Button>,
					<Button key='buy'>Buy Again</Button>
				]}
			/>
		)

	if (!coin)
		return (
			<Select
				style={{ width: '100%' }}
				onSelect={v => setCoin(crypto.find(coin => coin.id === v))}
				placeholder='Выберите валюту'
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
		)

	function onFinish(values: any) {
		const newAsset: IAsset = {
			id: coin?.id as string,
			amount: values.amount,
			price: values.price,
			date: values.date?.$d ?? new Date()
		}
		assetRef.current = newAsset
		setSubmitted(true)
		AddAsset(newAsset)
	}

	function handleAmountChange(value: number | null) {
		const price = form.getFieldValue('price')

		form.setFieldsValue({
			total: +((value as number) * price).toFixed(2)
		})
	}

	function handlePriceChange(value: number | null) {
		const amount: number = form.getFieldValue('amount')

		form.setFieldsValue({
			total: +(amount * (value as number)).toFixed(2)
		})
	}

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 10 }}
			style={{ maxWidth: 600 }}
			initialValues={{
				price: +coin.price.toFixed(2)
			}}
			onFinish={onFinish}
			// validateMessages={validateMessages}
		>
			<CoinInfoBlock coin={coin} withSymbol={false} />
			<Divider />

			<Form.Item
				label='Количество'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
						message: 'Количество валюты должно быть неотрицательным числом'
					}
				]}
			>
				<InputNumber
					placeholder='Количество криптомонет'
					onChange={handleAmountChange}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label='Цена' name='price'>
				<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item label='Дата и время' name='date'>
				<DatePicker showTime />
			</Form.Item>

			<Form.Item label='Итоговая сумма' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Добавить вклад
				</Button>
			</Form.Item>
		</Form>
	)
}

export { NewAssetForm }
