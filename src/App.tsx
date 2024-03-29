import { FC } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { CryptoContextProvider } from './context/crypto.context'

const App: FC = () => {
	return (
		<CryptoContextProvider>
			<AppLayout />
		</CryptoContextProvider>
	)
}

export default App
