import { Avatar, Flex, Text } from '@chakra-ui/react'
import useGetUsernameByPostId from '../../hooks/useGetUsernameByPostId'
import { useEffect } from 'react';

const Comment = ( {comment} ) => {
  const {user, getUsernameByPostId} = useGetUsernameByPostId();

 useEffect(()=>{
    const fetchUser =async ()=>{
        await getUsernameByPostId(comment?.createdBy)
    }
    if(comment) fetchUser();
 },[comment])
 
    return (
        <Flex gap={4} >
            <Avatar src={user?.profilePicURL} alt='profile picture' name={user?.fullname} size={"sm"} />
            <Flex direction={"column"}>
                <Flex gap={2}>

                    <Text fontWeight={"bold"} fontSize={12}>
                        {user?.username}
                    </Text>
                    <Text fontSize={14}>
                        {comment?.comment}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray"} >{comment?.createdAt}</Text>
            </Flex>

        </Flex>
    )
}

export default Comment
