export const Iconos =({setConfi})=>{
    const mostrarOpcion =(opcion)=>{
        if(desplegado){
          document.querySelector(desplegado).style.display = "none";
        }
        document.querySelector(opcion).style.display = "block";
        desplegado = opcion;
        document.querySelector(".desplegar").style.display = "block";
    }

    return(
        <div className="iconos">
        <button onClick={()=>{mostrarOpcion(".op1")}}><span className="material-symbols-outlined">
        edit
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op2")}}><span className="material-symbols-outlined">
        title
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op3")}}><span className="material-symbols-outlined">
            format_color_fill
            </span></button>
        <button onClick={()=>{mostrarOpcion(".op4")}}><span className="material-symbols-outlined">
            delete_forever
            </span></button>
        <button onClick={()=>{mostrarOpcion(".op5")}}><span className="material-symbols-outlined">
        interests
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op6")}}><span className="material-symbols-outlined">
            add_photo_alternate
            </span></button>
            <button onClick={()=>{setConfi(true)}}><span className="material-symbols-outlined">
                settings
            </span></button>
            <button>
                <span className="material-symbols-outlined">
                    help
                </span>
            </button>
            <button className="desplegar" onClick={sinOpcion()}>
                <span className="material-symbols-outlined">
                    arrow_back_ios
                    </span>
            </button>

    </div>
    )
}