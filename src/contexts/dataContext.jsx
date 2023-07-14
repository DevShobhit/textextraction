import { useState, createContext } from 'react'

export const DataContext = createContext(null)

const DataProvider = ({ children }) => {
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)

  return (
    <DataContext.Provider value={{ email, setEmail, image, setImage }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
