import { BlobServiceClient } from '@azure/storage-blob'

const UploadImage = async (email, image, uploadUrl, setUploadInfo) => {
  try {
    if (!image) {
      throw new Error('Image must Be Specified')
    }

    const blobService = new BlobServiceClient(uploadUrl)

    const containerClient = blobService.getContainerClient(
      import.meta.env.VITE_CONTAINER_NAME
    )

    const blobClient = containerClient.getBlockBlobClient(
      Date.now() + image.name
    )

    const options = {
      blobHTTPHeaders: { blobContentType: image.type },
      metadata: { uploaderEmail: email },
      onProgress: (uploadprogress) => {
        const progress = Math.round(
          (uploadprogress.loadedBytes / image.size) * 100
        )
        setUploadInfo((prevInfo) => ({ ...prevInfo, progress: progress }))
      },
    }

    await blobClient.uploadData(image, options)
  } catch (e) {
    setUploadInfo((prevInfo) => ({ ...prevInfo, error: 'Image Upload Failed' }))
    console.log(e)
  }
}

export default UploadImage
