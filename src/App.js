import React, { useState } from 'react';
import { userContext } from './hooks/useContext';
//import { Canva } from './components/Canva';
import { Opciones } from './components/Opciones';

const App =()=> {
  //dibujar, escribir, borrar, figura
  let [funcionalidad, setFun] = useState([false, false, false, false]);
  return (
    <userContext.Provider value={{funcionalidad, setFun}}>
      <Opciones/>
    </userContext.Provider>
  )
}

export default App;