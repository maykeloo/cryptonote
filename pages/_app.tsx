import type { AppProps } from 'next/app'
import { ContractContextProvider } from '../components/ContractContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContractContextProvider>
      <Component {...pageProps} />
    </ContractContextProvider>
  )
}

export default MyApp
