import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [user, loading] = useAuthState(auth);
    const canRenderSideBar = pathname !== '/auth' && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth";

    const checkisUserAuth = !user && loading;
    if (checkisUserAuth) return <LoadingSpinner />;

    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {/* Sidebar on the left */}

            {canRenderSideBar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <Sidebar />
                </Box>
            ) : null}
            {/* Navbar on top*/}
            {canRenderNavbar ? (
                <Navbar />) : null}

            {/* body contents */}
            <Box flex={1} w={{ base: "calc(100% -70px)", md: "calc(100%-240px)" }} mx={"auto"}>
                {children}
            </Box>


        </Flex>
    )
}

export default PageLayout

const LoadingSpinner = () => {
    return (
        <Flex flexDir={'column'} h={'100vh'} alignItems={'center'} justifyContent={'center'} >
            <Spinner size={"xl"} />
        </Flex>
    )
}