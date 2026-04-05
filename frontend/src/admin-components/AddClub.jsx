import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Divider,
  Badge,
  Button,
  Icon,
  Input,
  Textarea,
  Image,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaStar, FaUsers, FaTrophy, FaCamera } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const AddClub = () => {
  const navigate = useNavigate(); // Hook for navigation
  const { token } = useAuth();

  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    objectives: "",
    teacher: "",
    teacherPhoto: null,
    headStudent: "",
    headPhoto: null,
    coHead: "",
    coHeadPhoto: null,
    achievements: "",
    clubPhotos: [], // Store additional club images
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData({ ...clubData, [name]: value });
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Handle Single Image Upload (Teacher, Head, Co-Head)
  const handleSingleFileChange = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Convert to base64 for storage
        const base64 = await convertToBase64(file);
        setClubData((prevData) => ({ ...prevData, [key]: base64 }));
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  // Handle Multiple Club Image Uploads
  const handleMultipleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    try {
      // Convert to base64 for storage
      const base64Images = await Promise.all(files.map(file => convertToBase64(file)));
      setClubData((prevData) => ({
        ...prevData,
        clubPhotos: [...prevData.clubPhotos, ...base64Images],
      }));
    } catch (error) {
      console.error("Error converting images to base64:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/clubs/add-club",
        clubData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Club added successfully! 🎉");
        // Reset form
        setClubData({
          name: "",
          description: "",
          objectives: "",
          teacher: "",
          teacherPhoto: null,
          headStudent: "",
          headPhoto: null,
          coHead: "",
          coHeadPhoto: null,
          achievements: "",
          clubPhotos: [],
        });
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error adding club:", error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to add club. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box color="white">
      {/* <Heading mb={6}>Club Management</Heading> */}

      <Tabs variant="soft-rounded" colorScheme="blue" mb={6}>
        {/* <TabList>
          <Tab>Existing Clubs</Tab>
          <Tab>Add New Club</Tab>
        </TabList> */}

        <TabPanels>
          {/* Add New Club Panel */}
          <TabPanel>
            <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
              <Heading size="md" mb={4}>Add New Club</Heading>
              
              {error && (
                <Alert status="error" mb={4} borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert status="success" mb={4} borderRadius="md">
                  <AlertIcon />
                  {success}
                </Alert>
              )}
              
              <form onSubmit={handleFormSubmit}>
                <VStack spacing={4} align="stretch">
                  <Input
                    placeholder="Club Name"
                    name="name"
                    value={clubData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    placeholder="Club Description"
                    name="description"
                    value={clubData.description}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    placeholder="Objectives"
                    name="objectives"
                    value={clubData.objectives}
                    onChange={handleInputChange}
                    required
                  />

                  {/* Teacher Name & Upload Photo */}
                  <HStack>
                    <Input
                      placeholder="Teacher Name"
                      name="teacher"
                      value={clubData.teacher}
                      onChange={handleInputChange}
                      required
                    />
                    <Input type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, "teacherPhoto")} />
                  </HStack>
                  {clubData.teacherPhoto && (
                    <Image 
                      src={clubData.teacherPhoto} 
                      boxSize="80px" 
                      borderRadius="full" 
                      objectFit="cover"
                    />
                  )}

                  {/* Head Student Name & Upload Photo */}
                  <HStack>
                    <Input
                      placeholder="Head Student Name"
                      name="headStudent"
                      value={clubData.headStudent}
                      onChange={handleInputChange}
                      required
                    />
                    <Input type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, "headPhoto")} />
                  </HStack>
                  {clubData.headPhoto && (
                    <Image 
                      src={clubData.headPhoto} 
                      boxSize="80px" 
                      borderRadius="full" 
                      objectFit="cover"
                    />
                  )}

                  {/* Co-Head Name & Upload Photo */}
                  <HStack>
                    <Input
                      placeholder="Co-Head Name"
                      name="coHead"
                      value={clubData.coHead}
                      onChange={handleInputChange}
                      required
                    />
                    <Input type="file" accept="image/*" onChange={(e) => handleSingleFileChange(e, "coHeadPhoto")} />
                  </HStack>
                  {clubData.coHeadPhoto && (
                    <Image 
                      src={clubData.coHeadPhoto} 
                      boxSize="80px" 
                      borderRadius="full" 
                      objectFit="cover"
                    />
                  )}

                  <Textarea
                    placeholder="Achievements (comma-separated)"
                    name="achievements"
                    value={clubData.achievements}
                    onChange={handleInputChange}
                  />

                  {/* 📸 Upload Club Photos Section */}
                  <Box>
                    <Text fontWeight="bold" mb={2}>
                      <Icon as={FaCamera} mr={2} color="yellow.400" />
                      Upload Additional Club Photos
                    </Text>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleFileChange}
                      className="w-full p-3 border rounded-lg"
                    />
                    {/* Preview Uploaded Images */}
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} mt={4}>
                      {clubData.clubPhotos.length > 0 &&
                        clubData.clubPhotos.map((photo, index) => (
                          <Image 
                            key={index} 
                            src={photo} 
                            alt="Club Photo" 
                            boxSize="100px" 
                            borderRadius="md"
                            objectFit="cover"
                          />
                        ))}
                    </SimpleGrid>
                  </Box>

                  <Button 
                    colorScheme="green" 
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Creating Club..."
                    disabled={isLoading}
                  >
                    Create Club
                  </Button>
                </VStack>
              </form>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AddClub;