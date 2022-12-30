export const Opciones =()=>{

    return(
        <div className="opciones">
            <div className="opcion op1">
                <div className="conf">
                    <label for="tam" className="color">Color</label>
                    <input type="color" onChange={cambio(this.value)}></input>
                    <label for="tam">Ancho de linea</label>
                    <input type="range" id="tam" min="1" max="50" step="5" value="1" onChange={presiona(this.value)}></input>
                    <button value=".op1" onClick={dibujar}><span className="material-symbols-outlined">
                        draw
                        </span></button>
                </div>
            </div>
            <div className="opcion op2">
            <div className="conf">
            <label for="tam">Fuente</label>
            <select id="tam" onChange={()=>{cambioFuente(this.value)}}>
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
            <label for="tam">Tamano fuente</label>
            <input type="range" id="tam" min="10" max="80" step="5" value="1" onChange={cambioTam(this.value)}></input>
            <button className="dibujar" onClick={escribe()}><span className="material-symbols-outlined">
                edit_square
                </span></button>
        </div>
        </div>
        <div class="opcion op3">
            <div class="conf">
            <label for="tam">Color fondo</label>
            <input type="color" onchange={fondo(this.value)}></input>
            <button onclick={restaurar()}>Restaurar</button>
        </div>
        </div>
        <div class="opcion op4">
            <div class="conf">
                <label for="tam">Area de borrado</label>
                <input type="range" min="5" max="50" step="5" value="5" onchange={cambiarTamBorrador(this.value)}></input>
            <button onclick={seleccionarArea()}>Seleccionar area</button>
            <button onclick={borrar()}>Borrar</button>
            <button onclick={limpiar()}>Limpiar</button>
        </div>
        </div>
        <div class="opcion op5">
            <div class="conf">
                <label for="tam">Color de relleno</label>
                <input type="color" onchange={relleno(this.value)}></input>
                <label for="tam">Color borde</label>
                <input type="color" onchange={borde(this.value)}></input>
            </div>
            <div class="flexi">
                <button onclick={dibujar()}>
                    <span class="material-symbols-outlined">
                        waves
                        </span>
                </button>
                <button value="linea" onclick={crearFigura(this.value)}><span class="material-symbols-outlined">
                    check_indeterminate_small
                    </span></button>
                <button value="circulo" onclick={crearFigura(this.value)}><span class="material-symbols-outlined">
                    circle
                    </span></button>
                <button value="rectangulo" onclick={crearFigura(this.value)}><span class="material-symbols-outlined">
                    rectangle
                    </span></button>
                <button value="triangulo" onclick={crearFigura(this.value)}><span class="material-symbols-outlined">
                    change_history
                    </span></button>

                    
                    
                </div>
                </div>
                <div class="opcion op6">
            <input type="file" onchange={subirImg} accept="image/*" class="upload"></input>
        </div>

                

       
        </div>
    )
}