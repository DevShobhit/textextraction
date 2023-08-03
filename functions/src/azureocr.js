const {
  ComputerVisionClient,
} = require('@azure/cognitiveservices-computervision')
const { ApiKeyCredentials } = require('@azure/ms-rest-js')

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

// Analyze Image from URL
const TextExtractor = async (url) => {
  // authenticate to Azure service
  const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({
      inHeader: {
        'Ocp-Apim-Subscription-Key': process.env.COMPUTER_VISION_KEY,
      },
    }),
    process.env.COMPUTER_VISION_ENDPOINT
  )

  // analyze image
  let result = await computerVisionClient.read(url, { language: 'en' })

  // console.log(result)

  let operationID = result.operationLocation.split('/').slice(-1)[0]

  // console.log(operationID)

  // While extraction is not completed wait for 500ms and then check the result again
  while (result.status !== 'succeeded') {
    await wait(500)
    result = await computerVisionClient.getReadResult(operationID)
  }

  // console.log('STATUS: ', result.status)

  return result.analyzeResult
}

module.exports = { TextExtractor }
