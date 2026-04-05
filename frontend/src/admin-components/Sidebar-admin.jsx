import { Box, VStack, Icon, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaUsers, FaCalendarAlt, FaUserFriends } from 'react-icons/fa'

const Sidebar = () => {
  const location = useLocation()
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const menuItems = [
    { icon: FaHome, text: 'Dashboard', path: '/admin/' },
    { icon: FaUsers, text: 'Clubs', path: '/admin/clubs-admin' },
    { icon: FaUserFriends, text: 'Members', path: '/admin/members-admin' },
    { icon: FaCalendarAlt, text: 'Events', path: '/admin/events-admin' },
  ]

  return (
    <Box
      bg="blue.900"
      w={isOpen ? '240px' : '70px'}
      transition="width 0.2s"
      color="white"
      p={4}
    >
      <VStack spacing={6} align="stretch">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.text}>
            <Flex
              align="center"
              p={3}
              borderRadius="md"
              bg={location.pathname === item.path ? 'blue.700' : 'transparent'}
              _hover={{ bg: 'blue.700' }}
            >
              <Icon as={item.icon} boxSize={5} />
              {isOpen && <Text ml={4}>{item.text}</Text>}
            </Flex>
          </Link>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar