import { Box, Table, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Sidebar = () => {
 
    const [rbc, setRbc] = useState([]);
    const [wbc, setWbc] = useState([]);
    const [platelets, setPlatelets] = useState([]);
    const mockData = [
        { label: "Anisocytosis", count: 100, percentage: 50, category: "RBC", x: 120, y: 140, width: 60, height: 40 },
        { label: "Teardrops", count: 50, percentage: 25, category: "RBC", x: 180, y: 200, width: 40, height: 40 },
        { label: "Lymphocytes", count: 30, percentage: 15, category: "WBC", x: 300, y: 320, width: 70, height: 60 },
        { label: "Basophils", count: 20, percentage: 10, category: "WBC", x: 400, y: 100, width: 30, height: 30 },
        { label: "Platelets", count: 200, percentage: 80, category: "Platelets", x: 500, y: 250, width: 50, height: 50 },
      ];
      
  
    useEffect(() => {
        axios.get('/output.json')
        .then((res) => {
          const rawData = res.data.detection_result;
          const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
          const data = Array.isArray(parsed) ? parsed : mockData;
    
          // Split data by category
          setRbc(data.filter(item => item.category === "RBC"));
          setWbc(data.filter(item => item.category === "WBC"));
          setPlatelets(data.filter(item => item.category === "Platelets"));
        })
        .catch((err) => {
          console.error("Error loading detection data, using mock instead", err);
          setRbc(mockData.filter(item => item.category === "RBC"));
          setWbc(mockData.filter(item => item.category === "WBC"));
          setPlatelets(mockData.filter(item => item.category === "Platelets"));
        });
    }, []);
 
    const onSelectBox = (box) => {
        // Send the selected box info to ZoomedView
        const event = new CustomEvent('box-select', { detail: box });
        window.dispatchEvent(event);
      };
      

    const renderTable = (title, data) => (
        <Box mb={4}>
          <Table.Root size="sm" interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>{title}</Table.ColumnHeader>
                <Table.ColumnHeader isNumeric>Count</Table.ColumnHeader>
                <Table.ColumnHeader isNumeric>%</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item, i) => (
                <Table.Row
                  key={i}
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                  onClick={() => onSelectBox(item)}
                >
                  <Table.Cell>{item.label}</Table.Cell>
                  <Table.Cell isNumeric>{item.count}</Table.Cell>
                  <Table.Cell isNumeric>{item.percentage}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      );
    return (
    <Box w="300px" bg="gray.100" p={4}>
      {/* Placeholder for Findings Table */}
      <Box fontWeight="bold" mb={2}>Findings Panel</Box>
      {renderTable('RBC', rbc)}
      {renderTable('WBC', wbc)}
      {renderTable('Platelets', platelets)}
    </Box>
  )
}

export default Sidebar