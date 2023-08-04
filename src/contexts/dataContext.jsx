import { useState, useEffect, createContext } from 'react'
import webSocketInit from '../services/websockets'
import getConnectionStrings from '../services/getConnectionStrings'

export const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('Websocket not initialised')
  const [result, setResult] = useState([])
  const [ws, setWs] = useState(null)
  const [sasToken, setSASToken] = useState(null)
  const [accessURL, setAccessURL] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getConnectionStrings()
      setAccessURL(data.clientURL)
      setSASToken(data.sasToken)
    }

    getData()
  }, [sasToken, accessURL])

  useEffect(() => {
    accessURL && setWs(webSocketInit(accessURL, setError))
    return () => {
      ws && ws.close()
    }
  }, [accessURL])

  useEffect(() => {
    ws &&
      (ws.onmessage = (e) => {
        const message = e.data
        if (JSON.parse(message).email === email) {
          setResult((prevRes) => [...prevRes, message])
        }
        // console.log(message)
      })
  }, [email])

  return (
    <DataContext.Provider
      value={{
        email,
        setEmail,
        image,
        setImage,
        result,
        setResult,
        error,
        setError,
        sasToken,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
