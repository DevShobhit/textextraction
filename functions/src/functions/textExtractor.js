const { app } = require('@azure/functions')
const { WebPubSubServiceClient } = require('@azure/web-pubsub')
const { TextExtractor } = require('../azureocr')
const { StoreInDb } = require('../mongo')

const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tiff']
const hub = 'Hub'

let service = new WebPubSubServiceClient(
  process.env.PUB_SUB_CONNECTION_STRING,
  hub
)

app.storageBlob('textExtractor', {
  path: 'sampleblob/{name}',
  connection: 'samplestorageaccount_STORAGE',
  handler: async (blob, context) => {
    try {
      context.log(
        `Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`
      )

      const blobUrl = context.triggerMetadata.uri
      const extension = blobUrl.split('.').pop()
      const email = context.triggerMetadata.metadata.uploaderEmail
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
        context.log('NOT A VALID IMAGE FORMAT')
        await service.sendToAll(
          {
            status: 'Error',
            message: 'Not a Valid Image Format',
            email,
          },
          { contentType: 'application/json' }
        )
        return
      } else {
        //url is image
        context.log('VALID')
        context.log('Extracting the text from image')
        await service.sendToAll(
          {
            status: 'Info',
            message: 'Starting the extraction of the Text from the image',
            email,
          },
          { contentType: 'application/json' }
        )
        const res = await TextExtractor(blobUrl)
        context.log('Extraction Completed')
        await service.sendToAll(
          {
            status: 'Info',
            message: 'Extraction of the text Completed Successfully',
            email,
          },
          { contentType: 'application/json' }
        )
        //   context.log(res)

        await StoreInDb({
          blobUrl,
          ...res,
          email: context.triggerMetadata.metadata.uploaderEmail,
        })

        context.log('Pushed in DB successfully')

        await service.sendToAll(
          {
            status: 'Success',
            message: 'Completed Extraction of Text from Image',
            blobUrl,
            ...res,
            email,
          },
          { contentType: 'application/json' }
        )
        context.log('DONE')
      }
    } catch (e) {
      context.log(e)
      await service.sendToAll(
        {
          status: 'Error',
          message: 'Text Extraction Failed',
          error: e,
          email: context.triggerMetadata.metadata.uploaderEmail,
        },
        { contentType: 'application/json' }
      )
    }
  },
})
