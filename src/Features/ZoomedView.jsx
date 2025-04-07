import { Box, Button, HStack, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import slideImage from '../assets/slideImage.png'
import axios from 'axios';
const ZoomedView = () => {
  const [detections,setDetections] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const [selectedBox, setSelectedBox] = useState(null);



  const lastPos = useRef({ x: 0, y: 0 });
  useEffect(()=>{
      axios.get('/output.json') 
      .then((res) => {
        console.log("Raw Output:", res.data);
  
        const result = res.data.detection_result;
        console.log("Parsed Result:", result);
  
        if (Array.isArray(result)) {
          setDetections(result);
        } else if (typeof result === 'string') {
          try {
            const parsed = JSON.parse(result);
            console.log("Parsed from String:", parsed);
            setDetections(parsed);
          } catch (e) {
            console.error("Failed to parse detection_result string", e);
          }
        } else {
          console.warn("No valid detection_result found");
          setDetections([]);
        }
      }).catch((err)=>{
        console.log("Error loading detection data",err)
      });
      // Listen to box-select event
    const handleBoxSelect = (e) => {
        setSelectedBox(e.detail);
      };
  
      window.addEventListener('box-select', handleBoxSelect);
  
      // Cleanup
      return () => {
        window.removeEventListener('box-select', handleBoxSelect);
      };
    }, []);

  

 const handleMouseDown = (e) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };


  
    return (
    
        <Box borderRadius={'2xl'} flex="1" position="relative" overflow="hidden" border="1px solid #ccc">
        {/* Zoom Controls */}
        <HStack spacing={2} p={2}>
          <Button size="sm" onClick={() => setZoom((z) => Math.min(z + 0.2, 5))} bg={'green.400'} color={'whiteAlpha.900'}>Zoom In</Button>
          <Button size="sm" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))} bg={'green.400'} color={'whiteAlpha.900'}>Zoom Out</Button>
          <Button size="sm" onClick={() => { setZoom(1); setPosition({ x: 0, y: 0 }); }} bg={'green.400'} color={'whiteAlpha.900'}>Reset</Button>
        </HStack>
  
        {/* Zoomable + Draggable View */}
        <Box
          ref={containerRef}
          position="relative"
          width="100%"
          height="100%"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transformOrigin: 'top left',
            cursor: isDragging.current ? 'grabbing' : 'grab'
          }}
        >
          <Image
            src={slideImage}
            alt="WSI Zoomed In View"
            width="100%"
            height="auto"
            objectFit="contain"
          />
  
          {/* Bounding Boxes */}
          {detections.map((det, index) => (
            <Box
              key={index}
              position="absolute"
              top={`${det.y}px`}
              left={`${det.x}px`}
              width={`${det.width}px`}
              height={`${det.height}px`}
              border="2px solid red"
              borderRadius="md"
              pointerEvents="none"
              zIndex={selectedBox?.label === det.label ? 10 : 1}
            >
              <Text
                fontSize="xs"
                bg="red.500"
                color="white"
                px={1}
                position="absolute"
                top="-16px"
                left="0"
              >
                {det.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
  )
}

export default ZoomedView