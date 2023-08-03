import { lazy, Suspense, useContext } from 'react'

import { PageContext } from './contexts/pageContext'
import DataProvider from './contexts/dataContext'

const Home = lazy(() => import('./pages/home'))
const Upload = lazy(() => import('./pages/upload'))
const Result = lazy(() => import('./pages/result'))

import { Container } from '@chakra-ui/react'

const App = () => {
  const { page } = useContext(PageContext)

  const PageView = {
    1: (
      <Container maxW='4xl'>
        <Home />
      </Container>
    ),
    2: (
      <Container maxW='4xl'>
        <Upload />
      </Container>
    ),
    3: <Result />,
  }[page]

  return (
    <DataProvider>
      <Suspense fallback={<Container centerContent>Loading...</Container>}>
        {PageView}
      </Suspense>
    </DataProvider>
  )
}

export default App
