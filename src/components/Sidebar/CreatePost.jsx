import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import {BsFillImageFill} from "react-icons/bs";
import { CreatePostLogo } from '../../assets/constants';
import { useRef, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import useCreatePost from '../../hooks/useCreatePost';

const CreatePost = () => {
    
    const [caption, setCaption] = useState("");
	
	const {isLoading,handleCreatePost} = useCreatePost();


    const imageRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {selectedImg,setSelectedImg,handleSelectImg} = usePreviewImg();

	const handlePostCreation = async () =>{

		await handleCreatePost(selectedImg,caption);
		onClose();
		setCaption("");
		setSelectedImg(null);

	}
   

  return (
    <>
      <Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder='Post caption...'
							value={caption}
							onChange={(e) => setCaption(e.target.value)}
						/>

						<Input type='file' hidden ref={imageRef} onChange={handleSelectImg} />

						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
						{selectedImg && (
							<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
								<Image src={selectedImg} alt='Selected img' />
								<CloseButton
									position={"absolute"}
									top={2}
									right={2}
									onClick={() => {
										setSelectedImg(null);
									}}
								/>
							</Flex>
						)}
					</ModalBody>

					<ModalFooter>
						<Button mr={3} isLoading={isLoading} onClick={handlePostCreation} >
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    </>
  )
}

export default CreatePost
