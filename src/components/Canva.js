import { useState } from "react";
import { Iconos } from "./Iconos"
import { Opciones } from "./Opciones"

const Canva =()=>{
    const canvas = document.getElementById('myCanvas');
    let [confi, setConfi] = useState(false);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineWidth = 1;
    return (
        <>
        <Opciones/>
        <Iconos setConfi={setConfi}/>
        <textarea class="texto" placeholder="Escribe aqui"></textarea>
        <canvas id="myCanvas"></canvas>
        <div class="basurita desplegar">
            <span class="material-symbols-outlined">
                delete_forever
                </span>
        </div>
        </>
    )
}