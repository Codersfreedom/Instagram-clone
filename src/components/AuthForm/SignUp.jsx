import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from 'react'

const SignUp = () => {
    const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

    const handleSignup =(e)=>{
        e.preventDefault();
        if(!inputs.fullName || !inputs.username || !inputs.email || !inputs.password){
            alert("Please fill all the fields")
            return ;
        }
        console.log(inputs);
    }

  return (
    <>
    <Input
        placeholder='Email'
        fontSize={14}
        type='email'
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
    />
    <Input
        placeholder='Username'
        fontSize={14}
        type='text'
        size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
    />
    <Input
        placeholder='Full Name'
        fontSize={14}
        type='text'
        size={"sm"}
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
    />
    <InputGroup>
        <Input
            placeholder='Password'
            fontSize={14}
            type={showPassword ? "text" : "password"}
            value={inputs.password}
            size={"sm"}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h='full'>
            <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
        </InputRightElement>
    </InputGroup>

    {/* {(
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {}
        </Alert>
    )} */}

    <Button
        w={"full"}
        colorScheme='blue'
        size={"sm"}
        fontSize={14}
        onClick={handleSignup}
        
    >
        Sign Up
    </Button>
</>
  )
}

export default SignUp
