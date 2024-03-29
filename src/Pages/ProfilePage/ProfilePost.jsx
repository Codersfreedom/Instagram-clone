import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../../components/Comments/Comment'
import PostFooter from '../../components/FeedPosts/PostFooter'
import useProfileStore from '../../store/UserProfileStore'
import useAuthStore from '../../store/authStore'
import useDeletePost from '../../hooks/useDeletePost'
import { useEffect, useRef } from 'react'
const ProfilePost = ({ post }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userProfile } = useProfileStore();
    const { user } = useAuthStore();
    const commentBoxRef = useRef(null);

    const { isLoading, deletePost } = useDeletePost();

    const handleDeletePost = async () => {

        await deletePost(post.id)
        onClose();

    }


    useEffect(() => {
        const scrollToBottom = () => {
            commentBoxRef.current.scrollTop = commentBoxRef.current.scrollHeight;
        }
        if (isOpen) {
            setTimeout(() => {
                scrollToBottom()
            }, 100)
        }

    }, [isOpen, post.comments.length])


    return (
        <>

            <GridItem
                cursor={"pointer"}
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                position={"relative"}
                aspectRatio={1 / 1}
                onClick={onOpen}
            >
                <Flex
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    position={'absolute'}
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bg={"blackAlpha.700"}
                    transition={"all 0.3s ease"}
                    zIndex={1}
                    justifyContent={"center"}

                >
                    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
                        <Flex alignItems={"center"} gap={1} >
                            <AiFillHeart size={20} />
                            <Text fontWeight={"bold"}  >{post?.likes.length}</Text>

                        </Flex>
                        <Flex alignItems={"center"} gap={1} >
                            <FaComment size={20} />
                            <Text fontWeight={"bold"}>{post?.comments.length}</Text>
                        </Flex>

                    </Flex>
                </Flex>
                <Image src={post?.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
            </GridItem>

            {/* Modal here */}
            <Modal onClose={onClose} isOpen={isOpen}
                isCentered={true}
                size={{ base: "3xl", md: "5xl" }}
            >
                <ModalOverlay />
                <ModalContent>

                    <ModalCloseButton />
                    <ModalBody bg={"black"} pb={5} >
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}
                            maxH={"90vh"} minH={"50vh"}
                        >
                            <Flex
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whtieAplha.300"}
                                flex={1.5}
                                justifyContent={"center"}
                                alignItems={'center'}
                            >
                                <Image src={post?.imageURL} alt='profile post' />
                            </Flex>
                            <Flex flex={1} flexDir={"column"} px={10} display={{ base: 'none', md: "flex" }} >
                                <Flex alignItems={"center"} justifyContent={"space-between"} >

                                    <Flex alignItems={"center"} justifyContent={"space-between"} >
                                        <Flex alignItems={"center"} gap={4}>

                                            <Avatar src={userProfile?.profilePicURL} size={'sm'} name={userProfile?.fullname} />
                                            <Text fontWeight={"bold"} fontSize={12} > {userProfile?.fullname}</Text>

                                        </Flex>

                                    </Flex>
                                    {user?.uid === userProfile?.uid && (
                                        <Button size={"sm"} bg={"transparent"} _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} onClick={handleDeletePost} isLoading={isLoading} >
                                            <MdDelete size={20} cursor={"pointer"} />
                                        </Button>

                                    )}
                                </Flex>
                                <Divider my={4} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflow={"auto"} ref={commentBoxRef} >
                                    {post.comments.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}



                                </VStack>
                                <Divider my={4} bg={"gray.8000"} />
                                <PostFooter post={post} username={'rakesh'} isProfilePage={true} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter bg={"black"}>
                        <Button onClick={onClose} >Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost
