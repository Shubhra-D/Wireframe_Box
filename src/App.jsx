import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Features/Sidebar'
import HubView from './Features/HubView'
import ZoomedView from './Features/ZoomedView'

function App() {
  const date = new Date();
  const format = date.toLocaleDateString();
  const formattedDay = date.toLocaleDateString("en-US", { weekday: "long" });

  const time = date.toLocaleTimeString()
  return (
    <>
      <Flex h="100vh" direction="row">
      <Sidebar />
      <Flex flex="1" direction="column" p={4}>
        <Flex justify="space-between" mb={4}>
        <Box fontWeight="bold">Day : {formattedDay}</Box>
          <Box fontWeight="bold">Date : {format}</Box>
          <Box fontWeight="bold">Time : {time}</Box>
          <HubView />
        </Flex>
        <ZoomedView />
      </Flex>
    </Flex>
    </>
  )
}

export default App
