import {
  Center,
  Box,
  Image,
  AspectRatio,
  Text,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
} from 'native-base';
import React from 'react';
import {Type} from '../interfaces/IPokemon';

interface Props {
  name: string;
  type: Type[];
  sprite: string;
  color?: string;
}

const PokemonCard = ({name, type, sprite, color}: Props) => {
  return (
    <Box padding={1}>
      <Box w={175} h={140} shadow="4" rounded="lg" bg="primary.400">
        <Text
          color="white"
          fontSize="lg"
          fontWeight={700}
          paddingTop={3}
          paddingLeft={4}>
          {name}
        </Text>

        <Box flexDirection={'row'} marginLeft={3} w={'100%'}>
          <Box>
            {type.map((type, index: number) => (
              <Box
                key={index}
                rounded={'lg'}
                justifyContent={'center'}
                alignItems={'center'}
                bgColor={'primary.100'}
                padding={1}>
                {type.type.name}
              </Box>
            ))}
          </Box>
          <Box ml={0} mt={-3}>
            <AspectRatio w="100%">
              <Image
                source={{uri: sprite}}
                alt="pokemon"
                width={125}
                height={125}
              />
            </AspectRatio>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PokemonCard;
