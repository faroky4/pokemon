const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:1234@localhost/sequelize');
sequelize
    .authenticate()
    .then(() => {
         console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })


let heaviestPokemon = async function(){

    let heaviestQuery = `SELECT name, weight 
                        FROM pokemon 
                        WHERE weight = (SELECT MAX(weight) from pokemon)`;
    let heaviestPokemon = await sequelize.query(heaviestQuery);
    console.log(heaviestPokemon[0][0])
}

// heaviestPokemon()

let findByType = async function(type){

    let pokemonTypeQuery = `SELECT id 
                            FROM pokemon_type 
                            WHERE type = '${type}'`
    let pokemonTypeData =  await sequelize.query(pokemonTypeQuery);
    let pokemonTypeId = pokemonTypeData[0][0].id;

    let heaviestQuery = `SELECT name 
                        FROM pokemon 
                        WHERE pokeType_id = ${pokemonTypeId}`;
    let heaviestPokemon = await sequelize.query(heaviestQuery);

    heaviestPokemon[0].forEach(pokemon => {
        console.log(pokemon.name);
    })
}

//  findByType("grass")

let findOwners = async function(pokemonName){

    let trainersArray = [];
    let pokemonIdQuery = `SELECT id 
                        FROM pokemon 
                        WHERE name = '${pokemonName}'`
    let pokemonIdData =  await sequelize.query(pokemonIdQuery);
    let pokemonId = pokemonIdData[0][0].id;

    let trainerIdQuery = `SELECT trainerr_id 
                        FROM pokemon_trainer 
                        WHERE pokemon_id = ${pokemonId}`;
    let trainerId = await sequelize.query(trainerIdQuery);

    for(let trainer of trainerId[0]){
        let trainerNameQuery = `SELECT name 
                                FROM trainer 
                                WHERE id = ${trainer.trainerr_id}`;
        let trainerName = await sequelize.query(trainerNameQuery);
        trainersArray.push(trainerName[0][0].name)
    }

    trainersArray.forEach(trainer => {
        console.log(trainer);
    });
}

// findOwners("gengar")

let findRoster = async function(trainerName){

    let pokemonsArray = [];
    let trainerIdQuery = `SELECT id 
                        FROM trainer 
                        WHERE name = '${trainerName}'`
    let trainerIdData =  await sequelize.query(trainerIdQuery);
    let trainerId = trainerIdData[0][0].id;

    let pokemonIdQuery = `SELECT pokemon_id 
                        FROM pokemon_trainer 
                        WHERE trainerr_id = ${trainerId}`;
    let pokemonId = await sequelize.query(pokemonIdQuery);

    for(let pokemon of pokemonId[0]){
        let pokemonNamesQuery = `SELECT name 
                                FROM pokemon 
                                WHERE id = ${pokemon.pokemon_id}`;
        let pokemonName = await sequelize.query(pokemonNamesQuery);
        pokemonsArray.push(pokemonName[0][0].name)
    }

    pokemonsArray.forEach(pokemon => {
        console.log(pokemon);
    });
}

// findRoster("Loga")