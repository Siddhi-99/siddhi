import { Box, Grid, Stat, StatLabel, StatNumber, Heading, VStack, HStack, Text, Button, SimpleGrid, Progress, Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaTrophy, FaCalendarCheck, FaUserGraduate, FaChartLine } from 'react-icons/fa'

const Dashboard = () => {
  const navigate = useNavigate()

  const stats = [
    { label: 'Total Clubs', value: 12, icon: FaUserGraduate, color: 'blue.400' },
    { label: 'Active Members', value: 156, icon: FaChartLine, color: 'green.400' },
    { label: 'Upcoming Events', value: 8, icon: FaCalendarCheck, color: 'purple.400' },
    { label: 'Achievements', value: 24, icon: FaTrophy, color: 'orange.400' }
  ]

  const recentActivities = [
    { 
      title: 'Google Developrs Student Club', 
      type: 'achievement',
      description: 'Won National Level Competition',
      date: '2024-03-15'
    },
    { 
      title: 'Geeks For Geeks Club', 
      type: 'event',
      description: 'Inter-school championship',
      date: '2024-04-01'
    },
    { 
      title: 'Association For Computing Machinary', 
      type: 'event',
      description: 'Innovation Exhibition',
      date: '2024-04-15'
    }
  ]

  const clubPerformance = [
    { name: 'Google Developrs Student Association', progress: 85 },
    { name: 'Geeks For Geeks Club', progress: 92 },
    { name: 'Association For Computing Machinary', progress: 78 },
    { name: 'C Cube', progress: 88 }
  ]

  return (
    <Box>
      <Heading mb={6} color="white" display="flex" alignItems="center">
        Dashboard Overview
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {stats.map((stat) => (
          <Box
            key={stat.label}
            bg="blue.800"
            p={6}
            borderRadius="xl"
            cursor="pointer"
            onClick={() => navigate(stat.label === 'Upcoming Events' ? '/admin/events-admin' : '/admin/clubs-admin')}
            _hover={{ 
              transform: 'translateY(-5px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <VStack spacing={3} align="start">
              <Icon as={stat.icon} boxSize={8} color={stat.color} />
              <Stat color="white">
                <StatLabel fontSize="lg">{stat.label}</StatLabel>
                <StatNumber fontSize="3xl" color={stat.color}>{stat.value}</StatNumber>
              </Stat>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={4} color="white">Recent Activities</Heading>
          <VStack align="stretch" spacing={4}>
            {recentActivities.map((activity, index) => (
              <HStack
                key={index}
                justify="space-between"
                p={4}
                bg="blue.700"
                borderRadius="lg"
                transition="all 0.3s ease"
                _hover={{ bg: 'blue.600' }}
              >
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{activity.title}</Text>
                  <Text fontSize="sm" color="gray.300">{activity.description}</Text>
                  <Text fontSize="xs" color="gray.400">{activity.date}</Text>
                </VStack>
                <Button
                  size="sm"
                  colorScheme={activity.type === 'achievement' ? 'green' : 'purple'}
                  onClick={() => navigate(activity.type === 'achievement' ? '/clubs' : '/events')}
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  View Details
                </Button>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box bg="blue.800" p={6} borderRadius="xl" boxShadow="xl">
          <Heading size="md" mb={4} color="white">Club Performance</Heading>
          <VStack align="stretch" spacing={4}>
            {clubPerformance.map((club) => (
              <Box key={club.name}>
                <HStack justify="space-between" mb={2}>
                  <Text color="white">{club.name}</Text>
                  <Text color="blue.300">{club.progress}%</Text>
                </HStack>
                <Progress 
                  value={club.progress} 
                  colorScheme="blue" 
                  borderRadius="full"
                  size="sm"
                  hasStripe
                  isAnimated
                />
              </Box>
            ))}
          </VStack>
        </Box>
      </Grid>
    </Box>
  )
}

export default Dashboard