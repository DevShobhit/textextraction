import { Alert, AlertIcon, CloseButton, useDisclosure } from '@chakra-ui/react'

export const ErrorNotif = ({ error }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      {error && isVisible && (
        <Alert status='error' my='5px' variant='left-accent'>
          <AlertIcon />
          {error}
          <CloseButton ml='auto' onClick={onClose} />
        </Alert>
      )}
    </>
  )
}

export const SuccessNotif = ({ message }) => {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      {message && isVisible && (
        <Alert status='success' my='5px' variant='left-accent'>
          <AlertIcon />
          {message}
          <CloseButton ml='auto' onClick={onClose} />
        </Alert>
      )}
    </>
  )
}
