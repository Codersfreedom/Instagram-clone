import { Avatar, Flex, Text } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const SuggestedHeader = () => {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
            <Flex alignItems={"center"} gap={2} >
                <Avatar src='/profilepic.png' name='Rakesh' size={"lg"} />
                <Text fontSize={12} fontWeight={'bold'}>
                    rakesh_
                </Text>
            </Flex>
            <ChakraLink
                as={RouterLink}
                to={"/auth"}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                cursor={"pointer"}
                _hover={{color:"white", textDecoration:"none"}}
                
            >
                Log out
            </ChakraLink>
        </Flex>
    )
}

export default SuggestedHeader
