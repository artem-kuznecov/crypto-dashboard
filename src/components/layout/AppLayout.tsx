import { Layout, Spin } from 'antd'

import { AppHeader } from './AppHeader'
import { AppSider } from './AppSider'
import { AppContent } from './AppContent'
import { useContext } from 'react'

import { CryptoContext } from '../../context/crypto.context'

const AppLayout = () => {
	const { loading } = useContext(CryptoContext)

	// * Show loader if the data is still fetching
	if (loading) return <Spin fullscreen />

	return (
		<Layout style={{ height: '100vh' }}>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}

export { AppLayout }
