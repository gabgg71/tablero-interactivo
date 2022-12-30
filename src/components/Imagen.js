export const Imagen=({limite}) => {
    let desplegado = undefined

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

    return (
        <div className="opcion op6">
        <input type="file" onChange={subirImg} accept="image/*" className="upload"></input>
        </div>
    )
}