
const pokemonsOl = document.getElementById('pokemons')
const loadMoreButton = document.getElementById('loadMore')
const maxRecords = 898
const limit = 12
let offset = 0;

    
function convertPokemonToLi(pokemon) {
    return `
   
    <li class="pokemon ${pokemon.type} modal">
        <span class="number">#${pokemon.numero}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}"
                alt="${pokemon.name}">
        </div>
     

    </li>
    
    `
}

function loadPokemonItens(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemonList = []) => {

        pokemonsOl.innerHTML += pokemonList.map(convertPokemonToLi).join('')
    
    }) //recebe o jsonBody convertido
}
loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
   
})

