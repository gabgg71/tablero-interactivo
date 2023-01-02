import { useState, useRef, useEffect } from "react";
import { createCanvas, loadImage } from 'canvas';


export const Opciones = () => {
 /* const canvas = document.getElementById('myCanvas');
  const ctx = canvasRef.current.getContext('2d');*/
  const canvasRef = useRef(null);
  const textoRef = useRef(null);
  const ctxRef = useRef(null);

  let [desplegado, setDesplegado] = useState();
  let figuraSel = undefined;
  let [currentColor, setCurrent] = useState("black")
  let [color_fondo, setFondo] = useState("white")
  //let color_fondo = "white"
  let color_opcional = undefined
  let relleno = color_fondo
  let limite = window.innerHeight * 0.96;
  let borde = currentColor
  //texto
  let [fuente, setFuente] = useState("Arial");
  let tamano =10

  let sizeBorrador = 5;
  let ix, iy, fx, fy, maxfx = 0, maxfy = 0, minfx = 1000000, minfy = 1000000;

  let isDrawing = false;
  let borrador = false;
  let figuras = false;
  let escribir = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    // For supporting computers with higher screen densities, we double the screen density
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Setting the context to enable us draw
    const ctx = canvasRef.current.getContext('2d');
    ctxRef.current = ctx;
    ctxRef.current.lineWidth = 1;
  }, []);


  const bajar =(e)=>{
    console.log('MOUSE')
    if (!borrador) {
      if (escribir) {
        textoRef.current.style.left = e.clientX + "px";
        textoRef.current.style.top = e.clientY + "px";
        textoRef.current.value = ""
        textoRef.current.style.display = "block";
      } else {
        if (figuraSel) {
          figuras = true;
          //funcionalidad[3] = true;
          ix = e.clientX;
          iy = e.clientY;
          ctxRef.current.strokeStyle = borde;
          ctxRef.current.fillStyle = relleno;
          console.log(`establezo borde ${borde} y relleno ${relleno}`)
        }else{
          ctxRef.current.strokeStyle = currentColor;
        }
        isDrawing = true;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.clientX, e.clientY);
      }
    }

  }

  const mover=(e)=>{
    if (borrador) {
      ctxRef.current.fillStyle = color_fondo;
      console.log("color fondo: " + color_fondo)
      ctxRef.current.clearRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
      ctxRef.current.fillRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
    } else {
      if (isDrawing && figuras) {
        
        fx = e.clientX;
        fy = e.clientY;
        if (figuraSel === "rectangulo") {
          if (fx < maxfx && fy >= maxfy) {
            (fx < ix) ? (ctxRef.current.clearRect(minfx - 1, iy - 1, ix - minfx, fy - iy)) : (ctxRef.current.clearRect(ix - 1, iy - 1, maxfx - ix, fy - iy));
          } else if (fx >= maxfx && fy < maxfy) {
            (fx < ix) ? (ctxRef.current.clearRect(fx - ix, minfy - iy, ix, iy)) : (ctxRef.current.clearRect(ix - 1, minfy - 1, fx - ix, iy))
          } else if (fx < maxfx && fy < maxfy) {
            enMinimizacion();
          }else if(fx > maxfx && fy > maxfy){
            ctxRef.current.clearRect(ix, iy, fx - ix, fy - iy);
          }
          validaMin();
          dibujarRectangulo();
        } else if (figuraSel === "circulo") {
          if (fx > maxfx) {
            maxfx = fx
          }
          if (fy > maxfy) {
            maxfy = fy
          }
          const radio = Math.sqrt((maxfx - ix) ** 2 + (maxfy - iy) ** 2)
          ctxRef.current.clearRect(ix - radio - 1, iy - radio - 1, 2 * radio + 2, 2 * radio + 2);
          dibujaCirculo();
        } else if (figuraSel === "triangulo") {
          validaMin();
          enMinimizacion();
          dibujarTriangulo();
        }
      }
      if (isDrawing && !figuras) {
        ctxRef.current.lineTo(e.clientX, e.clientY);
        ctxRef.current.stroke();
      }
    }
  }

  const subir=(e)=>{
    if (isDrawing && figuras) {
      fx = e.clientX;
      fy = e.clientY;
      if (figuraSel === "cuadrado") {
        dibujarRectangulo();
      } else if (figuraSel === "circulo") {
        dibujaCirculo();
      } else if (figuraSel === "rectangulo") {
        dibujarRectangulo();
      } else if (figuraSel === "triangulo") {
        dibujarTriangulo();
      } else if (figuraSel === "linea") {
        dibujarLinea();
      }
    }
    isDrawing = false;
    figuras = false;
    maxfx = 0
    maxfy = 0
    minfx = 1000000
    minfy = 1000000
  }

  const escribio = (e)=>{
    if (e.keyCode === 13) {
      let textoF = textoRef.current.value;
      let x = textoRef.current.style.left.slice(0, -2)
      let y = textoRef.current.style.top.slice(0, -2)
      ctxRef.current.fillStyle = currentColor;
      ctxRef.current.font = tamano + "px " + fuente;
      ctxRef.current.fillText(textoF, x, y);
      textoRef.current.style.display = "none";
    }

  }

  const cambios = (tipo, valor) => {
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
        ctxRef.current.lineWidth = valor;
        break;
      case "grosor-funcionalidad[2]":
        sizeBorrador = valor;
        break;
      case "fuente":
        fuente = valor;
        break;
      case "size-letra":
        tamano = valor;
        break;
      case "grosor-funcionalidad[2]":
        break;
      default:
        // Código a ejecutar si expression no es igual a ninguno de los valores anteriores
        break;
    }

  }

  const cambio =(e)=>{
    currentColor = e.target.value;
  }
  
  const cambioFuente=(e)=>{
    fuente = e.target.value;
  }

  const cambioTam=(e)=>{
    tamano = e.target.value;
  }

  const rellenar=(e)=>{
    relleno = e.target.value;

  }
  
  const bordear=(e)=>{
    borde = e.target.value;
    console.log("cambie borde")
  }

  const presiona = (e) => {
    ctxRef.current.lineWidth = e.target.value;
  }

  const cambiarTamBorrador = (e) => {
    sizeBorrador = e.target.value;
  }

  const crearFigura = (tipoFigura) => {
    borrador = false;
    escribir = false;
    figuras = true;
    figuraSel = tipoFigura;
    
  }

  const dibujar = () => {
    borrador = false;
    escribir = false;
    figuraSel = undefined;
  }

  const escribe = () => {
    escribir = true;
    borrador = false;
    figuraSel = undefined;
  }

  const borrar = () => {
    borrador = true;
  }


  const fondo = (e) => {
    color_opcional = e.target.value;
  }

  const aplicarFondo = () => {
    setFondo(color_opcional)
    //color_fondo = color_opcional;
    ctxRef.current.fillStyle = color_opcional;
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  

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



  const limpiar = () => {
    ctxRef.current.fillStyle = color_fondo;
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  const restaurar = () => {
    color_fondo = "white";
    ctxRef.current.fillStyle = color_fondo;
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    currentColor = "black"
    ctxRef.current.lineWidth = 1;
  }

  const enMinimizacion = () => {
    //inferior derecha
    if (ix < fx && iy < fy) {
      ctxRef.current.clearRect(ix - 1, iy - 1, maxfx-ix+2, maxfy-iy+2);
    } else if (ix < fx && iy > fy) {
      //superior derecha
      ctxRef.current.clearRect(ix - 1, minfy - 1, maxfx - ix + 2, iy - minfy + 2);
    } else if (ix > fx && iy < fy) {
      //inferior izquierda
      ctxRef.current.clearRect(minfx - 1, iy - 1, ix - minfx + 2, maxfy - iy + 2);
    } else {
      //superior izquierda
      ctxRef.current.clearRect(minfx - 1, minfy - 1, ix, iy);
    }
  }

  

  const validaMin = () => {
    if (fx < minfx) {
      minfx = fx
    }
    if (fy < minfy) {
      minfy = fy
    }
    if (fx > maxfx) {
      maxfx = fx
    }
    if (fy > maxfy) {
      maxfy = fy
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
          //desplazamiento y remocion de imagenes
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
          //mantener relacion de la imagen, pero no tam original
          let relacion = img.width/img.height;
          if(relacion>1){
            imagen.style.width = document.width*0.2+"px";
            imagen.style.height = document.width*0.2/relacion+"px";
          }
          else{
            imagen.style.width = document.height*0.2*relacion+"px";
            imagen.style.height = document.height*0.2+"px";
          }
          document.querySelector('body').appendChild(imagen);
        }
      };
      reader.readAsDataURL(archivos.files[0]);
    }
  }



  const dibujaCirculo = () => {
    ctxRef.current.beginPath();
    const radio = Math.sqrt((fx - ix) ** 2 + (fy - iy) ** 2);
    ctxRef.current.arc(ix, iy, radio, 0, 2 * Math.PI);
    ctxRef.current.fill();
    ctxRef.current.stroke();
  }

  const dibujarRectangulo = () => {
    ctxRef.current.beginPath();
    ctxRef.current.rect(ix, iy, fx - ix, fy - iy);
    ctxRef.current.fillRect(ix, iy, fx - ix, fy - iy);
    ctxRef.current.stroke();
  }
  const dibujarTriangulo = () => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(ix, iy);
    ctxRef.current.lineTo(fx, iy);
    ctxRef.current.lineTo((ix + fx) / 2, fy);
    ctxRef.current.fill();
    ctxRef.current.closePath();
    ctxRef.current.stroke();
  }

  const dibujarLinea = () => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(ix, iy);
    ctxRef.current.lineTo(fx, fy);
    ctxRef.current.closePath();
    ctxRef.current.stroke();
  }

  const seleccionarArea = () => {

  }

  const bajo =()=>{
    console.log("bajo")
  }



  return (
    <>
      <div className="opciones">
        <div className="opcion op1">
            <div className="conf">
                <label htmlFor="tam" className="color">Color</label>
                <input type="color" onChange={cambio}></input>
                <label htmlFor="tam">Ancho de linea</label>
                <input type="range" id="tam" min="1" max="50" step="5" onChange={presiona}></input>
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
            <input type="range" id="tam" min="10" max="80" step="5" onChange={cambioTam}></input>
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
            <button onClick={aplicarFondo}>Aplicar</button>
        </div>
        </div>
        <div className="opcion op4">
            <div className="conf">
                <label htmlFor="tam">Area de borrado</label>
                <input type="range" min="5" max="50" step="5" onChange={cambiarTamBorrador}></input>
            <button onClick={seleccionarArea}>Seleccionar area</button>
            <button onClick={borrar}>Borrar</button>
            <button onClick={limpiar}>Limpiar</button>
        </div>
        </div>
        <div className="opcion op5">
            <div className="conf">
                <label htmlFor="rell">Relleno</label>
                <input type="color" onChange={rellenar}></input>
                <label htmlFor="bor">Borde</label>
                <input type="color" onChange={bordear}></input>
            </div>
            <div className="flexi">
                <button onClick={dibujar}>
                    <span className="material-symbols-outlined">
                        waves
                        </span>
                </button>
                <button value="linea" onClick={()=>{crearFigura("linea")}}><span className="material-symbols-outlined">
                    check_indeterminate_small
                    </span></button>
                <button value="circulo" onClick={()=>{crearFigura("circulo")}}><span className="material-symbols-outlined">
                    circle
                    </span></button>
                <button value="rectangulo" onClick={()=>{crearFigura("rectangulo")}}><span className="material-symbols-outlined">
                    rectangle
                    </span></button>
                <button value="triangulo" onClick={()=>{crearFigura("triangulo")}}><span className="material-symbols-outlined">
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
            <button><span className="material-symbols-outlined">
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
      <canvas id="myCanvas" ref={canvasRef} onMouseDown={bajar} onMouseMove={mover} onMouseUp={subir}></canvas>
      <textarea class="texto" placeholder="Escribe aqui" onKeyDown={escribio} ref={textoRef}></textarea>
        
        <div class="basurita desplegar">
            <span class="material-symbols-outlined">
                delete_forever
                </span>
        </div>
     
    </>
  )
}