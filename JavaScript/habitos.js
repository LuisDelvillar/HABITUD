console.log("JavaScript conectado correctamente");
const formulario = document.getElementById("formularioHabito");

if (formulario) {
    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        const nombre = document.getElementById("nombreHabito").value;
        console.log("Nombre del hábito:", nombre);

        const horarios = [];

        const diasSemana = [
            { nombre: "Lunes", clave: "lunes" },
            { nombre: "Martes", clave: "martes" },
            { nombre: "Miércoles", clave: "miercoles" },
            { nombre: "Jueves", clave: "jueves" },
            { nombre: "Viernes", clave: "viernes" },
            { nombre: "Sábado", clave: "sabado" },
            { nombre: "Domingo", clave: "domingo" }
        ];

        diasSemana.forEach(function(dia) {

            const seleccionado = document.querySelector(
                'input[name="' + dia.clave + '"]'
            ).checked;

            if (seleccionado) {

                const hora = document.querySelector(
                    'input[name="hora' + dia.clave.charAt(0).toUpperCase() + dia.clave.slice(1) + '"]'
                ).value;

                const duracion = document.querySelector(
                    'input[name="duracion' + dia.clave.charAt(0).toUpperCase() + dia.clave.slice(1) + '"]'
                ).value;

                horarios.push({
                    dia: dia.nombre,
                    hora: hora,
                    duracion: duracion
                });
            }
        });

        const dias = horarios.map(function(horario) {
            return horario.dia;
        });

        const nuevoHabito = {
            nombre: nombre,
            dias: dias,
            horarios: horarios
        };

        let listaHabitos = JSON.parse(localStorage.getItem("habitos")) || [];

        listaHabitos.push(nuevoHabito);

        localStorage.setItem("habitos", JSON.stringify(listaHabitos));


        console.log("Hábitos guardados:", listaHabitos);

        console.log("Días seleccionados:", dias);
        console.log("Programación del hábito:", horarios);
        console.log("Nuevo hábito:", nuevoHabito);

    });
}
const contenedorHabitos = document.getElementById("listaHabitos");

if (contenedorHabitos) {
    const habitosGuardados = JSON.parse(localStorage.getItem("habitos")) || [];
    const mensajeVacio = document.getElementById("mensajeVacio");
    const botonCrear = document.getElementById("botonCrear");

    if (habitosGuardados.length > 0) {
        mensajeVacio.style.display = "none";
        botonCrear.style.display = "none";
    }

    habitosGuardados.forEach(function(habito) {

        const elemento = document.createElement("div");

        const nombre = document.createElement("h3");
        nombre.textContent = habito.nombre;

        elemento.appendChild(nombre);


        const dias = document.createElement("p");

        dias.textContent = "Días: " + habito.dias.join(", ");

        elemento.appendChild(dias);

        const horarios = document.createElement("p");

        horarios.textContent = "Horario: " + habito.horarios.map(function(horario) {
            return horario.hora;
        }).join(", ");

        elemento.appendChild(horarios);

        const duracion = document.createElement("p");

        duracion.textContent = "Duración: " + habito.horarios.map(function(horario) {
            return horario.duracion + " minutos";
        }).join(", ");

        elemento.appendChild(duracion);

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        elemento.appendChild(botonEliminar);

        botonEliminar.addEventListener("click", function() {

            let habitosActualizados = JSON.parse(localStorage.getItem("habitos")) || [];

            habitosActualizados.splice(habitosGuardados.indexOf(habito), 1);

            localStorage.setItem("habitos", JSON.stringify(habitosActualizados));

            elemento.remove();

            if (habitosActualizados.length === 0) {
                mensajeVacio.style.display = "";
                botonCrear.style.display = "";
            }
        });

        contenedorHabitos.appendChild(elemento);
    });
}