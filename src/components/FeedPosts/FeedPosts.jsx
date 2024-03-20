import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'

import useGetPosts from '../../hooks/useGetPosts';


const FeedPosts = () => {


  const {isLoading,posts} = useGetPosts();


  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && [0, 1, 2, 3].map((_, idx) => (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} >
          <Flex gap={2} >
            <SkeletonCircle size={10} />
            <VStack>

              <Skeleton height={'10px'} w={'200px'} />
              <Skeleton height={'10px'} w={'200px'} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={"500px"}>contents wrapped</Box>
          </Skeleton>

        </VStack>

      ))}
      {!isLoading && posts.length>0 && posts.map((post) =>(
        <FeedPost key={post.id} post={post} />

      ))}


    </Container>
  )
}

export default FeedPosts
