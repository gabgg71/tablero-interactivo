import React, { useState } from 'react';
import { userContext } from './hooks/useContext';
import { Canva } from './components/Canva';

const App =()=> {
  //dibujar, escribir, borrar, figura
  let [funcionalidad, setFun] = useState([false, false, false, false]);
  return (
    <userContext.Provider value={{funcionalidad, setFun}}>
      <Canva/>
    </userContext.Provider>
  )
}

export default App;