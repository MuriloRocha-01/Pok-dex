"use strict";

const namesearch = document.getElementById("name-search");
const btnsearch = document.getElementById("btn-search");
const namepoke = document.getElementById("name");
const imagePoke = document.getElementById("imagepoke");
const orderPoke = document.getElementById("order");
const naturezaPoke = document.getElementById("natureza");

btnsearch.addEventListener("click", verificarEntrada);

const pokeDefault = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
imagePoke.src = pokeDefault;




function verificarEntrada() {
    if (namesearch.value.trim() === "") {
        namepoke.innerHTML = "Digite o nome de pokémon. ☝️";
        imagePoke.src = pokeDefault;
        naturezaPoke.innerHTML = "";
        orderPoke.innerHTML = "";
        return;
    }

    buscarDadosPoke();
}



async function buscarDadosPoke() {

    const URLViaPokeApi = `https://pokeapi.co/api/v2/pokemon/${namesearch.value.toLowerCase()}`;

    try {
        const resposta = await fetch(URLViaPokeApi);

        if (!resposta.ok) {
            throw new Error("Erro na requisição HTTP.");
        }

        const dadosJSON = await resposta.json();
        mostrarPoke(dadosJSON);
        

    } catch (e) {
        namepoke.innerHTML = "Pokémon não encontrado ❌";
        imagePoke.src = pokeDefault;
        naturezaPoke.innerHTML = "";
        orderPoke.innerHTML = "";
    }
}


function mostrarPoke(objeto) {

   
    const gif =
        objeto.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default;

    imagePoke.src = gif || objeto.sprites.front_default || pokeDefault;
    imagePoke.alt = `imagem do ${objeto.name}`;

    namepoke.innerHTML = objeto.name;
    orderPoke.innerHTML = `Order: ${objeto.order}`;

    naturezaPoke.innerHTML = `Type: ${objeto.types
        .map(t => t.type.name)
        .join(", ")}`;

    namesearch.value = "";
}

