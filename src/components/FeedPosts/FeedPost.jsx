import React, { useEffect } from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box,Flex,Image, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import useGetUsernameByPostId from '../../hooks/useGetUsernameByPostId'

const FeedPost = ({post}) => {



  const {user} = useGetUsernameByPostId(post?.createdBy);

  


  return (

    <>
     

      <PostHeader post={post} user ={user} />
      
      
        <Box my={2} borderRadius={4} overflow={"hidden"}  >
            <Image src ={post?.imageURL} alt  ='user pic'  />
        </Box>

      <PostFooter post={post}  username ={user?.username} isProfilePage={false}  />
    </>
  )
}



export default FeedPost
