


const pokemonsCard = document.getElementById('container')
const loadMoreButton = document.getElementById('loadMore')
const maxRecords = 1000

function buscarPokemon() {
    const numPokemon = document.getElementById('pesquisa').value
    const limit = 1
    let offset = numPokemon - 1;

    loadPokemonItens(offset, limit)
}

function convertPokemonToLi(pokemon) {
    return `
    <section id="card" class="${pokemon.type}">
        <div class="pokemon">
            <div id="identification">
                
                <h2 class="name">${pokemon.name}</h2>
                <h3 class="number">${pokemon.numero}</h3>
            </div>
            <div class="imagem">
                <img width="200" src="${pokemon.photo}" alt="${pokemon.name}">
               
            </div>
            <div class="estatisticas">
                <p>Height: ${pokemon.height} <span>(cm,mt)</span></p>
                <p>Weight: ${pokemon.weight} <span>(kg)</span></p>
            </div>
            <div class="types">
            ${pokemon.types.map((type) => `<div class="type ${type}">${type}</div>`).join('')}
            
            </div>
        </div>
        <div id="habilidades">
            <h4>Base stats:</h4>
            <ul class="stats">
                
                <li>${pokemon.hp}: ${pokemon.baseStatHp}</li>
                <li>${pokemon.attack}: ${pokemon.baseStatAttack}</li>
                <li>${pokemon.specialAttack}: ${pokemon.baseStatSpecialAttack}</li>
                <li>${pokemon.defense}: ${pokemon.baseStatDefense}</li>
                <li>${pokemon.specialDefense}: ${pokemon.baseStatSpecialDefense}</li>
                <li>${pokemon.speed}: ${pokemon.baseStatSpeed}</li>

            
            </ul>
        </div>
    </section>
    
    `
}

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemonList = []) => {

        pokemonsCard.innerHTML = pokemonList.map(convertPokemonToLi).join('')

    }) //recebe o jsonBody convertido
}

