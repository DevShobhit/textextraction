import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  Box,
} from '@chakra-ui/react'
import BgImage from '../assets/images/back.png'
import Diagram from '../assets/images/architecture.png'

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} size={'4xl'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgImage={`url(${BgImage})`} border={'2px solid black'}>
          <ModalHeader>Architecture Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={5} px={10} fontStyle={'italic'}>
            <Text mb={2}>
              While Text extraction is under Progress. Take a look at the
              architecture of the Application.
            </Text>
            <Image src={Diagram} />
            <Box mt={2} lineHeight={2}>
              <Text mb={2}>
                This is high level overview of what happens at backend of the
                Application.
              </Text>
              <Text>
                As soon you hit Upload Image Button, Image is uploaded to Azure
                Blob Storage triggering the execution of Azure Function.
              </Text>
              <Text>
                Azure Function extracts Text from uploaded image by calling
                Azure Cognitive Service.
              </Text>
              <Text>
                Using Azure Web Pub Sub you are notified about the details of
                Text Extraction Process.
              </Text>
              <Text>
                Once the extraction completes, result is stored in MongoDB.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InfoModal
