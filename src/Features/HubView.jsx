import { Box } from '@chakra-ui/react'
import React from 'react'

const HubView = () => {
  return (
    <Box w="200px" h="150px" borderRadius={'2xl'} bg={'gray.300'} border="1px solid #ccc" p={2}>
    <Box fontSize="sm" mb={1}>WSI Zoomed Out View (Hub)</Box>
    <Box fontSize="xs">Patient ID: 12345</Box>
    <Box fontSize="xs">Sample: Blood</Box>

  </Box>
  
  )
}

export default HubView