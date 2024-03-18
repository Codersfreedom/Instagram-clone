import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import useFollowUser from '../../hooks/useFollowUser'


const SuggestedUser = ({user,setUser}) => {
    const {isFollowing,isLoading,handleFollowUser} = useFollowUser(user?.uid);
    
    const onFollowUser = async ()=>{

      await handleFollowUser();
      setUser({
        ...user,
        followers: isFollowing ? user.followers.filter((follower)=>follower.uid !== user.uid) : [...user.followers,user],
      })

    }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user?.profilePicURL} name={user?.fullname} size={'md'} />
        <VStack spacing={2} alignItems={"flex-start"}>
            <Box fontSize={12} fontWeight={"bold"} >
                {user?.fullname}

            </Box>
            <Box fontSize={11} color={"gray.500"}>
                {user?.followers.length} followers
            </Box>
        </VStack>
      </Flex>
      <Button
      fontSize={13}
      bg={"transparent"}
      p={0}
      h={"max-content"}
      fontWeight={"medium"}
      color={"blue.400"}
      cursor={"pointer"}
      _hover={{color:"white"}}
      isLoading={isLoading}
      onClick={onFollowUser}

      >
        {isFollowing ? "Unfollow":"Follow"}
      </Button>
    </Flex>
  )
}

export default SuggestedUser
