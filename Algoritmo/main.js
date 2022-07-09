//clases
class Compra{
    constructor(producto, material, marca, linkFoto){

        this.producto = producto;
        this.material = material;
        this.marca = marca; 
        this.linkFoto = linkFoto;
    }
    



}
//Nombre del usuario que ingresara 
let nombreUsuario;

document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

function manejadorFormularioUsuario(eventoComprar){

    eventoComprar.preventDefault();
    nombreUsuario = document.getElementById("user").value;

    let listadoCompras = document.getElementById("listadoCompras");
    const compras = JSON.parse(localStorage.getItem(nombreUsuario));

    if(compras == null){
        listadoCompras.innerHTML = "<h2>No hay compras para mostrar</h2>"
    }else{
        mosrtarCompra(compras);
    }
    mosrtarPanel();
}

//Muestra en el storage y en pantalla la compra que el usuario hizo

function mosrtarCompra(compras){
    let listadoCompras = document.getElementById("listadoCompras")
    listadoCompras.innerHTML = "";

    compras.forEach(compra => {
        console.log(compra)
        let li = document.createElement("li")
        li.innerHTML = `<hr> ${compra.producto} - ${compra.material} - ${compra.marca} es la marca - <a href="${compra.linkFoto}" target="blank"> Ver trailer </a>`;
        const botonBorrar = document.createElement("button");
        botonBorrar.innerText = "Borrar";
        botonBorrar.addEventListener("click", () => {
            eliminarCompra(compra);
        })

        li.appendChild(botonBorrar);
        listadoCompras.appendChild(li);
        
    });

}

//Muestra en la pantalla y ademas escucha a la funcion "agregarCompra"

function mosrtarPanel(){


    const opciones = document.getElementById("opciones");

    opciones.innerHTML = `
        <h3> Bienvenido ${nombreUsuario}</h3>
        <form id="formulario-compra">
            <input type="text" id="producto" placeholder="Producto">
            <input type="text" id="material" placeholder="Material">
            <input type="text" id="marca" placeholder="Marca">
            <input type="text" id="linkFoto" placeholder="Link Foto">
            <button type="submit">Agregar Compra</button>
        </form>`;

    document.getElementById("formulario-compra").addEventListener("submit", agregarCompra);


}

//Agrega la compra a la array y la muestra en el locaStorage y en la pantalla
function agregarCompra(e){

    e.preventDefault();
    const producto = document.getElementById("producto").value;
    const material = document.getElementById("material").value;
    const marca = document.getElementById("marca").value;
    const linkFoto = document.getElementById("linkFoto").value;

    const compra = new Compra(producto, material, marca, linkFoto);

    const compraEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));

    if(compraEnLocalStorage == null){
        localStorage.setItem(nombreUsuario, JSON.stringify([compra]));
        mosrtarCompra([compra]);
    }else{
        compraEnLocalStorage.push(compra);
        localStorage.setItem(nombreUsuario, JSON.stringify(compraEnLocalStorage));
        mosrtarCompra(compraEnLocalStorage);
    }

    e.target.reset();

}

//Elimina la compra cuando se apreta el boton Borrar

function eliminarCompra(compra){

    const compraLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
    const newArray = compraLocalStorage.filter(item => item.producto != compra.producto);
    localStorage.setItem(nombreUsuario, JSON.stringify(newArray));
    mosrtarCompra(newArray);


}


