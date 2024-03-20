import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import { Box,Image } from '@chakra-ui/react'

const FeedPost = ({post}) => {
console.log(post)
  return (
    <div>
      <PostHeader username ={post.username} avatar={'something'} />
      
        <Box my={2} borderRadius={4} overflow={"hidden"}  >
            <Image src ={post.imageURL} alt  ='user pic'  />
        </Box>

      <PostFooter  username ={"username"} isProfilePage={false}  />
    </div>
  )
}

export default FeedPost
