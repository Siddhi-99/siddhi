import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, FormControl, FormLabel, Input, Textarea, Button, useToast, VStack, HStack } from '@chakra-ui/react';
import axios from 'axios';

const ManageClubPage = () => {
  const { clubId } = useParams();
  const [clubData, setClubData] = useState({
    name: '',
    desc: '',
    objectives: [],
    teacherName: '',
    headName: '',
    coheadName: '',
    achievements: []
  });
  const toast = useToast();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/get-club/${clubId}`);
        setClubData(response.data.club);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, [clubId]);

  const handleChange = (e) => {
    setClubData({ ...clubData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/update-club/${clubId}`, clubData);
      toast({
        title: 'Club Updated',
        description: 'Club information has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating club:', error);
      toast({
        title: 'Error',
        description: 'Failed to update club information.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
      <form onSubmit={handleSubmit}>
        <VStack align="stretch" spacing={4}>
          <FormControl isRequired>
            <FormLabel>Club Name</FormLabel>
            <Input name="name" value={clubData.name} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="desc" value={clubData.desc} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl>
            <FormLabel>Objectives (comma separated)</FormLabel>
            <Input name="objectives" value={clubData.objectives.join(', ')} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl>
            <FormLabel>Teacher Name</FormLabel>
            <Input name="teacherName" value={clubData.teacherName} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl>
            <FormLabel>Head Student</FormLabel>
            <Input name="headName" value={clubData.headName} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl>
            <FormLabel>Co-Head</FormLabel>
            <Input name="coheadName" value={clubData.coheadName} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <FormControl>
            <FormLabel>Achievements (comma separated)</FormLabel>
            <Input name="achievements" value={clubData.achievements.join(', ')} onChange={handleChange} bg="blue.700" _hover={{ bg: 'blue.600' }} />
          </FormControl>

          <HStack spacing={4}>
            <Button colorScheme="blue" type="submit">Update Club</Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default ManageClubPage;