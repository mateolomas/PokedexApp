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
import {PokemonInfoAPI, Result, Pokemon} from '../interfaces/IPokemon';
import usePokemon from '../hooks/usePokemon';
import {useNavigation} from '@react-navigation/native';
import PokemonDetailsScreen from './PokemonDetailsScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {colors} from '../helpers/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export type RootStackParamList = {
  MainScreen: undefined;
  Details: Pokemon;
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'MainScreen'> {}

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
            {pokemonList.map((pokemon: Pokemon, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Details', pokemon)}>
                <PokemonCard
                  name={pokemon.name}
                  type={pokemon.types}
                  sprite={pokemon.sprites.other?.dream_world?.front_default}
                  color={colors[pokemon.types[0].type.name]}
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
