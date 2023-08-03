import { useState, useEffect, createContext } from 'react'
import webSocketInit from '../services/websockets'

export const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [result, setResult] = useState([])
  const [ws, setWs] = useState(null)

  useEffect(() => {
    setWs(webSocketInit(setError))
    return () => {
      ws && ws.close()
    }
  }, [])

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
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
