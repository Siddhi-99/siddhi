// All imports remain the same
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import {
  Box, Heading, VStack, HStack, Text, Button, useToast, Grid, FormControl,
  FormLabel, Input, Textarea, Badge, Icon, SimpleGrid, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, Select, Spinner
} from '@chakra-ui/react'
import {
  FaCalendar, FaMapMarkerAlt, FaUsers, FaClock,
  FaTrash, FaEdit, FaBell
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const EventManagement = () => {
  const { token } = useAuth()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isAddEventOpen,
    onOpen: onAddEventOpen,
    onClose: onAddEventClose
  } = useDisclosure()

  const {
    isOpen: isNotifyOpen,
    onOpen: onNotifyOpen,
    onClose: onNotifyClose
  } = useDisclosure()

  const [events, setEvents] = useState([])
  const [clubs, setClubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [newEvent, setNewEvent] = useState({
    title: '', date: '', time: '', venue: '',
    club: '', description: '', maxParticipants: ''
  })

  const [notification, setNotification] = useState({
    club: '',
    message: ''
  })

  useEffect(() => {
    fetchEvents()
    fetchClubs()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/events', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Events response:", res.data);
      
      // Handle the API response structure
      if (res.data.success && res.data.events) {
        setEvents(res.data.events);
      } else if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
      toast({
        title: 'Error fetching events',
        description: error.message,
        status: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchClubs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/clubs')
      console.log("Clubs response:", res.data);
      
      // Handle the API response structure
      if (res.data.success && res.data.clubs) {
        setClubs(res.data.clubs);
      } else if (Array.isArray(res.data)) {
        setClubs(res.data);
      } else {
        setClubs([]);
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setClubs([]);
    }
  }

  const handleAddOrUpdateEvent = async (e) => {
    e.preventDefault()
    try {
      const url = selectedEvent
        ? `http://localhost:8000/events/${selectedEvent._id}`
        : 'http://localhost:8000/events/add-event'

      const method = selectedEvent ? 'put' : 'post'
      const res = await axios[method](url, newEvent, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      toast({
        title: selectedEvent ? 'Event updated' : 'Event created',
        description: `"${res.data.event.title}" ${selectedEvent ? 'updated' : 'created'} successfully.`,
        status: 'success'
      })

      setNewEvent({
        title: '', date: '', time: '', venue: '',
        club: '', description: '', maxParticipants: ''
      })
      setSelectedEvent(null)
      onAddEventClose()
      fetchEvents()
    } catch (err) {
      toast({
        title: 'Error saving event',
        description: err.message,
        status: 'error'
      })
    }
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setNewEvent(event)
    onAddEventOpen()
  }

  const handleRemoveEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8000/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      toast({
        title: 'Event removed',
        description: 'Event removed successfully.',
        status: 'success'
      })
      fetchEvents()
    } catch (error) {
      toast({
        title: 'Error removing event',
        description: error.message,
        status: 'error'
      })
    }
  }

  const handleSendNotification = async () => {
    try {
      await axios.post('http://localhost:8000/send-notification', notification)
      toast({
        title: 'Notification sent',
        status: 'success'
      })
      onNotifyClose()
      setNotification({ club: '', message: '' })
    } catch (err) {
      toast({
        title: 'Failed to send notification',
        description: err.message,
        status: 'error'
      })
    }
  }

  const refreshEvents = async () => {
    await fetchEvents()
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading Events...</Text>
      </Box>
    )
  }

  return (
    <Box color="white">
      <HStack justify="space-between" mb={6}>
        <Heading>Event Management</Heading>
        <HStack spacing={4}>
          <Button 
            colorScheme="gray" 
            onClick={refreshEvents}
            isLoading={loading}
            leftIcon={<Icon as={FaCalendar} />}
          >
            Refresh
          </Button>
          <Button leftIcon={<Icon as={FaCalendar} />} colorScheme="blue" onClick={() => {
            setSelectedEvent(null)
            setNewEvent({ title: '', date: '', time: '', venue: '', club: '', description: '', maxParticipants: '' })
            onAddEventOpen()
          }}>
            Add New Event
          </Button>
        </HStack>
      </HStack>

      {events.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" color="gray.300" mb={4}>
            No events found. Create your first event!
          </Text>
          <Button 
            colorScheme="blue" 
            onClick={() => {
              setSelectedEvent(null)
              setNewEvent({ title: '', date: '', time: '', venue: '', club: '', description: '', maxParticipants: '' })
              onAddEventOpen()
            }}
          >
            Add New Event
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {events.map((event) => (
          <motion.div key={event._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box p={6}>
              <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md">{event.title}</Heading>
                    <Badge colorScheme="green" borderRadius="full" px={3} py={1}>Upcoming</Badge>
                  </HStack>
                  <Text>{event.description}</Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <HStack><Icon as={FaCalendar} /><Text>{event.date}</Text></HStack>
                    <HStack><Icon as={FaClock} /><Text>{event.time}</Text></HStack>
                    <HStack><Icon as={FaMapMarkerAlt} /><Text>{event.venue}</Text></HStack>
                    <HStack><Icon as={FaUsers} /><Text>{event.maxParticipants || 'N/A'} Max</Text></HStack>
                  </Grid>
                  <HStack spacing={4}>
                    <Button leftIcon={<Icon as={FaEdit} />} onClick={() => handleEditEvent(event)} colorScheme="blue" flex={1}>Edit</Button>
                    <Button leftIcon={<Icon as={FaTrash} />} onClick={() => handleRemoveEvent(event._id)} colorScheme="red" flex={1}>Remove</Button>
                    <Button leftIcon={<Icon as={FaBell} />} onClick={() => {
                      setNotification({ ...notification, club: event.club })
                      onNotifyOpen()
                    }} colorScheme="yellow" flex={1}>Notify</Button>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </motion.div>
        ))}
        </SimpleGrid>
      )}

      {/* Add/Edit Event Modal */}
      <Modal isOpen={isAddEventOpen} onClose={onAddEventClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEvent ? 'Edit Event' : 'Create New Event'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {[
              ['Event Name', 'title'],
              ['Event Description', 'description'],
              ['Date', 'date', 'date'],
              ['Time', 'time', 'time'],
              ['Venue', 'venue'],
              ['Max Participants', 'maxParticipants']
            ].map(([label, key, type = 'text']) => (
              <FormControl mt={4} key={key}>
                <FormLabel>{label}</FormLabel>
                {key === 'description' ? (
                  <Textarea
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={newEvent[key]}
                    onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                  />
                ) : (
                  <Input
                    type={type}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={newEvent[key]}
                    onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                  />
                )}
              </FormControl>
            ))}
            <FormControl mt={4}>
              <FormLabel>Club</FormLabel>
              <Select
                placeholder="Select club"
                value={newEvent.club}
                onChange={(e) => setNewEvent({ ...newEvent, club: e.target.value })}
              >
                {clubs.map(club => (
                  <option key={club._id} value={club.name}>{club.name}</option>
                ))}
              </Select>
            </FormControl>
            <Button colorScheme="blue" mt={6} onClick={handleAddOrUpdateEvent}>
              {selectedEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Notification Modal */}
      <Modal isOpen={isNotifyOpen} onClose={onNotifyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Enter your message"
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
              />
            </FormControl>
            <Button colorScheme="yellow" mt={4} onClick={handleSendNotification}>
              Send Notification
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default EventManagement
