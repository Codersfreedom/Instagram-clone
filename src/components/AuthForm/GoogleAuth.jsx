import { Flex, Image, Text } from "@chakra-ui/react";
import React from 'react'


const GoogleAuth = () => {
    const handleGoogleAuth = () => {
        console.log("Google Auth")
    }
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
    <Image src='/google.png' w={5} alt='Google logo' />
    <Text mx='2' color={"blue.500"}>
        login with Google
    </Text>
</Flex>
  )
}

export default GoogleAuth
