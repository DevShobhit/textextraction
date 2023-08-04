import { useState, useContext, useEffect } from 'react'

import { DataContext } from '../contexts/dataContext'
import { PageContext } from '../contexts/pageContext'

import UploadContainer from '../containers/upload'
import { ErrorNotif, SuccessNotif } from '../containers/alert'
import UploadImage from '../services/uploadImage'

import { Box, Image, Text, Flex, Button, Progress } from '@chakra-ui/react'

const Upload = () => {
  const { setPage } = useContext(PageContext)
  const { image, email, error, sasToken } = useContext(DataContext)

  const [uploadInfo, setUploadInfo] = useState({
    error: null,
    progress: 0,
    isUploading: false,
  })

  const imageURL = image && URL.createObjectURL(image)
  const uploadUrl = `https://${
    import.meta.env.VITE_STORAGE_ACCOUNT_NAME
  }.blob.core.windows.net/${import.meta.env.VITE_CONTAINER_NAME}/?${sasToken}`

  const handleUpload = () => {
    setUploadInfo({ ...uploadInfo, isUploading: true })
    UploadImage(email, image, uploadUrl, setUploadInfo)
    setUploadInfo({ ...uploadInfo, isUploading: false })
  }

  useEffect(() => {
    const changePage = async () => {
      const validation =
        uploadInfo.progress === 100 &&
        uploadInfo.isUploading === false &&
        !uploadInfo.error
      validation && setPage(3)
    }

    changePage()
  }, [uploadInfo])

  return (
    <>
      <ErrorNotif error={error} />
      <ErrorNotif error={uploadInfo.error} />
      {!uploadInfo.error && uploadInfo.progress === 100 && (
        <SuccessNotif message={'Image Uploaded Successfully'} />
      )}

      <UploadContainer />
      {uploadInfo.isUploading && (
        <Progress
          mt={5}
          value={uploadInfo.progress}
          colorScheme='green'
          size={'xs'}
        />
      )}
      <Flex
        direction={['column', 'row']}
        align={'center'}
        justify={'center'}
        mt={5}
        gap={10}
      >
        {image && <Image src={imageURL} h={'300px'} />}
        {image && (
          <Box>
            <Text fontWeight='bold'>Selected Image:</Text>
            <Text>
              {image.name} - {image.size} bytes
            </Text>
            <Button
              size='lg'
              borderRadius='10px'
              bg={'black'}
              color={'white'}
              mt={5}
              px={10}
              border='2px solid black'
              _hover={{ bg: 'white', color: 'black', borderColor: 'black' }}
              isDisabled={error || uploadInfo.isUploading ? true : false}
              onClick={handleUpload}
            >
              Upload Image
            </Button>
          </Box>
        )}
      </Flex>
    </>
  )
}

export default Upload
