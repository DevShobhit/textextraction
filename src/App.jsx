import { Container } from '@chakra-ui/react'
import Home from './pages/home'
import { PageContext } from './contexts/pageContext'
import { useContext } from 'react'
import Upload from './pages/upload'
import DataProvider from './contexts/dataContext'

const App = () => {
  const { page } = useContext(PageContext)
  return (
    <DataProvider>
      <Container maxW='4xl'>
        {page === 3 ? <Result /> : page === 2 ? <Upload /> : <Home />}
      </Container>
    </DataProvider>
  )
}

export default App
