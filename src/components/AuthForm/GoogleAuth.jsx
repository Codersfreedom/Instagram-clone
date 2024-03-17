import { Flex, Image, Text } from "@chakra-ui/react";
import useSignupWithGoogle from "../../hooks/useSignupWithGoogle";



const GoogleAuth = ({prefix}) => {

  const {singInWithGoogle} = useSignupWithGoogle();

    
  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={singInWithGoogle}>
    <Image src='/google.png' w={5} alt='Google logo' />
    <Text mx='2' color={"blue.500"}  >
        {prefix} with Google
    </Text>
</Flex>
  )
}

export default GoogleAuth
