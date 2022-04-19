import {
  Center,
  Box,
  AspectRatio,
  Text,
  Image,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
} from 'native-base';
import React from 'react';

import {SvgUri} from 'react-native-svg';
import {Type} from '../interfaces/IPokemon';
import {capitalize} from '../helpers/capitalize';

interface Props {
  name: string;
  type: Type[];
  sprite: string;
  color?: string;
}

const PokemonCard = ({name, type, sprite, color}: Props) => {
  return (
    <Box padding={1}>
      <Box w={175} h={140} shadow="4" rounded="lg" bg={color}>
        <Text
          color="white"
          fontSize="lg"
          fontWeight={700}
          paddingTop={3}
          paddingLeft={4}>
          {capitalize(name)}
        </Text>

        <Box flexDirection={'row'} marginLeft={3}>
          <Box>
            {type.map((type, index: number) => (
              <Box
                mb={1}
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
          <Box>
            <AspectRatio w="90%">
              <SvgUri width="100%" height="100%" uri={sprite} />
            </AspectRatio>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PokemonCard;
