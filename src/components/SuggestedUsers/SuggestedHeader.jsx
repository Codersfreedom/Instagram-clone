import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useLogout from '../../hooks/useLogout';

const SuggestedHeader = () => {

    const {logout} = useLogout();
    const {user,loading} = useAuthStore();

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} >
            <Flex alignItems={"center"} gap={2} >
                <ChakraLink as={RouterLink} to={`${user?.username}`} >
                <Avatar src={user?.profilePicURL || ""} name={user?.username} size={"lg"} />

                </ChakraLink>
                <Text fontSize={12} fontWeight={'bold'}>
                    {user?.username}
                </Text>
            </Flex>
            <Button
                size={"xs"}
                background={"transparent"}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                cursor={"pointer"}
                _hover={{color:"white"}}
                transition={"0.2s ease-in-out"}
                isLoading={loading}
                onClick={logout}
            >
                Log out
            </Button>
        </Flex>
    )
}

export default SuggestedHeader
