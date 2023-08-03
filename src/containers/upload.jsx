import { useRef, useContext } from 'react'
import { DataContext } from '../contexts/dataContext'
import { Text, Input, Flex } from '@chakra-ui/react'

const Upload = () => {
  const fileInputRef = useRef(null)
  const { setImage } = useContext(DataContext)

  const handleFileSelect = () => {
    const selectedImage = fileInputRef.current.files[0]
    setImage(selectedImage)
  }

  return (
    <>
      <Flex
        align={'center'}
        justify={'center'}
        color={'black'}
        borderWidth={4}
        borderRadius='lg'
        borderStyle='dashed'
        borderColor={'black'}
        p={4}
        h={200}
        mt={20}
        textAlign='center'
        cursor='pointer'
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          fileInputRef.current.files = e.dataTransfer.files
          handleFileSelect()
        }}
      >
        <Text>Drag and drop files here or click to browse</Text>
      </Flex>
      {/* <Button onClick={() => fileInputRef.current.click()}>Upload</Button> */}
      <Input
        type='file'
        ref={fileInputRef}
        display={'none'}
        onChange={handleFileSelect}
      />
    </>
  )
}

export default Upload
