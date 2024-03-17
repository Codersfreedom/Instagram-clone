import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore'


const ProfileHeader = () => {
    const {user} = useAuthStore();
    
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"flex-start"}
                mx={"auto"}
            >
                <Avatar name={user?.username} src={user?.profilePicURL} alt='profile picture' />

            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>

                    <Text fontSize={{ base: "sm", md: "lg" }}  > {user?.fullname}</Text>
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                        <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}>
                            Edit Profile
                        </Button>
                    </Flex>
                </Flex>
                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{base:"xs",md:"sm"}} >
                        <Text as='span' fontWeight={"bold"} mr={1} >{user?.posts.length} </Text>
                        Posts
                    </Text>
                    <Text fontSize={{base:"xs",md:"sm"}} >

                        <Text as='span' fontWeight={"bold"} mr={1} >{user?.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{base:"xs",md:"sm"}}>

                        <Text as='span' fontWeight={"bold"} mr={1} >{user?.following.length}</Text>
                        Following
                    </Text>

                </Flex>
                <Flex alignItems={"center"} gap={4} >
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                       {user?.username}
                    </Text>
                </Flex>
                <Text fontSize={"sm"} >
                    {user?.bio}
                </Text>
            </VStack>
        </Flex>
    )
}

export default ProfileHeader
