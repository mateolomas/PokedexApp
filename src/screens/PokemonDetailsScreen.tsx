import React, {useState} from 'react';
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Icon,
  Image,
  Progress,
  ScrollView,
  Slider,
  Text,
  View,
  VStack,
} from 'native-base';
import {RootStackParamList} from './MainScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {convertAbsoluteToRem} from 'native-base/lib/typescript/theme/tools';
import {SvgUri} from 'react-native-svg';
import {capitalize} from '../helpers/capitalize';
import {colors} from '../helpers/colors';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Details'> {}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PokemonDetailsScreen = ({route, navigation}: Props) => {
  const pokemon = route.params;

  const [about, setAbout] = useState(true);
  const [stats, setStats] = useState(false);

  return (
    <Box flex={1}>
      <Box
        safeArea
        flex={1.1}
        padding={3}
        bg={colors[pokemon.types[0].type.name]}
        rounded={1}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color={'white'} />
        </TouchableOpacity>
        <Heading color={'white'} size={'2xl'}>
          {capitalize(pokemon.name)}
        </Heading>
        <Box flexDirection={'row'}>
          {pokemon.types.map((type, index) => (
            <Box
              bgColor={'white'}
              rounded={'lg'}
              justifyContent={'center'}
              alignItems={'center'}
              padding={1}
              margin={1}
              key={index}>
              {type.type.name}
            </Box>
          ))}
        </Box>
        <ImageBackground
          source={require('../assets/pokeball.png')}
          style={{
            width: windowWidth * 0.6,
            height: windowWidth * 0.6,
            opacity: 0.1,
            right: -windowWidth * 0.5,
          }}></ImageBackground>
      </Box>

      <Box
        rounded={30}
        width={windowWidth}
        height={windowHeight / 1.7}
        bottom={0}
        position={'absolute'}
        bg={'white'}>
        <Box flexDirection={'row'} justifyContent={'space-evenly'} padding={25}>
          <TouchableOpacity
            onPress={() => {
              setAbout(true);
              setStats(false);
            }}>
            <Heading fontSize={'lg'}>About</Heading>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setAbout(false);
              setStats(true);
            }}>
            <Heading fontSize={'lg'}>Base stats</Heading>
          </TouchableOpacity>
        </Box>

        {about && (
          <Center w={'60%'}>
            <ScrollView>
              <Box w={'100%'} maxWidth={400}>
                <VStack space="md">
                  <Text>Full name: {pokemon.species.name}</Text>
                  <Text>Height: {pokemon.height}</Text>
                  <Text>Weight: {pokemon.weight}</Text>
                  <Box>
                    Abilities:
                    {pokemon.abilities.map((ability, index) => (
                      <Text key={index}>{ability.ability.name}</Text>
                    ))}
                  </Box>
                  <Text>Base experience: {pokemon.base_experience}</Text>
                  <Heading>Breeding</Heading>
                  {pokemon.types.map((type, index) => (
                    <Text key={index}>{type.type.name}</Text>
                  ))}
                  <Heading>Forms</Heading>
                  {pokemon.forms.map((form, index) => (
                    <Text key={index}>{form.name}</Text>
                  ))}
                </VStack>
              </Box>
            </ScrollView>
          </Center>
        )}

        {stats && (
          <Center w="100%">
            <Box w={'90%'} maxWidth={400}>
              <VStack mx={4} space={'md'}>
                {pokemon.stats.map((stat, index) => (
                  <Box key={index}>
                    <Text>
                      {capitalize(stat.stat.name)}: {stat.base_stat}
                    </Text>

                    <Progress
                      value={stat.base_stat}
                      mx={1}
                      size={'md'}
                      colorScheme={stat.base_stat > 50 ? 'green' : 'red'}
                    />
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box padding={5}>
              <Heading>Type defenses</Heading>
              <Text>
                The effectivisness of each type on {capitalize(pokemon.name)}
              </Text>
            </Box>
          </Center>
        )}
      </Box>

      <Box position={'absolute'} mt={150} ml={10} width={300} height={150}>
        <AspectRatio w="100%">
          <SvgUri
            width="100%"
            height="100%"
            uri={pokemon.sprites.other?.dream_world?.front_default!}
          />
        </AspectRatio>
      </Box>
    </Box>
  );
};

export default PokemonDetailsScreen;
