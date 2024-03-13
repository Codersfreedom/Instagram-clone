import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {

	const navigate = useNavigate();

        const [inputs, setInputs] = useState({
            email: "",
            password: "",
        });
        
		const [loading,setLoading] = useState(false);

		const handleLogin =(e)=>{
			e.preventDefault();
			if(!inputs.email || !inputs.password){
				alert("Please fill all fields")
				return;
			}
			console.log(inputs);
			// navigate("/")

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
				placeholder='Password'
				fontSize={14}
				size={"sm"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			{/* {error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					{error.message}
				</Alert>
			)} */}
			<Button
				w={"full"}
				colorScheme='blue'
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={handleLogin}
			>
				Log in
			</Button>
		</>
  )
}

export default Login
