import React, {useState} from 'react'
import { PokemonInfoAPI, Result, Pokemon } from '../interfaces/IPokemon';
import { useFetch } from './useFetch';
import { useEffect } from 'react';

const usePokemon = () => {

    const {data, loading, error} = useFetch<PokemonInfoAPI>(`https://pokeapi.co/api/v2/pokemon/`);
    
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    
    

    const getPokemonList = () => {

        if (!data) return;
        const pokemonList = data.results;
        //get pokemon list url data
        const pokemonListUrl = pokemonList.map(pokemon => pokemon.url);
        
        //console.log(pokemonListUrl);

        Promise.all(pokemonListUrl.map(url => fetch(url).then(res => res.json()))).then(res => setPokemonList(res));
        
        //get pokemon data
        
        
        
    }

         

    useEffect(() => {
        getPokemonList();
        
    }, [data]);



  return {pokemonList, loading, error}
}

export default usePokemon