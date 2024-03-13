import { Box, Container, Flex,Image, VStack } from '@chakra-ui/react'
import React from 'react'
import AuthForm from '../../components/AuthForm/AuthForm'

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
            {/* Left side */}
            <Box display={{ base: "none", md: "block" }}>
                <Image  src="/auth.png" alt='instagram' h={650} />

                
            </Box>
            {/* Right side */}

            <VStack spacing={4} align={"stretch"} p={5}>

                <AuthForm/>
                <Box textAlign={"center"}>
                    Get the app.
                </Box>
            <Flex gap={5} justifyContent={"center"}>
                <Image  src='/playstore.png' h={10} alt='playstore logo' />
                <Image  src='/microsoft.png' h={10} alt='Microsoft logo' />
                
            </Flex>
            </VStack>

        </Flex>
      </Container>
    </Flex>
  )
}

export default AuthPage
