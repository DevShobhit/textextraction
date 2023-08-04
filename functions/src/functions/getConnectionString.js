const { app } = require('@azure/functions')
const { WebPubSubServiceClient } = require('@azure/web-pubsub')
const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  ContainerSASPermissions,
  generateBlobSASQueryParameters,
} = require('@azure/storage-blob')

function createStorageSASToken() {
  const account = 'samplestorageaccount'

  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    process.env.STORAGE_ACCOUNT_KEY
  )
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient('azuretest')

  const startTime = new Date()
  const endTime = new Date(startTime)
  endTime.setMinutes(endTime.getMinutes() + 60) // 1 hour after creation

  const sasOptions = {
    containerName: containerClient.containerName,
    permissions: ContainerSASPermissions.parse('aw'), // write and add permissions
    startsOn: startTime,
    expiresOn: endTime,
  }

  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    sharedKeyCredential
  ).toString()

  return sasToken
}

async function getPubSubClientURL() {
  let service = new WebPubSubServiceClient(
    process.env.PUB_SUB_CONNECTION_STRING,
    'Hub'
  )
  let token = await service.getClientAccessToken({
    expirationTimeInMinutes: 60,
  })

  return token.url
}

app.http('getConnectionString', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`)

    const token = createStorageSASToken()
    const accessURL = await getPubSubClientURL()

    context.log(`Token ${token}`)
    context.log(`URL ${accessURL}`)

    return {
      body: JSON.stringify({
        sasToken: token,
        clientURL: accessURL,
      }),
    }
  },
})
