import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants';
import { useRef, useState } from 'react';
import usePostComment from '../../hooks/usePostComment';
import useAuthStore from '../../store/authStore';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../utils/TimeAgo';
import CommentsModal from '../modals/CommentsModal';

const PostFooter = ({ post, username, isProfilePage }) => {

  const { isLoading, handlePostComment } = usePostComment();
  const {likes,isLiked,likePost} = useLikePost(post);
  const {isOpen,onClose,onOpen} = useDisclosure();

  const { user } = useAuthStore();
  const [comments, setComments] = useState('');

  const commentRef = useRef();

  const handleCommentCreate = async () => {
    await handlePostComment(post.id, comments);
    setComments('');

  }

 

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4} >
        <Box onClick={likePost} cursor={"pointer"}>
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>
        <Box cursor={"pointer"} fontSize={"sm"} onClick={()=>commentRef.current.focus()} >
          <CommentLogo    />
        </Box>
      </Flex>
      <Text>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={12} color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700} >
            {username}_
            <Text as={"span"} fontWeight={400}  >
             {post.caption}
            </Text>
          </Text>
          {post.comments.length> 0 && (
            <Text fontSize={"sm"} color={"gray"} cursor={"pointer"} onClick={onOpen}>
            View all {post.comments.length} comments
          </Text>
          )}
            {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post ={post} />  }
        </>
      )}

      {user && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
          <InputGroup>
            <Input variant={"flushed"} ref={commentRef} placeholder='Add a comment...' fontSize={14} value={comments} onChange={(e) => setComments(e.target.value)} />
            <InputRightElement>
              <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{ color: "white" }} bg={"transparent"} isLoading={isLoading} onClick={handleCommentCreate} > Post </Button>


            </InputRightElement>

          </InputGroup>
        </Flex>
      )}

    </Box>
  )
}

export default PostFooter
