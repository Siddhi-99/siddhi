import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useEffect, useState } from 'react';
import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, SimpleGrid, VStack, HStack, Text, Divider, Badge, Button, Icon } from '@chakra-ui/react';
import { FaStar, FaUsers, FaTrophy } from 'react-icons/fa';
import AddClub from './AddClub';
import axios from 'axios';

const ClubManagement = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [clubData, setClubData] = useState({
    name: '',
    description: '',
    objectives: '',
    teacher: '',
    teacherPhoto: '',
    headStudent: '',
    coHead: '',
    achievements: ''
  });

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:8000/clubs");
        console.log("Fetched clubs:", response.data.clubs);
        setClubs(response.data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError("Failed to fetch clubs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);


  const handleManageClub = (clubId) => {
    // Redirect to the Manage Club page with the club ID
    navigate(`/admin/manage-club/${clubId}`);
  };

  const refreshClubs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get("http://localhost:8000/clubs");
      setClubs(response.data.clubs);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setError("Failed to fetch clubs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box color="white">
      <Heading mb={6}>Club Management</Heading>
      
      <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
        <TabList>
          <Tab>Existing Clubs</Tab>
          <Tab>Add New Club</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack justify="space-between" mb={4}>
              <Text fontSize="lg" fontWeight="bold">
                {clubs.length} Club{clubs.length !== 1 ? 's' : ''} Found
              </Text>
              <Button 
                colorScheme="blue" 
                size="sm" 
                onClick={refreshClubs}
                isLoading={loading}
              >
                Refresh
              </Button>
            </HStack>

            {loading ? (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg" color="gray.300">Loading clubs...</Text>
              </Box>
            ) : error ? (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg" color="red.300">{error}</Text>
                <Button 
                  mt={4} 
                  colorScheme="blue" 
                  onClick={refreshClubs}
                >
                  Retry
                </Button>
              </Box>
            ) : clubs.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text fontSize="lg" color="gray.300">No clubs found. Create your first club!</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {clubs.map((club) => (
                  <Box
                    key={club._id}
                    bg="blue.800"
                    p={6}
                    borderRadius="xl"
                    boxShadow="xl"
                    transition="all 0.3s"
                    _hover={{ transform: "translateY(-5px)" }}
                  >
                    <VStack align="stretch" spacing={4}>
                      <HStack justify="space-between">
                        <Heading size="md">{club.name}</Heading>
                        <Icon as={FaStar} color="yellow.400" />
                      </HStack>

                      <Text fontSize="sm" color="gray.300">
                        {club.description}
                      </Text>

                      <Divider />

                      <VStack align="start" spacing={2}>
                        <HStack>
                          <Icon as={FaUsers} />
                          <Text>Teacher: {club.teacher}</Text>
                        </HStack>
                        <Text fontSize="sm">Head Student: {club.headStudent}</Text>
                        {club.coHead && <Text fontSize="sm">Co-Head: {club.coHead}</Text>}
                      </VStack>

                      <HStack justify="space-between">
                        <Badge colorScheme="green">Objectives: {club.objectives}</Badge>
                      </HStack>

                      {club.achievements && (
                        <Box>
                          <Text fontWeight="bold" mb={2}>
                            <Icon as={FaTrophy} mr={2} color="yellow.400" />
                            Recent Achievements
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {club.achievements}
                          </Text>
                        </Box>
                      )}

                      <Button colorScheme="blue" size="sm" onClick={() => handleManageClub(club._id)}>
                        Manage Club
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </TabPanel>

          {/* Add New Club Tab */}
          <TabPanel>
            <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
              {/* <div> Hello World </div> */}
              {/* <ClubManagement /> */}
              <AddClub /> 
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ClubManagement;