import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Comments/Comment";
import { useRef, useState } from "react";
import usePostComment from "../../hooks/usePostComment";

const CommentsModal = ({ isOpen, onClose,post }) => {
	const commentRef = useRef();
	const {isLoading,handlePostComment} = usePostComment();

	const handlePostCreation = async (e) =>{
		e.preventDefault();
		await handlePostComment (post.id,commentRef.current.value)
		commentRef.current.value = '';

	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}>
            {post.comments.map((comment,idx) =>(
              <Comment key={idx} comment ={comment} />
            ))}
          </Flex>
					<form onSubmit={handlePostCreation} style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};


export default CommentsModal
