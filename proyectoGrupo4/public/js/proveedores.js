let tbodyTablaProveedores = undefined;
let editandoProveedor = false;
let modalProveedores = undefined;

document.addEventListener('DOMContentLoaded', async () => {
    modalProveedores = new bootstrap.Modal(document.getElementById('modalProveedores'));
    tbodyTablaProveedores = document.getElementById('proveedoresTablaTbody');
    await cargarTablaProveedores();

    document.getElementById('btn_nuevoProveedor').addEventListener('click', () => {
        mostrarModalCrearProveedor();
    });
    
    document.getElementById('btn_guardar').addEventListener('click', () => { // Gestion de si se hace un POST o un PUT
        if (editandoProveedor) {
            editarProveedor();
        } else {
            crearProveedor();
        }
    });
});

async function cargarTablaProveedores() {
    let response = await fetch('/api/proveedores');
    let proveedores = await response.json();
    tbodyTablaProveedores.innerHTML = '';
    proveedores.forEach(proveedor => {
        tbodyTablaProveedores.innerHTML += `
        <tr>
            <td>${proveedor.id}</td>
            <td>${proveedor.empresa}</td>
            <td>${proveedor.tipo_producto}</td>
            <td>${proveedor.nro_tel_princ}</td>
            <td>${proveedor.email}</td>
            <td>${proveedor.direccion}</td>
            <td>
                <div class="btn-group">
                    <button onclick="mostrarModalEditarProveedor(${proveedor.id})" class="btn btn-warning btn-sm">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button onclick="borrarProveedor(${proveedor.id})" class="btn btn-danger btn-sm">
                        <i class="bi bi-trash"></i> Eliminar
                    </button>
                </div>
            </td>
        </tr> `
    });
}

async function mostrarModalCrearProveedor() {
    document.getElementById('tituloModalProveedor').innerHTML = 'Nuevo Proveedor';
    editandoProveedor = false;

    // Vaciar valores y quitar estilo de fallo al validar
    document.getElementById('proveedorForm').reset();
    document.getElementById('proveedorID').value = '';
    document.getElementById('proveedorForm').classList.remove('was-validated');

    modalProveedores.show();
}

async function mostrarModalEditarProveedor(proveedorID) {
    document.getElementById('tituloModalProveedor').innerHTML = 'Editar Proveedor';
    editandoProveedor = true;

    // quitar estilo de fallo de anteriores usos
    document.getElementById('proveedorForm').classList.remove('was-validated');

    let response = await fetch(`/api/proveedores/${proveedorID}`)
    let proveedor = await response.json();

    document.getElementById('proveedorID').value = proveedor.id;
    document.getElementById('proveedorNombre').value = proveedor.empresa;
    document.getElementById('proveedorTipoProducto').value = proveedor.tipo_producto;
    document.getElementById('proveedorTelefono').value = proveedor.nro_tel_princ;
    document.getElementById('proveedorEmail').value = proveedor.email;
    document.getElementById('proveedorDireccion').value = proveedor.direccion;

    modalProveedores.show();
}

async function crearProveedor() {
    let form = document.getElementById('proveedorForm');
    if (!form.checkValidity()) { // Comprobar si los campos obligatorios si fueron rellenados
        form.classList.add('was-validated'); // Estilo de Bootstrap
        return;
    }

    let dataProveedores = {
        empresa: document.getElementById('proveedorNombre').value,
        tipo_producto: document.getElementById('proveedorTipoProducto').value,
        nro_tel_princ: document.getElementById('proveedorTelefono').value,
        email: document.getElementById('proveedorEmail').value,
        direccion: document.getElementById('proveedorDireccion').value
    };

    await fetch('/api/proveedores/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProveedores)
    });

    modalProveedores.hide();
    cargarTablaProveedores();
}

async function editarProveedor() {
    let form = document.getElementById('proveedorForm');
    if (!form.checkValidity()) { // Comprobar si los campos obligatorios si fueron rellenados
        form.classList.add('was-validated'); // Estilo de Bootstrap
        return;
    }

    let proveedorID = document.getElementById('proveedorID').value;
    let dataProveedores = {
        empresa: document.getElementById('proveedorNombre').value,
        tipo_producto: document.getElementById('proveedorTipoProducto').value,
        nro_tel_princ: document.getElementById('proveedorTelefono').value,
        email: document.getElementById('proveedorEmail').value,
        direccion: document.getElementById('proveedorDireccion').value
    };

    await fetch(`/api/proveedores/${proveedorID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataProveedores)
    });

    modalProveedores.hide();
    cargarTablaProveedores();
}

async function borrarProveedor(proveedorID) {
    await fetch(`/api/proveedores/${proveedorID}`, {
        method: 'DELETE'
    });
    cargarTablaProveedores();
}