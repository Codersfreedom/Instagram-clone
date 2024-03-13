import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
	global: (props) => ({
		body: {
			bg: mode("gray.100", "#000")(props),
			color: mode("gray.800", "whiteAlpha.900")(props),
		},
	}),
};

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
    <ChakraProvider theme={theme} >
    <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)