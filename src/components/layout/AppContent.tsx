import { FC, CSSProperties } from 'react'
import { Layout } from 'antd'

const contentStyle: CSSProperties = {
	textAlign: 'center',
	height: 'calc(100vh - 60)',
	minHeight: 'calc(100vh - 60)',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rm'
}

const AppContent: FC = () => {
	return <Layout.Content style={contentStyle}>Content</Layout.Content>
}

export { AppContent }
