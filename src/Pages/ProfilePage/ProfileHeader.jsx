import { Avatar, AvatarGroup, Button, Flex, Text, VStack, useDisclosure } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore'
import useProfileStore from '../../store/UserProfileStore';
import EditProfile from './EditProfile';
import useFollowUser from '../../hooks/useFollowUser';



const ProfileHeader = () => {
    const { user } = useAuthStore();
    const { userProfile } = useProfileStore();
    const {isOpen,onOpen,onClose} = useDisclosure();
    const{isLoading,isFollowing,handleFollowUser} = useFollowUser(userProfile?.uid);

    const isOwnProfile = user && user.username === userProfile.username;
    const isAnotherProfile = user && user.username !== userProfile.username;

    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
            <AvatarGroup
                size={{ base: "xl", md: "2xl" }}
                justifySelf={"center"}
                alignSelf={"flex-start"}
                mx={"auto"}
            >
                <Avatar name={userProfile?.username} src={userProfile?.profilePicURL} alt='profile picture' />

            </AvatarGroup>
            <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
                {isOwnProfile && (
                    <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>

                        <Text fontSize={{ base: "sm", md: "lg" }}  > {userProfile?.fullname}</Text>
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}
                            onClick={onOpen}
                            >
                                Edit Profile
                            </Button>
                        </Flex>
                    </Flex>
                )}

                {isAnotherProfile && (
                    <Flex gap={4} direction={{ base: "column", sm: "row" }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={"center"} w={"full"}>

                        <Text fontSize={{ base: "sm", md: "lg" }}  > {userProfile?.fullname}</Text>
                        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                            <Button bg={"white"} color={"black"} _hover={{ bg: "whiteAlpha.800" }} size={{ base: "xs", md: "sm" }}
                            isLoading = {isLoading}
                            onClick={handleFollowUser}
                            >
                                {isFollowing ? "Unfollow":"Follow"}
                            </Button>
                        </Flex>
                    </Flex>
                )}


                <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
                    <Text fontSize={{ base: "xs", md: "sm" }} >
                        <Text as='span' fontWeight={"bold"} mr={1} >{userProfile?.posts.length} </Text>
                        Posts
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} >

                        <Text as='span' fontWeight={"bold"} mr={1} >{userProfile?.followers.length}</Text>
                        Followers
                    </Text>
                    <Text fontSize={{ base: "xs", md: "sm" }}>

                        <Text as='span' fontWeight={"bold"} mr={1} >{userProfile?.following.length}</Text>
                        Following
                    </Text>

                </Flex>
                <Flex alignItems={"center"} gap={4} >
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {userProfile?.username}
                    </Text>
                </Flex>
                <Text fontSize={"sm"} >
                    {userProfile?.bio}
                </Text>
            </VStack>
            {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
        </Flex>
    )
}

export default ProfileHeader
