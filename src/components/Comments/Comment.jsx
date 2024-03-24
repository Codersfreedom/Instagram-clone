import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import useGetUsernameByPostId from '../../hooks/useGetUsernameByPostId'
import { Link } from 'react-router-dom';
import { timeAgo } from '../../utils/TimeAgo';


const Comment = ({ comment }) => {
    const { user, isLoading } = useGetUsernameByPostId(comment?.createdBy);



    if (isLoading) return <CommentSkeleton />

    return (
        <Flex gap={4} >
            <Avatar src={user?.profilePicURL} alt='profile picture' name={user?.fullname} size={"sm"} />
            <Flex direction={"column"}>
                <Flex gap={2}>
                    <Link to ={`/${user?.username}`} >
                        <Text fontWeight={"bold"} fontSize={12}>
                            {user?.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>
                        {comment?.comment}
                    </Text>
                </Flex>
                <Text fontSize={12} color={"gray"} >{timeAgo(comment.createdAt)}</Text>
            </Flex>

        </Flex>
    )
}

export default Comment

const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={"full"} alignItems={"center"}>
            <SkeletonCircle h={10} w={'10'} />
            <Flex gap={1} flexDir={"column"} >
                <Skeleton height={2} width={100} />
                <Skeleton height={2} width={50} />
            </Flex>

        </Flex>
    )
}