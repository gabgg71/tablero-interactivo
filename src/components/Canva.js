import { useState, useRef, useEffect } from "react";
export const Canva = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const textoRef = useRef(null);
  const basuritaRef = useRef(null);
  let [desplegado, setDesplegado] = useState();
  let [currentColor, setCurrent] = useState("black")
  let [color_fondo, setFondo] = useState("white")
  let [relleno, setRelleno] = useState(color_fondo);
  let [borde, setBorde] = useState(currentColor);
  let [forma, setForma] = useState("1")
  let [fuente, setFuente] = useState("Arial");
  let [colorTexto, setColorT] = useState(currentColor);
  let [tamano, setTamano] = useState(10);
  let [sizeBorrador, setSizeB] = useState(5);
  let figuraSel = undefined;
  let color_opcional = undefined
  let limite = window.innerHeight * 0.96;
  const tams = [5,10,15,20,25,30,35,40,45,50];
  let ix, iy, fx, fy, maxfx = 0, maxfy = 0, minfx = 1000000, minfy = 1000000;
  let isDrawing = false;
  let borrador = false;
  let figuras = false;
  let escribir = false;
  let resizing = false;
  let imgSelec = undefined;
  let sobreponer = true;
  let seleccionBorrar = false;
  let seleccionAct = false;
  let opor =false;
  let seleccionado = document.querySelector(".seleccion")

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvasRef.current.getContext('2d');
    ctxRef.current = ctx;
    ctxRef.current.lineWidth = 1;
    seleccionado = document.querySelector(".seleccion")
    const redimensionar = () => {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
    window.addEventListener('resize', redimensionar);
    return () => window.removeEventListener('resize', redimensionar);
  }, []);



  const bajar =(e)=>{
    if(seleccionAct){
      seleccionado.style.left = e.clientX + "px";
      seleccionado.style.top = e.clientY + "px";
      seleccionado.style.width = 50 + "px";
      seleccionado.style.height = 50 + "px";
      seleccionBorrar = true;
      document.querySelector(".seleccion").style.display = "block";
    }else if (!borrador) {
      if (escribir) {
        textoRef.current.style.left = e.clientX + "px";
        textoRef.current.style.top = e.clientY + "px";
        textoRef.current.value = ""
        textoRef.current.style.display = "block";
      } else {
        if (figuraSel) {
          figuras = true;
          ix = e.clientX;
          iy = e.clientY;
          ctxRef.current.strokeStyle = borde;
          ctxRef.current.fillStyle = relleno;
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
    if(resizing){
      const deltaX = e.clientX - imgSelec.offsetLeft;
      const deltaY = e.clientY - imgSelec.offsetTop;
      if(imgSelec.offsetLeft +deltaX < canvasRef.current.width && imgSelec.offsetTop +deltaY < canvasRef.current.height){
        imgSelec.style.width = `${deltaX}px`;
        imgSelec.style.height = `${deltaY}px`;
      }
    }
    if (borrador) {
      ctxRef.current.fillStyle = color_fondo;
      ctxRef.current.clearRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
      ctxRef.current.fillRect(e.clientX, e.clientY, sizeBorrador, sizeBorrador);
    } else {
      if (isDrawing && figuras && sobreponer) {
        ctxRef.current.fillStyle = color_fondo;
        fx = e.clientX;
        fy = e.clientY;
        if (figuraSel === "rectangulo") {

          if (fx < maxfx && fy >= maxfy) {
            if(fx < ix){
              ctxRef.current.clearRect(minfx - 1, iy - 1, ix - minfx, fy - iy)
              ctxRef.current.fillRect(minfx - 1, iy - 1, ix - minfx, fy - iy);
            }else{
              ctxRef.current.clearRect(ix - 1, iy - 1, maxfx - ix, fy - iy)
              ctxRef.current.fillRect(ix - 1, iy - 1, maxfx - ix, fy - iy);
            }
          } else if (fx >= maxfx && fy < maxfy) {
            if(fx < ix){
              ctxRef.current.clearRect(fx - ix, minfy - iy, ix, iy)
              ctxRef.current.fillRect(fx - ix, minfy - iy, ix, iy);
            }else{
              ctxRef.current.clearRect(ix - 1, minfy - 1, fx - ix, iy)
              ctxRef.current.fillRect(ix - 1, minfy - 1, fx - ix, iy);
            }
          } else if (fx < maxfx && fy < maxfy) {
            enMinimizacion();
          }else if(fx > maxfx && fy > maxfy){
            ctxRef.current.clearRect(ix, iy, fx - ix, fy - iy);
            ctxRef.current.fillRect(ix, iy, fx - ix, fy - iy);
          }
          validaMin();
          ctxRef.current.fillStyle = relleno;
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
          ctxRef.current.fillRect(ix - radio - 1, iy - radio - 1, 2 * radio + 2, 2 * radio + 2);
          ctxRef.current.fillStyle = relleno;
          dibujaCirculo();
        } else if (figuraSel === "triangulo") {
          validaMin();
          enMinimizacion();
          ctxRef.current.fillStyle = relleno;
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
    resizing = false;
    imgSelec = undefined
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
      ctxRef.current.fillStyle = colorTexto;
      ctxRef.current.font = tamano + "px " + fuente;
      ctxRef.current.fillText(textoF, x, y);
      textoRef.current.style.display = "none";
    }

  }

  const crearFigura = (tipoFigura) => {
    borrador = false;
    escribir = false;
    figuras = true;
    figuraSel = tipoFigura;
    seleccionAct = false;
    
  }

  const dibujar = () => {
    borrador = false;
    escribir = false;
    figuraSel = undefined;
    seleccionAct = false;
  }

  const escribe = () => {
    escribir = true;
    borrador = false;
    figuraSel = undefined;
    seleccionAct = false;
  }


  const aplicarFondo = () => {
    setFondo(color_opcional)
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
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(imagen => imagen.remove());
  }

  const restaurar = () => {
    setFondo("white")
    setCurrent("black")
    setRelleno("white")
    setBorde("black")
    ctxRef.current.fillStyle = "white";
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(imagen => imagen.remove());
    ctxRef.current.lineWidth = 1;
  }

  const enMinimizacion = () => {
    //inferior derecha
    if (ix < fx && iy < fy) {
      ctxRef.current.clearRect(ix - 1, iy - 1, maxfx-ix+2, maxfy-iy+2);
      ctxRef.current.fillRect(ix - 1, iy - 1, maxfx-ix+2, maxfy-iy+2);
      
    } else if (ix < fx && iy > fy) {
      //superior derecha
      ctxRef.current.clearRect(ix - 1, minfy - 1, maxfx - ix + 2, iy - minfy + 2);
      ctxRef.current.fillRect(ix - 1, minfy - 1, maxfx - ix + 2, iy - minfy + 2);
    } else if (ix > fx && iy < fy) {
      //inferior izquierda
      ctxRef.current.clearRect(minfx - 1, iy - 1, ix - minfx + 2, maxfy - iy + 2);
      ctxRef.current.fillRect(minfx - 1, iy - 1, ix - minfx + 2, maxfy - iy + 2);
    } else {
      //superior izquierda
      ctxRef.current.clearRect(minfx - 1, minfy - 1, ix, iy);
      ctxRef.current.fillRect(minfx - 1, minfy - 1, ix, iy);
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
          imagen.style.left = "30%";
          imagen.style.top = "30%";    
          imagen.onmousedown = function(e){
            if(resizing){
              imagen.style.border = "none"
              resizing = false;
            }else{
              if (e.clientX > imagen.offsetWidth - 20) {
                imagen.style.border = "3px dashed blue";
                resizing = true;
                imgSelec = imagen;
              }
            }
          }   
          
          imagen.ondragstart = function() {
            imagen.style.border = "3px dashed green";
            resizing = false;
            document.querySelector(".basurita").style.display = "block";
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
            imagen.style.width = canvasRef.current.width*0.2+"px";
            imagen.style.height =canvasRef.current.width*0.2/relacion+"px";
          }
          else{
            imagen.style.width = canvasRef.current.height*0.2*relacion+"px";
            imagen.style.height = canvasRef.current.height*0.2+"px";
          }
          document.querySelector('body').appendChild(imagen);
        }
      };
      reader.readAsDataURL(archivos.files[0]);
    }
  }

  const redimension =(e)=>{
    if(seleccionBorrar){
      if(opor){
        document.querySelector(".opc").style.display="none";
        opor = false;
      }
      seleccionado.style.width = e.clientX - seleccionado.offsetLeft+"px";
      seleccionado.style.height = e.clientY - seleccionado.offsetTop+"px";
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

  const borraSeleccion=()=>{
    ctxRef.current.fillStyle = color_fondo;
    ctxRef.current.clearRect(seleccionado.offsetLeft, seleccionado.offsetTop, seleccionado.offsetWidth, seleccionado.offsetHeight);
    ctxRef.current.fillRect(seleccionado.offsetLeft, seleccionado.offsetTop, seleccionado.offsetWidth, seleccionado.offsetHeight);
    document.querySelector(".seleccion").style.display = "none";
  }



  return (
    <>
      <div className="opciones">
        <div className="opcion op1">
            <div className="conf">
                <label htmlFor="tam" className="color">Color</label>
                <input type="color" onChange={(e)=>{setCurrent(e.target.value)}}></input>
                <label htmlFor="tam">Ancho de linea</label>
                {forma ==="1" && <input type="range" id="tam" min="1" max="50" step="5" onChange={(e)=>{ctxRef.current.lineWidth = e.target.value;}}></input>
                ||<select onChange={(e)=>{ctxRef.current.lineWidth = e.target.value;}}>
                {tams.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>}
                
                <button value=".op1" onClick={dibujar}><span className="material-symbols-outlined">
                    draw
                    </span></button>
            </div>
        </div>
        <div className="opcion op2">
            <div className="conf">
            <label htmlFor="tam">Fuente</label>
            <select id="tam" onChange={(e)=>{setFuente(e.target.value)}}>
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
            <label htmlFor="tam" className="color">Color</label>
            <input type="color" onChange={(e)=>{setColorT(e.target.value)}}></input>
            <label htmlFor="tam">Tamano fuente</label>

            {forma === "1" &&
            <input type="range" id="tam" min="10" max="80" step="5" onChange={(e)=>{setTamano(e.target.value)}}></input>
            ||<select onChange={(e)=>{ctxRef.current.lineWidth = e.target.value;}}>
            {tams.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>}
            <button className="dibujar" onClick={escribe}><span className="material-symbols-outlined">
                edit_square
                </span></button>
        </div>
        </div>
        <div className="opcion op3">
            <div className="conf">
            <label htmlFor="tam">Color fondo</label>
            <input type="color" onChange={(e)=>{color_opcional = e.target.value;}}></input>
            <button onClick={restaurar}>Restaurar</button>
            <button onClick={aplicarFondo}>Aplicar</button>
        </div>
        </div>
        <div className="opcion op4">
            <div className="conf">
                <label htmlFor="tam">Area de borrado</label>
                {forma ==="1" &&
                <input type="range" min="5" max="50" step="5" onChange={(e)=>{setSizeB(e.target.value)}}></input>
                ||<select onChange={(e)=>{ctxRef.current.lineWidth = e.target.value;}}>
                {tams.map(option => (
                  <option key={option}>{option}</option>
                ))}
              </select>}
            
            <button onClick={()=>{borrador = true}}>Borrar</button>
            <button onClick={()=>{seleccionAct = true;}}>Seleccionar area</button>
            <button onClick={limpiar}>Limpiar</button>
        </div>
        </div>
        <div className="opcion op5">
            <div className="conf">
                <label htmlFor="rell">Relleno</label>
                <input type="color" onChange={(e)=>{setRelleno(e.target.value)}}></input>
                <label htmlFor="bor">Borde</label>
                <input type="color" onChange={(e)=>{setBorde(e.target.value)}}></input>
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
            <button onClick={()=>{
              document.querySelector(".setting").style.display="block";
            }}><span className="material-symbols-outlined">
                settings
            </span></button>
            <button onClick={()=>{
              document.querySelector(".preguntas").style.display="block";
            }}>
                <span className="material-symbols-outlined">
                    help
                </span>
            </button>
            <button onClick={()=>{document.querySelector(".ventana-small").style.display="block";}}>
                <span className="material-symbols-outlined">
                    person
                    </span>
            </button>
            <button className="desplegar" onClick={sinOpcion}>
                <span className="material-symbols-outlined">
                    arrow_back_ios
                    </span>
            </button>

    </div>
    <div className="ventana setting">
        <button className="cerrar" onClick={()=>{document.querySelector(".setting").style.display="none";}}>x</button>
        <b>Configuración</b>
        <div className="conf-opc">
        <p>Menor área de redimensionamiento e invisibilidad de trazado</p>
        <input type="checkbox" class="my-checkbox" onChange={()=>{sobreponer = !sobreponer}} className="check"/>
        </div>
        <label>Para seleccionar el grosor:  </label>
        <select onChange={(e)=>{setForma(e.target.value)}}>
            <option value="1">Slider</option>
            <option value="2">Selector</option>
        </select>

    </div>

    <div className="ventana preguntas">
        <button className="cerrar" onClick={()=>{document.querySelector(".preguntas").style.display="none";}}>x</button>
        <b>Preguntas frecuentes</b>
        <p>¿Cómo redimensiono una imagen?</p>
        <p>Has click sobre la imagen y mueve el cursor, para parar has click de nuevo sobre la imagen</p>
        <p>¿Cómo desplazo una imagen?</p>
        <p>Manten presionada la imagen y mueve el cursor</p>
        <p>¿Cómo elimino una imagen?</p>
        <p>Desplaza la imagen hasta la parte inferior de la pantalla señalada en rojo</p>
        <p>¿Cómo hago para que al crear figuras y redimensionarlas no se borre lo que está en el área de mayor redimensionamiento alcanzado por la imagen?</p>
        <p>Ve a configuración y selecciona la opción "Menor área de redimensionamiento e invisibilidad de trazado"</p>
    </div>

    <div className="ventana-small">
        <button className="cerrar" onClick={()=>{document.querySelector(".ventana-small").style.display="none";}}>x</button>
        <b>Autor</b>
        <p>Gabriela Galindo</p>
    </div>
      <canvas id="myCanvas" ref={canvasRef} onMouseDown={bajar} onMouseMove={mover} onMouseUp={subir}></canvas>
      <textarea class="texto" placeholder="Escribe aqui" onKeyDown={escribio} ref={textoRef}></textarea>
      <div className="seleccion" onMouseDown={()=>{
        seleccionBorrar = true;
        opor = true;}} onMouseMove={redimension} onMouseUp={()=>{
        document.querySelector(".opc").style.display="block";
        seleccionBorrar = false}}>
      <div></div>
      <div className="opc">
        <button className="done" onClick={borraSeleccion}><span class="material-symbols-outlined">
done
</span></button>
<button className="descartar" onClick={()=>{
  document.querySelector(".seleccion").style.display="none";
}}><span class="material-symbols-outlined">
cancel
</span></button>
      </div>

      </div>
        
        <div class="basurita desplegar" ref={basuritaRef}>
            <span class="material-symbols-outlined">
                delete_forever
                </span>
        </div>
     
    </>
  )
}