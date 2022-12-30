import { useState } from "react";
//import { Confi } from "./Confi";
//import { Iconos } from "./Iconos"
//import { Opciones } from "./Opciones"
import { createCanvas }  from 'canvas';

export const Canva =()=>{
    //let [confi, setConfi] = useState(false);
    //<Iconos setConfi={setConfi}/>
    //{confi && <Confi setConfi={setConfi}/>}
    //<Opciones/>
const canvas = createCanvas(window.innerWidth,window.innerHeight)
const ctx = canvas.getContext('2d');
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)
/*canvas.width = window.innerWidth;
canvas.height = window.innerHeight;*/
ctx.lineWidth = 1;

let figuraSel = undefined;
let isDrawing = false;
let borrador= false;
let figuras = false;
let escribir = false;
let currentColor = "black"
let color_fondo = "white"
let relleno = color_fondo
let borde = currentColor
let fuente = "Arial";
let tamano = 10;
let sizeBorrador = 5;
let limite = canvas.height*0.96;
let desplegado = undefined
let ix, iy, fx, fy, maxfx=0, maxfy=0, minfx =1000000, minfy=1000000;
let texto = document.querySelector(".texto");


const cambios=(tipo, valor)=>{
  //color lapiz
  switch (tipo) {
    case "color-lapiz":
      currentColor = valor;
      break;
   /* case "color-texto":
      break;*/
    case "relleno-figura":
      relleno = valor;
      break;
    case "borde-figura":
      borde = valor;
      break;
    case "grosor-lapiz":
      ctx.lineWidth = valor;
      break;
    case "grosor-borrador":
      sizeBorrador = valor;
      break;
    case "fuente":
      fuente = valor;
      break;
    case "size-letra":
      tamano = valor;
      break;
    case "grosor-borrador":
      break;
    default:
      // Código a ejecutar si expression no es igual a ninguno de los valores anteriores
      break;
  }

}

const subirImg =(e)=>{
  let archivos = document.querySelector(".upload");
  document.querySelector(desplegado).style.display = "none";
  document.querySelector(".desplegar").style.display = "none";
  if (archivos.files && archivos.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let img = new Image();
      img.src = e.target.result;
      img.onload = function () {
        let imagen = document.createElement("img");
        imagen.src = img.src;
        imagen.classList.add("imagen");
        imagen.classList.add("centro");
       
        
        imagen.ondragstart = function() {
          imagen.style.border = "3px dashed green";
          document.querySelector(".basurita").style.display = "block";
          if(imagen.classList.contains("centro")){
            imagen.classList.remove("centro");
          }
        }
        imagen.ondrag= function(e){
          if (e.clientY+imagen.height > limite){
            imagen.remove()
          }else{
            imagen.style.left = e.clientX+"px";
            imagen.style.top = e.clientY+"px";
          }
        }
        imagen.ondragend= function(e) {
          imagen.style.left = e.clientX+"px";
          imagen.style.top = e.clientY+"px";
          imagen.style.border = "none";
          document.querySelector(".basurita").style.display = "none";
        }
        
        let relacion = img.width/img.height;
        if(relacion>1){
          //ctx.drawImage(img, canvas.width/2, canvas.height/2, canvas.width*0.2, canvas.width*0.2/relacion);}
          imagen.style.width = canvas.width*0.2+"px";
          imagen.style.height = canvas.width*0.2/relacion+"px";
        }
        else{
          imagen.style.width = canvas.height*0.2*relacion+"px";
          imagen.style.height = canvas.height*0.2+"px";
          //ctx.drawImage(img, canvas.width/2, canvas.height/2, canvas.height*0.2*relacion, canvas.height*0.2);
        }
        document.querySelector('body').appendChild(imagen);
        


       /* if(relacion>1){
          ctx.drawImage(img, canvas.width/2, canvas.height/2, canvas.width*0.2, canvas.width*0.2/relacion);}
        else{
          ctx.drawImage(img, canvas.width/2, canvas.height/2, canvas.height*0.2*relacion, canvas.height*0.2);
        }*/
        //ctx.drawImage(img, canvas.width/2, canvas.height/2, canvas.width*0.2, canvas.height*0.2);
      }
    };
    reader.readAsDataURL(archivos.files[0]);
  }



}

const cambio =(e)=>{
  currentColor = e.target.value;
}

const presiona=(e)=>{
  ctx.lineWidth = e.target;
}

const cambiarTamBorrador=(e) =>{
  sizeBorrador = e.target.value;
}


const cambioFuente=(e)=>{
  fuente = e.target.value;
}

const cambioTam=(e)=>{
  tamano = e.target.value;
}

const configuracion=()=>{
  document.querySelector(".setting").style.display = "block";

}

const sinOpcion=()=>{
  document.querySelector(".desplegar").style.display = "none";
  document.querySelector(desplegado).style.display = "none";
}

const mostrarOpcion =(opcion)=>{
  if(desplegado){
    document.querySelector(desplegado).style.display = "none";
  }
  document.querySelector(opcion).style.display = "block";
  desplegado = opcion;
  document.querySelector(".desplegar").style.display = "block";

}

const crearFigura =(tipoFigura)=>{
  borrador = false;
  escribir = false;
  figuras = true;
  figuraSel = tipoFigura;
}

const seleccionarArea=()=>{

}

const cerrarSetting=()=>{
}

const dibujar =()=>{
  borrador = false;
  escribir = false;
  figuraSel = undefined;
}

const escribe=()=>{
  escribir = true;
  borrador = false;
  figuraSel = undefined;
}

const borrar =()=>{
  borrador = true;
}

const fondo=(color)=>{
  color_fondo = color;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}




const limpiar =()=>{
  ctx.fillStyle = color_fondo;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const restaurar=()=>{
  color_fondo = "white";
  ctx.fillStyle = color_fondo;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  currentColor = "black"
  ctx.lineWidth = 1;
}

const enMinimizacion =()=>{
  //inferior derecha
  if(ix<fx && iy<fy){
    ctx.clearRect(ix-1, iy-1, maxfx, maxfy);
  }else if(ix<fx && iy>fy){
    //superior derecha
    ctx.clearRect(ix-1, minfy-1, maxfx-ix+2, iy-minfy+2);
  }else if(ix>fx && iy<fy){
    //inferior izquierda
    ctx.clearRect(minfx-1, iy-1, ix-minfx+2, maxfy-iy+2);
  }else{
    //superior izquierda
    ctx.clearRect(minfx-1, minfy-1, ix, iy);
  }
}

const validaMin = ()=>{
  if(fx< minfx){
    minfx = fx
  }
  if(fy< minfy){
    minfy = fy
  }
  if(fx>maxfx){
    maxfx = fx
  }
  if(fy>maxfy){
    maxfy = fy
  }

}




canvas.addEventListener('mousedown', (e) => {
    console.log("down");
  if(!borrador){
    if(escribir){
      texto.style.left = e.clientX+"px";
      texto.style.top = e.clientY+"px";
      texto.value = ""
      texto.style.display = "block";
    }else{
      if(figuraSel){
        figuras = true;
        ix = e.clientX;
        iy = e.clientY;
      }
    isDrawing = true;
    ctx.beginPath();
    ctx.strokeStyle = currentColor;
    ctx.moveTo(e.clientX, e.clientY);
    }
}}
);

canvas.addEventListener('mousemove', (e) => {
  if(borrador){
    ctx.fillStyle = color_fondo;
    ctx.clearRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
    ctx.fillRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
  }else{
    if (isDrawing && figuras) {
      fx = e.clientX;
      fy = e.clientY;
      if(figuraSel === "rectangulo"){
        if(fx< maxfx && fy>= maxfy){
          (fx < ix)?(ctx.clearRect(minfx-1, iy-1, ix-minfx, fy-iy)):(ctx.clearRect(ix-1, iy-1, maxfx-ix, fy-iy));
        }else if(fx>=maxfx && fy< maxfy){
          (fx < ix)?(ctx.clearRect(fx-ix, minfy-iy, ix, iy)):(ctx.clearRect(ix-1, minfy-1, fx-ix, iy))
        }else if(fx<maxfx && fy<maxfy){
          enMinimizacion();
        }
        validaMin();
        dibujaCuadrado();
      }else if(figuraSel === "circulo"){
        if(fx>maxfx){
            maxfx = fx
        }
        if(fy>maxfy){
            maxfy = fy
        }
        /*(fx>maxfx)?(maxfx = fx):(0);
        (fy>maxfy)?(maxfy = fy):(0);*/
        const radio = Math.sqrt((maxfx - ix) ** 2 + (maxfy - iy) ** 2)
        ctx.clearRect(ix-radio-1, iy-radio-1, 2*radio+2, 2*radio+2);
        dibujaCirculo();
      }else if(figuraSel === "triangulo"){
        validaMin();
        enMinimizacion();
        dibujarTriangulo();
      }
    }
    if(isDrawing && !figuras){
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    }
  }
});

/*texto.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    let textoF = texto.value;
    let x = texto.style.left.slice(0, -2)
    let y = texto.style.top.slice(0, -2)
    ctx.fillStyle = currentColor;
    ctx.font = tamano+"px "+fuente;
    ctx.fillText(textoF, x, y);
    texto.style.display = "none";
    }
});*/


canvas.addEventListener('mouseup', (e) => {
  if (isDrawing && figuras) {
    fx = e.clientX;
    fy = e.clientY;
    if(figuraSel === "cuadrado"){
      dibujaCuadrado();
    }else if(figuraSel === "circulo"){
      dibujaCirculo();
    }else if(figuraSel === "rectangulo"){
      dibujarRectangulo();
    }else if(figuraSel === "triangulo"){
      dibujarTriangulo();
    }else if(figuraSel === "linea"){
      dibujarLinea();
    }
  }
  isDrawing = false;
  figuras = false;
  maxfx=0 
  maxfy=0 
  minfx =1000000 
  minfy=1000000
});

const dibujaCuadrado =()=> {
  ctx.strokeRect(ix, iy, fx-ix, fy-iy);
}
const rellenar=()=>{

}

const bordear=()=>{
    
}
const dibujaCirculo =()=> {
  ctx.beginPath();
  const radio = Math.sqrt((fx - ix) ** 2 + (fy - iy) ** 2);
  ctx.arc(ix, iy, radio, 0, 2 * Math.PI);
  ctx.stroke();
}

const dibujarRectangulo =()=> {
  ctx.beginPath();
  ctx.rect(ix, iy, fx-ix, fy-iy);
  ctx.stroke();
}
const dibujarTriangulo=()=> {
  ctx.beginPath();
  ctx.moveTo(ix, iy);
  ctx.lineTo(fx, iy);
  ctx.lineTo((ix + fx) / 2, fy);
  ctx.closePath();
  ctx.stroke();
}

const dibujarLinea=()=> {
  ctx.beginPath();
  ctx.moveTo(ix, iy);
  ctx.lineTo(fx, fy);
  ctx.closePath();
  ctx.stroke();
}



    return (
        <>
        <div className="opciones">
        <div className="opcion op1">
            <div className="conf">
                <label htmlFor="tam" className="color">Color</label>
                <input type="color" onChange={cambio}></input>
                <label htmlFor="tam">Ancho de linea</label>
                <input type="range" id="tam" min="1" max="50" step="5" value="1" onChange={presiona}></input>
                <button value=".op1" onClick={dibujar}><span className="material-symbols-outlined">
                    draw
                    </span></button>
            </div>
        </div>
        <div className="opcion op2">
            <div className="conf">
            <label htmlFor="tam">Fuente</label>
            <select id="tam" onChange={cambioFuente}>
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
            <input type="range" id="tam" min="10" max="80" step="5" value="1" onChange={cambioTam}></input>
            <button className="dibujar" onClick={escribe}><span className="material-symbols-outlined">
                edit_square
                </span></button>
        </div>
        </div>
        <div className="opcion op3">
            <div className="conf">
            <label htmlFor="tam">Color fondo</label>
            <input type="color" onChange={fondo}></input>
            <button onClick={restaurar}>Restaurar</button>
        </div>
        </div>
        <div className="opcion op4">
            <div className="conf">
                <label htmlFor="tam">Area de borrado</label>
                <input type="range" min="5" max="50" step="5" value="5" onChange={cambiarTamBorrador}></input>
            <button onClick={seleccionarArea}>Seleccionar area</button>
            <button onClick={borrar}>Borrar</button>
            <button onClick={limpiar}>Limpiar</button>
        </div>
        </div>
        <div className="opcion op5">
            <div className="conf">
                <label htmlFor="tam">Color de relleno</label>
                <input type="color" onChange={rellenar}></input>
                <label htmlFor="tam">Color borde</label>
                <input type="color" onChange={bordear}></input>
            </div>
            <div className="flexi">
                <button onClick={dibujar}>
                    <span className="material-symbols-outlined">
                        waves
                        </span>
                </button>
                <button value="linea" onClick={crearFigura}><span className="material-symbols-outlined">
                    check_indeterminate_small
                    </span></button>
                <button value="circulo" onClick={crearFigura}><span className="material-symbols-outlined">
                    circle
                    </span></button>
                <button value="rectangulo" onClick={crearFigura}><span className="material-symbols-outlined">
                    rectangle
                    </span></button>
                <button value="triangulo" onClick={crearFigura}><span className="material-symbols-outlined">
                    change_history
                    </span></button>

                    
                    
                </div>

                

        </div>
        <div className="opcion op6">
            <input type="file" onChange={subirImg} accept="image/*" className="upload"></input>
        </div>
    </div>
    <div className="iconos">
        <button value=".op1" onClick={()=>{mostrarOpcion(".op1")}}><span className="material-symbols-outlined">
        edit
        </span></button>
        <button value=".op2" onClick={()=>{mostrarOpcion(".op2")}}><span className="material-symbols-outlined">
        title
        </span></button>
        <button value=".op3" onClick={()=>{mostrarOpcion(".op3")}}><span className="material-symbols-outlined">
            format_color_fill
            </span></button>
        <button value=".op4" onClick={()=>{mostrarOpcion(".op4")}}><span className="material-symbols-outlined">
            delete_forever
            </span></button>
        <button value=".op5" onClick={()=>{mostrarOpcion(".op5")}}><span className="material-symbols-outlined">
        interests
        </span></button>
        <button value=".op6" onClick={()=>{mostrarOpcion(".op6")}}><span className="material-symbols-outlined">
            add_photo_alternate
            </span></button>
            <button onClick={configuracion}><span className="material-symbols-outlined">
                settings
            </span></button>
            <button>
                <span className="material-symbols-outlined">
                    help
                </span>
            </button>
            <button className="desplegar" onClick={sinOpcion}>
                <span className="material-symbols-outlined">
                    arrow_back_ios
                    </span>
            </button>

    </div>
    <div className="ventana setting">
        <button onClick={cerrarSetting}>x</button>
        <p>Configuracion</p>
        <p>Mostrar trazado de figuras y sobreponerlas</p>
        <label>Para seleccionar el grosor</label>
        <select>
            <option>Slider</option>
            <option>Selector</option>
        </select>

    </div>
    <div className="ventana pregunta">
        <p>Como interpreto la barra de edicion</p>
        



    </div>
    <textarea className="texto" placeholder="Escribe aqui"></textarea>
    
    <div className="basurita desplegar">
        <span className="material-symbols-outlined">
            delete_forever
            </span>
    </div>
        
        </>
    )
}