import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react'

const AccordianCont = ({ Heading, Content, type }) => {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box
          flex='1'
          textAlign='left'
          fontWeight={'bold'}
          textTransform={'uppercase'}
        >
          {Heading}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel maxH={'35vh'} overflow={'scroll'} lineHeight={2}>
        {type === 'log'
          ? Content.map((log, idx) => {
              const status = JSON.parse(log).status
              const message = JSON.parse(log).message

              return (
                <Flex key={'log' + idx}>
                  <Text fontWeight={'bold'}>{status} : &nbsp;</Text>
                  <Text> {message}</Text>
                </Flex>
              )
            })
          : Content.map((line, idx) => (
              <Text key={'ResultLine-' + idx}>{line.text}</Text>
            ))}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default AccordianCont
