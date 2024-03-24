import { Box, Grid, Skeleton, VStack } from '@chakra-ui/react'
import ProfilePost from './ProfilePost';
import NoPostsFound from './NoPostsFound';
import useGetPostByUserId from '../../hooks/useGetPostByUserId';


const ProfilePosts = () => {


  const {  posts,isLoading } = useGetPostByUserId();


  if (posts?.length == 0) return <NoPostsFound />


  return (
    <Grid
      templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
      gap={1} columnGap={1}
    >
      {isLoading && [0, 1, 2, 3, 4, 5].map((_, idx) => (
        <VStack key={idx} alignItems={"flex-start"} gap={4} >
          <Skeleton w={"full"} >
            <Box h={"300px"}  >
              content wrapped
            </Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && posts?.length > 0 && (
        <>

          {posts.map((post) =>

            <ProfilePost key={post.id} post={post} />
          )}

        </>

      )}


    </Grid>
  )
}

export default ProfilePosts
