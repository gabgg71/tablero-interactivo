export const Confi =()=> {
    return (
        <div className="ventana setting">
        <button onClick={cerrarSetting()}>x</button>
        <p>Configuracion</p>
        <p>Mostrar trazado de figuras y sobreponerlas</p>
        <label>Para seleccionar el grosor</label>
        <select>
            <option>Slider</option>
            <option>Selector</option>
        </select>

    </div>
    )
}