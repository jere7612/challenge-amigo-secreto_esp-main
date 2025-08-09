const amigos = [];
const elementos = {
    input: document.getElementById('amigo'),
    btnAgregar: document.getElementById('btnAgregar'),
    lista: document.getElementById('listaAmigos'),
    resultado: document.getElementById('resultado'),
    btnSortear: document.getElementById('btnSortear'),
    errorContainer: document.getElementById('errorContainer')
};

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    elementos.errorContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
    setTimeout(() => {
        elementos.errorContainer.innerHTML = '';
    }, 3000);
}

// Función para agregar amigo
function agregarAmigo() {
    const nombre = elementos.input.value.trim();
    
    // Validaciones
    if (!nombre) {
        mostrarError('Por favor ingresa un nombre válido');
        return;
    }
    
    if (amigos.includes(nombre)) {
        mostrarError('Este nombre ya está en la lista');
        return;
    }
    
    // Agregar a la lista
    amigos.push(nombre);
    elementos.input.value = '';
    actualizarLista();
}

// Función para actualizar la lista visual
function actualizarLista() {
    elementos.lista.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.className = 'name-item';
        li.innerHTML = `
            <span>${amigo}</span>
            <button class="delete-button" data-index="${index}">Eliminar</button>
        `;
        elementos.lista.appendChild(li);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.delete-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            eliminarAmigo(index);
        });
    });
}

// Función para eliminar amigo
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

// Función para sortear amigo secreto
function sortearAmigo() {
    if (amigos.length === 0) {
        mostrarError('No hay amigos en la lista para sortear');
        return;
    }
    
    // Animación de sorteo
    let contador = 0;
    const intervalo = setInterval(() => {
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        elementos.resultado.textContent = `Sorteando... ${amigos[indiceAleatorio]}`;
        
        if (++contador > 10) {
            clearInterval(intervalo);
            const ganador = amigos[Math.floor(Math.random() * amigos.length)];
            elementos.resultado.innerHTML = `
                ¡El amigo secreto es:<br>
                <span style="font-size: 1.5rem;">${ganador}</span>!
            `;
        }
    }, 100);
}

// Event Listeners
elementos.btnAgregar.addEventListener('click', agregarAmigo);
elementos.btnSortear.addEventListener('click', sortearAmigo);
elementos.input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarAmigo();
});
