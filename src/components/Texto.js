import { useContext } from 'react';
import { userContext } from '../hooks/useContext';
export const Texto = ({setFuente, setTamano, escribe}) => {
    let { setFuncionalidad } = useContext(userContext);
    return (
        <div className="opcion op2">
            <div className="conf">
            <label htmlFor="tam">Fuente</label>
            <select id="tam" onChange={()=>{setFuente(this.value)}}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Palatino">Palatino</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Impact">Impact</option>
            </select>
            <label htmlFor="tam">Tamano fuente</label>
            <input type="range" id="tam" min="10" max="80" step="5" value="1" onChange={()=>{setTamano(this.value)}}></input>
            <button className="dibujar" onClick={escribe}><span className="material-symbols-outlined">
                edit_square
                </span></button>
        </div>
        </div>
    )
}