import {
	Select,
	Space,
	Typography,
	Flex,
	Divider,
	Form,
	Button,
	DatePicker,
	InputNumber
} from 'antd'

import type { SelectProps } from 'antd'
import { FC, useState } from 'react'

import { useCryptoContext } from '../../context/crypto.context'
import { ICrypto } from '../../types/crypto.type'

const validateMessages = {
	required: 'Поле ${label} является обазательным',
	types: {
		number: 'Значение поля ${label} должно быть числом'
	},
	number: {
		range: 'Значение поля ${label} должно попадать в диапазон [${min} - ${max}]'
	}
}

const NewAssetForm: FC = () => {
	const [form] = Form.useForm()

	const { crypto } = useCryptoContext()

	const [coin, setCoin] = useState<ICrypto | undefined>(undefined)

	const options: SelectProps['options'] = crypto.map(coin => ({
		label: coin.name,
		value: coin.id,
		icon: coin.icon
	}))

	if (!coin) {
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
	}

	function onFinish(values: any) {
		console.log('finish', values)
	}

	function handleAmountChange(value: number | null) {
		form.setFieldsValue({
			total: (value as number) * (coin?.price as number)
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
			<Flex align='center'>
				<img
					src={coin.icon}
					alt={coin.name}
					style={{ width: 40, marginRight: 10 }}
				/>

				<Typography.Title level={2} style={{ margin: 0, fontFamily: 'Ubuntu' }}>
					{coin.name}
				</Typography.Title>

				{/* <Button type='primary' htmlType='submit'>
					Выбрать заново
				</Button> */}
			</Flex>

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
				<InputNumber disabled style={{ width: '100%' }} />
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
