import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/TimeAgo'
import useFollowUser from '../../hooks/useFollowUser'


const PostHeader = ({ post, user }) => {
  const { isFollowing, isLoading, handleFollowUser } = useFollowUser(post.createdBy)



  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} width={"full"} my={2}>
      <Flex alignItems={"center"} gap={2} >
        {user ? (
          <Link to={`/${user.username}`}>
            <Avatar src={user.profilePicURL} size={"sm"} name={user.username} />

          </Link>

        ) : (
          <SkeletonCircle size={10} />
        )}

        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {user ? (
            <Link to={`/${user.username}`}>
              {user.username}

            </Link>

          ) : (
            <Skeleton w={"100px"} h={"10px"} />
          )

          }

          <Box color={"gray.500"} >
            {timeAgo(post.createdAt)}
          </Box>
        </Flex>

      </Flex>
      <Box cursor={"pointer"} >
       

          <Button fontSize={12} color={"blue.500"} bg={"transparent"} fontWeight={"bold"} _hover={{ color: "white" }} transition={"0.2s ease-in-out"} isLoading={isLoading} onClick={handleFollowUser}>
            {isFollowing ? "Unfollow" : "Follow"}

          </Button>

        

      </Box>
    </Flex>
  )
}

export default PostHeader
