import {  Box, Flex, Text, VStack, textDecoration } from '@chakra-ui/react'
import{ Link } from '@chakra-ui/react';
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader/>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} >
        Suggested for you

        </Text>
    <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"} >See All</Text>

      </Flex>
      <SuggestedUser name = 'jane doe' followers={1234} avatar='https://bit.ly/dan-abramov' />
      <SuggestedUser name = 'josh ' followers={3454} avatar='https://bit.ly/josh'  />
      <SuggestedUser name = 'lisa ' followers={5454} avatar='https://bit.ly/lisa' />
        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"center"}>
            2024 Build By{" "}
            <Link href='https://github.com/Codersfreedom' target='_blank' color='blue.500' fontSize={14} style={{textDecoration:"none"}}>
                Rakesh Manna
            </Link>
        </Box>
    </VStack>
  )
}

export default SuggestedUsers
