import { useContext } from 'react'

import { DataContext } from '../contexts/dataContext'

import { Flex, Box, Image, Accordion, useDisclosure } from '@chakra-ui/react'
import AccordianCont from '../containers/accordian'
import InfoModal from '../containers/modal'

const Result = () => {
  const { image, result } = useContext(DataContext)
  const imageURL = image && URL.createObjectURL(image)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const resdata = result.filter((res) => JSON.parse(res).status === 'Success')

  return (
    <Box p='20px'>
      <InfoModal isOpen={isOpen} onClose={onClose} />
      <Flex justify={'end'} p={2}>
        <Box cursor={'pointer'} onClick={onOpen}>
          ℹ️
        </Box>
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        align={'start'}
        justify={'space-between'}
        mt={5}
        gap={2}
        padding={2}
        h={'80vh'}
      >
        <Box w={['100%', '100%', '50%']} mb={2}>
          {image && (
            <Image src={imageURL} maxW={'100%'} maxH={'80vh'} mx={'auto'} />
          )}
        </Box>
        <Box w={['100%', '100%', '50%']} py={1} px={2} mb={2}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordianCont Heading={'logs'} type='log' Content={result} />
            <AccordianCont
              Heading={'result'}
              type='res'
              Content={
                resdata.length > 0
                  ? JSON.parse(resdata[0]).readResults[0].lines
                  : []
              }
            />
          </Accordion>
        </Box>
      </Flex>
    </Box>
  )
}

export default Result
