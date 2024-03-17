import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../../components/Comments/Comment'
import PostFooter from '../../components/FeedPosts/PostFooter'
const ProfilePost = ({ img }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                            <Text fontWeight={"bold"}  >7</Text>

                        </Flex>
                        <Flex alignItems={"center"} gap={1} >
                            <FaComment size={20} />
                            <Text fontWeight={"bold"}>10</Text>
                        </Flex>

                    </Flex>
                </Flex>
                <Image src={img} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
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
                        <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"} >
                            <Box
                                borderRadius={4}
                                overflow={"hidden"}
                                border={"1px solid"}
                                borderColor={"whtieAplha.300"}
                                flex={1.5}
                            >
                                <Image src={img} alt='profile post' />
                            </Box>
                            <Flex flex={1} flexDir={"column"} px={10} display={{ base: 'none', md: "flex" }} >
                                <Flex alignItems={"center"} justifyContent={"space-between"} >

                                    <Flex alignItems={"center"} justifyContent={"space-between"} >
                                        <Flex alignItems={"center"} gap={4}>

                                            <Avatar src='/profilepic.png' size={'sm'} name='rakesh' />
                                            <Text fontWeight={"bold"} fontSize={12} > Rakesh Manna</Text>

                                        </Flex>

                                    </Flex>
                                    <Box _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} >
                                        <MdDelete size={20} cursor={"pointer"} />
                                    </Box>
                                </Flex>
                                <Divider my={4} bg={"gray.500"} />
                                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflow={"auto"} >
                                    <Comment
                                        createdAt={"2d ago"}
                                        username={"rakesh"}
                                        profilePic={'/profilepic.png'}
                                        text={'Nice pic'}
                                    />
                                    <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                     <Comment
                                        createdAt={"12d ago"}
                                        username={"jane doe"}
                                        profilePic={'/image1.png'}
                                        text={'Cool pic'}
                                    />
                                    
                                </VStack>
                                <Divider my={4} bg={"gray.8000"} />
                                <PostFooter username={'rakesh'} isProfilePage ={true} />
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost
