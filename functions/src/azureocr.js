const {
  ComputerVisionClient,
} = require('@azure/cognitiveservices-computervision')
const { ApiKeyCredentials } = require('@azure/ms-rest-js')

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

  return result.analyzeResult
}

module.exports = { TextExtractor }
