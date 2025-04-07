import { Box } from '@chakra-ui/react'
import React from 'react'
import ZoomedView from './ZoomedView'

const HubView = () => {
  return (
    <Box w="200px" h="150px" border="1px solid #ccc" bg="gray.50" p={2}>
    <Box fontSize="sm" mb={1}>WSI Zoomed Out View (Hub)</Box>
    <Box fontSize="xs">Patient ID: 12345</Box>
    <Box fontSize="xs">Sample: Blood</Box>

  </Box>
  
  )
}

export default HubView