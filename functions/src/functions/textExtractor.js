const { app } = require('@azure/functions')
const { TextExtractor } = require('../azureocr')
const { StoreInDb } = require('../mongo')

const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff']

app.storageBlob('textExtractor', {
  path: 'sampleblob/{name}',
  connection: 'samplestorageaccount_STORAGE',
  handler: async (blob, context) => {
    context.log(
      `Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`
    )
    const blobUrl = context.triggerMetadata.uri
    const extension = blobUrl.split('.').pop()
    context.log(blobUrl)

    if (!blobUrl) {
      // url is empty
      context.log('BLOB URL IS EMPTY')
      return
    } else if (
      !extension ||
      !imageExtensions.includes(extension.toLowerCase())
    ) {
      // not processing file because it isn't a valid and accepted image extension
      context.log('NOT A VALID FILE FORMAT')
      return
    } else {
      //url is image
      context.log('VALID')
      context.log('Extracting the text from image')
      const res = await TextExtractor(blobUrl)
      context.log('Extraction Completed')
      //   context.log(res)

      await StoreInDb({
        blobUrl,
        ...res,
        email: context.triggerMetadata.metadata.uploaderEmail,
      })

      context.log('DONE')
    }
  },
})
