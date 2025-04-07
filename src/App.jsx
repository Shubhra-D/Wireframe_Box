import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Features/Sidebar'
import HubView from './Features/HubView'
import ZoomedView from './Features/ZoomedView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Flex h="100vh" direction="row">
      <Sidebar />
      <Flex flex="1" direction="column" p={4}>
        <Flex justify="space-between" mb={4}>
          <Box fontWeight="bold">Mon Oct 07 2024 16:39:07</Box>
          <HubView />
        </Flex>
        <ZoomedView />
      </Flex>
    </Flex>
    </>
  )
}

export default App
