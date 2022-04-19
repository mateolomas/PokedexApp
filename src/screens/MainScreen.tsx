import {
  Box,
  Center,
  Flex,
  Heading,
  ScrollView,
  Stack,
  Text,
  Wrap,
} from 'native-base';
import React, {useState} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import {useFetch} from '../hooks/useFetch';
import {PokemonInfoAPI, Result} from '../interfaces/IPokemon';
import usePokemon from '../hooks/usePokemon';
import {useNavigation} from '@react-navigation/native';
import PokemonDetailsScreen from './PokemonDetailsScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainScreen = () => {
  const {pokemonList, loading, error} = usePokemon();
  const navigation = useNavigation();
  if (loading) {
    return (
      <Center>
        <Text>Loading...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center>
        <Text>Error!</Text>
      </Center>
    );
  }

  return (
    <>
      <Box safeAreaTop>
        <Heading fontSize="4xl" ml={6}>
          Pokedex
        </Heading>
        <ScrollView padding={3} h={windowHeight}>
          <Flex flexWrap="wrap" flexDirection={'row'}>
            {pokemonList.map((pokemon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Details')}>
                <PokemonCard
                  name={pokemon.name}
                  type={pokemon.types}
                  sprite={pokemon.sprites.front_default}
                  color={'#00FF00'}
                />
              </TouchableOpacity>
            ))}
          </Flex>
        </ScrollView>
      </Box>
    </>
  );
};

export default MainScreen;
