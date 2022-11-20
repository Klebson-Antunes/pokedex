

const PokeApi = {}

function convetPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.numero = pokeDetail.id
  pokemon.base_experience = pokeDetail.base_experience
  pokemon.height = pokeDetail.height
  pokemon.weight =pokeDetail.weight

  
  const types =  pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  const stats = pokeDetail.stats.map((stats) => stats)
  
  const [stat] = stats
  pokemon.stats = stats

  pokemon.hp = stats[0].stat.name
  pokemon.baseStatHp = stats[0].base_stat

  pokemon.attack = stats[1].stat.name
  pokemon.baseStatAttack = stats[1].base_stat

  pokemon.defense = stats[2].stat.name
  pokemon.baseStatDefense = stats[2].base_stat

  pokemon.specialAttack = stats[3].stat.name
  pokemon.baseStatSpecialAttack = stats[3].base_stat

  pokemon.specialDefense = stats[4].stat.name
  pokemon.baseStatSpecialDefense = stats[4].base_stat

  pokemon.speed = stats[5].stat.name
  pokemon.baseStatSpeed = stats[5].base_stat
  
  
 
  
  
  
  
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

PokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convetPokeApiDetailToPokemon)
}

PokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  //fatch faz a requisição
  return fetch(url)      //caso sucesso(.then) chama a funcao para manipular  a resposta
    .then((response) => response.json()) //converte para json
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(PokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

