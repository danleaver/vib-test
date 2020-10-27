import React, { useState } from 'react';

export const ConfigContext = React.createContext()

export const ConfigProvider = (props) => {
  const [ blinkVar, setBlinkVar ] = useState(909);

  return(
    <ConfigContext.Provider value={{
      blinkVar,
      setBlinkVar
    }}>
      {props.children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider