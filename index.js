import express from "express";
import {simpleRandom}  from "./src/utils/randomNumber.js";
import { pokemons } from "./src/utils/pokemon.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 300;

app.get('/',(req, res) => {res.send('wololo')})
app.get('/random', async (req, res) => {
    const randomNumber = await simpleRandom()
    res.send(`Random number : ${randomNumber}`)})

app.get('/random2', async (req, res) => {
    try{
        const randomNumber = await simpleRandom();
        res.json(randomNumber)
    } catch {
        res.status(500).send('Erreur serveur')
    }
})
app.get('/pokemons/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const pokemon = pokemons.find(pokemon => pokemon.id === id);
        if (!pokemon){
            throw new Error ("Le pokemon recheché n'existe pas");
        } else {
            const pokemonInfo = {
                nom: pokemon.name,
                type: pokemon.types
            };
            res.json(pokemonInfo);
        }
    } catch (error) {
        res.status(404).send('Erreur : ' + error.message)
    }
});

app.listen(port, () =>{
    console.log("serveur allumé sur le port 3001")
})
