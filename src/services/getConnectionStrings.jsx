const getConnectionStrings = async () => {
  const response = await fetch(import.meta.env.VITE_FUNCTION_URL)
  const connectionStrings = await response.json()
  return connectionStrings
}

export default getConnectionStrings
