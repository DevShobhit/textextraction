const webSocketInit = (url, setError) => {
  const ws = new WebSocket(url)
  ws.onopen = () => {
    console.log('WebSocket Connection Established Properly.')
    setError(null)
  }

  ws.onerror = (event) => {
    console.error('WebSocket error:', event)
    setError('WebSocket Connection could not be established.')
  }

  ws.onclose = (event) => {
    console.log('WebSocket connection closed:', event)
  }

  return ws
}

export default webSocketInit
