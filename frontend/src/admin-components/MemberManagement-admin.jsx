import { useState } from 'react'
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  VStack,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Input as ChakraInput
} from '@chakra-ui/react'
import { FaChevronDown, FaSearch, FaCalendar, FaUserPlus, FaFileDownload, FaClock, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa'

const MemberManagement = () => {
  const toast = useToast()
  const { 
    isOpen: isMeetingOpen, 
    onOpen: onMeetingOpen, 
    onClose: onMeetingClose 
  } = useDisclosure()
  const { 
    isOpen: isInterviewOpen, 
    onOpen: onInterviewOpen, 
    onClose: onInterviewClose 
  } = useDisclosure()
  const { 
    isOpen: isRejectOpen, 
    onOpen: onRejectOpen, 
    onClose: onRejectClose 
  } = useDisclosure()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')
  const [meetLink, setMeetLink] = useState('')
  const [coordinatorName, setCoordinatorName] = useState('')

  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', status: 'Pending', club: 'Debate Club', joinDate: '2024-01-15', attendance: '85%', email: 'john.doe@email.com', interviewStatus: 'Scheduled', interviewDate: '2024-03-25', interviewTime: '14:00' },
    { id: 2, name: 'Jane Smith', status: 'Active', club: 'Science Club', joinDate: '2023-12-01', attendance: '92%', email: 'jane.smith@email.com', interviewStatus: 'Completed', interviewDate: '2024-03-10', interviewTime: '15:30' },
    { id: 3, name: 'Mike Johnson', status: 'Pending', club: 'Sports Club', joinDate: '2024-02-20', attendance: '78%', email: 'mike.j@email.com', interviewStatus: 'Pending', interviewDate: null, interviewTime: null },
    { id: 4, name: 'Sarah Wilson', status: 'Active', club: 'Art Club', joinDate: '2023-11-10', attendance: '95%', email: 'sarah.w@email.com', interviewStatus: 'Scheduled', interviewDate: '2024-03-28', interviewTime: '10:00' }
  ])

/*   // useState(){
  
  fetchInterviews(){
  //const res =  axios.get("/get-all-interview"); 
  }
  res  = res.data;
  setMembers(data);
// }


// scheduleInterview(){

  // const res = axios.post(/add-interview", {
    data_of_interview
  })
// }

*/
  const handleStatusChange = (memberId, status) => {
    toast({
      title: `Member ${status}`,
      status: status === 'Approved' ? 'success' : 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleGenerateReport = (reportType) => {
    toast({
      title: `Generating ${reportType} report`,
      description: 'Your report will be ready for download shortly.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleScheduleMeeting = (e) => {
    e.preventDefault()
    toast({
      title: 'Meeting Scheduled',
      description: 'All selected members have been notified.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onMeetingClose()
  }

  const handleScheduleInterview = (e) => {
    e.preventDefault()
    toast({
      title: 'Interview Scheduled',
      description: `Interview scheduled for ${selectedMember.name}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onInterviewClose()
  }

  const openRejectModal = (member) => {
    setSelectedMember(member)
    onRejectOpen()
  }

  const handleRejectSubmission = () => {
    toast({
      title: 'Rejection Sent Successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    onRejectClose()
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.club.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const openInterviewModal = (member) => {
    setSelectedMember(member)
    onInterviewOpen()
  }

  return (
    <Box color="white">
      <VStack align="stretch" spacing={6}>
        <HStack justify="space-between" wrap="wrap" spacing={4}>
          <Heading>Member Management</Heading>
          <HStack spacing={4}>
            <Button
              leftIcon={<Icon as={FaUserPlus} />}
              colorScheme="green"
              onClick={onMeetingOpen}
            >
              Schedule Meeting
            </Button>
            <Menu>
  <MenuButton 
    as={Button} 
    rightIcon={<FaChevronDown />} 
    colorScheme="blue"
    leftIcon={<Icon as={FaFileDownload} />}
  >
    Generate Report
  </MenuButton>
  <MenuList bg="black"> {/* Set the background color of the MenuList to black */}
    <MenuItem 
    bg="black"
      onClick={() => handleGenerateReport('Membership')} 
      _hover={{ bg: 'blue.900' }} // Dark hover background color
      _active={{ bg: 'blue.800' }} // Dark active background color
    >
      Membership Report
    </MenuItem>
    <MenuItem 
    bg="black"
      onClick={() => handleGenerateReport('Event Participation')} 
      _hover={{ bg: 'blue.900' }} // Dark hover background color
      _active={{ bg: 'blue.800' }} // Dark active background color
    >
      Event Participation Report
    </MenuItem>
    <MenuItem 
    bg="black"
      onClick={() => handleGenerateReport('Interview Status')} 
      _hover={{ bg: 'blue.900' }} // Dark hover background color
      _active={{ bg: 'blue.800' }} // Dark active background color
    >
      Interview Status Report
    </MenuItem>
    <MenuItem 
    bg="black"
      onClick={() => handleGenerateReport('Feedback')} 
      _hover={{ bg: 'blue.900' }} // Dark hover background color
      _active={{ bg: 'blue.800' }} // Dark active background color
    >
      Feedback Report
    </MenuItem>
  </MenuList>
</Menu>
</HStack>
        </HStack>

        <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
          <InputGroup mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search members by name or club..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg="blue.700"
              _hover={{ bg: 'blue.600' }}
            />
          </InputGroup>

          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="gray.300">Name</Th>
                  <Th color="gray.300">Club</Th>
                  <Th color="gray.300">Status</Th>
                  <Th color="gray.300">Join Date</Th>
                  <Th color="gray.300">Attendance</Th>
                  <Th color="gray.300">Interview Status</Th>
                  <Th color="gray.300">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredMembers.map((member) => (
                  <Tr key={member.id} _hover={{ bg: 'blue.700' }}>
                    <Td>{member.name}</Td>
                    <Td>{member.club}</Td>
                    <Td>
                      <Badge
                        colorScheme={member.status === 'Active' ? 'green' : 'yellow'}
                        borderRadius="full"
                        px={2}
                      >
                        {member.status}
                      </Badge>
                    </Td>
                    <Td>{member.joinDate}</Td>
                    <Td>
                      <Badge
                        colorScheme={parseInt(member.attendance) >= 90 ? 'green' :
                          parseInt(member.attendance) >= 80 ? 'blue' : 'red'}
                      >
                        {member.attendance}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={member.interviewStatus === 'Completed' ? 'green' :
                          member.interviewStatus === 'Scheduled' ? 'blue' : 'yellow'}
                      >
                        {member.interviewStatus}
                      </Badge>
                      {member.interviewDate && (
                        <Text fontSize="xs" color="gray.300" mt={1}>
                          {member.interviewDate} at {member.interviewTime}
                        </Text>
                      )}
                    </Td>
                    <Td>
                      <VStack spacing={2}>
                        <HStack spacing={2}>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleStatusChange(member.id, 'Approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => openRejectModal(member)}
                          >
                            Reject
                          </Button>
                        </HStack>
                        <Button
                          size="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={FaCalendar} />}
                          onClick={() => openInterviewModal(member)}
                          w="full"
                        >
                          Schedule Interview
                        </Button>
                      </VStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>

      {/* Interview Scheduling Modal */}
      <Modal isOpen={isInterviewOpen} onClose={onInterviewClose}>
        <ModalOverlay />
        <ModalContent bg="blue.800" color="white">
          <ModalHeader>Schedule Interview for {selectedMember?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Date</FormLabel>
              <ChakraInput
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                mb={4}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Time</FormLabel>
              <ChakraInput
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                mb={4}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Link for Joining Meet</FormLabel>
              <ChakraInput
                type="url"
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                mb={4}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Coordinator Name</FormLabel>
              <ChakraInput
                value={coordinatorName}
                onChange={(e) => setCoordinatorName(e.target.value)}
                mb={4}
              />
            </FormControl>

            <HStack spacing={4} mt={6}>
              <Button
                colorScheme="green"
                onClick={handleScheduleInterview}
              >
                Schedule
              </Button>
              <Button
                colorScheme="red"
                onClick={onInterviewClose}
              >
                Cancel
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Rejection Modal */}
      <Modal isOpen={isRejectOpen} onClose={onRejectClose}>
        <ModalOverlay />
        <ModalContent bg="blue.800" color="white">
          <ModalHeader>Reject Member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Reason for Rejection</FormLabel>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter the reason for rejection"
              />
            </FormControl>
            <Button colorScheme="red" w="full" mt={4} onClick={handleRejectSubmission}>
              Send Rejection

            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default MemberManagement
