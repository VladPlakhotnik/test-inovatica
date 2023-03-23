import { FactsList } from './components/FactsList'
import { CacheProvider } from './context/CacheProvider'

const App = () => {
  return (
    <CacheProvider>
      <FactsList />
    </CacheProvider>
  )
}

export default App
