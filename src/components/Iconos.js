import { useState } from "react";

export const Iconos =({setConfi})=>{
    let [desplegado, setDesplegado] = useState();

    const mostrarOpcion =(opcion)=>{
        if(desplegado){
          document.querySelector(desplegado).style.display = "none";
        }
        document.querySelector(opcion).style.display = "block";
        setDesplegado(opcion);
        document.querySelector(".desplegar").style.display = "block";
    }

    const sinOpcion=()=>{
        document.querySelector(".desplegar").style.display = "none";
        document.querySelector(desplegado).style.display = "none";
    }

    return(
        <div className="iconos">
        <button onClick={()=>{mostrarOpcion(".op1")}}><span class="material-symbols-outlined">
        edit
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op2")}}><span class="material-symbols-outlined">
        title
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op3")}}><span class="material-symbols-outlined">
            format_color_fill
            </span></button>
        <button onClick={()=>{mostrarOpcion(".op4")}}><span class="material-symbols-outlined">
            delete_forever
            </span></button>
        <button onClick={()=>{mostrarOpcion(".op5")}}><span class="material-symbols-outlined">
        interests
        </span></button>
        <button onClick={()=>{mostrarOpcion(".op6")}}><span class="material-symbols-outlined">
            add_photo_alternate
            </span></button>
            <button onClick={()=>{setConfi(true)}}><span class="material-symbols-outlined">
                settings
            </span></button>
            <button>
                <span class="material-symbols-outlined">
                    help
                </span>
            </button>
            <button className="desplegar" onClick={sinOpcion}>
                <span class="material-symbols-outlined">
                    arrow_back_ios
                    </span>
            </button>

    </div>
    )
}