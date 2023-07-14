import { useContext } from 'react'
import { PageContext } from '../contexts/pageContext'
import { DataContext } from '../contexts/dataContext'
import { ValidateEmail } from '../utils/validationutils'

import { Heading, Input, Button, Flex, Container } from '@chakra-ui/react'

const Home = () => {
  const { setPage } = useContext(PageContext)
  const { email, setEmail } = useContext(DataContext)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleClick = () => {
    ValidateEmail(email) ? setPage(2) : ''
  }

  return (
    <Container maxW={'3xl'} mt={['100px', '50px', '100px']} justify={'center'}>
      <Heading fontSize={['80px', '100px', '120px']} mb={4}>
        From Pixels to Words
      </Heading>
      <Heading fontSize={['3xl', '4xl', '5xl']} mt='20px' mb='60px'>
        Transform your images into Text
      </Heading>

      <Flex align={'center'}>
        <Input
          type='email'
          variant='filled'
          size='lg'
          maxW='md'
          placeholder='Email'
          borderColor='black'
          borderRadius={'10px'}
          background='gray.50'
          mr={'20px'}
          _hover={{ bgColor: 'transparent' }}
          _focus={{ borderColor: 'black' }}
          value={email}
          onChange={handleChange}
        />
        <Button
          size='lg'
          borderRadius='10px'
          bg={'black'}
          color={'white'}
          px={10}
          border='2px solid black'
          _hover={{ bg: 'white', color: 'black', borderColor: 'black' }}
          onClick={handleClick}
        >
          Get Started →
        </Button>
      </Flex>
    </Container>
  )
}

export default Home
