export const users = [
  {
    id: '1',
    name: 'Helen',
    age: 23,
    verified: true,
    online: true,
    images: [
      'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3095439/pexels-photo-3095439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Hey there! 👋 I'm Helen — a mix of good vibes, curious mind, and a love for deep convos and spontaneous laughs 😊 I enjoy meaningful connections, fun chats, and people who know how to keep it real.",
    interests: [
      { icon: '🐕', label: 'Have a dog' },
      { icon: '🏋️', label: 'Gym Rat' },
      { icon: '🎬', label: 'Movie Buff' },
      { icon: '🏎️', label: 'Motorsport' },
      { icon: '🧘', label: 'Wellness' },
      { icon: '🗣️', label: 'Talks' },
    ],
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      distance: '5 miles away'
    },
    education: 'NYU Graduate',
    job: 'UX Designer at Apple'
  },
  {
    id: '2',
    name: 'Sophia',
    age: 25,
    verified: false,
    online: true,
    images: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Travel enthusiast and food lover. Looking for someone who shares my passion for adventure and trying new things.",
    interests: [
      { icon: '✈️', label: 'Travel' },
      { icon: '🍕', label: 'Foodie' },
      { icon: '📚', label: 'Reading' },
      { icon: '🎨', label: 'Art' },
    ],
    location: {
      latitude: 40.7282,
      longitude: -74.0776,
      city: 'Jersey City',
      distance: '8 miles away'
    },
    education: 'Columbia University',
    job: 'Marketing Manager'
  },
  {
    id: '3',
    name: 'Emma',
    age: 27,
    verified: true,
    online: false,
    images: [
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Yoga instructor by day, wine enthusiast by night. Looking for genuine connections and good conversations.",
    interests: [
      { icon: '🧘‍♀️', label: 'Yoga' },
      { icon: '🍷', label: 'Wine' },
      { icon: '🎶', label: 'Music' },
      { icon: '🐕', label: 'Dogs' },
    ],
    location: {
      latitude: 40.7484,
      longitude: -73.9857,
      city: 'New York',
      distance: '3 miles away'
    },
    education: 'Fordham University',
    job: 'Yoga Instructor'
  },
  {
    id: '4',
    name: 'Jessica',
    age: 24,
    verified: true,
    online: true,
    images: [
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Tech-obsessed software engineer looking for someone who can keep up with my geeky references and love for hiking.",
    interests: [
      { icon: '💻', label: 'Coding' },
      { icon: '🏔️', label: 'Hiking' },
      { icon: '🎮', label: 'Gaming' },
      { icon: '📺', label: 'Netflix' },
    ],
    location: {
      latitude: 40.7831,
      longitude: -73.9712,
      city: 'New York',
      distance: '2 miles away'
    },
    education: 'MIT',
    job: 'Software Engineer'
  },
  {
    id: '5',
    name: 'Olivia',
    age: 26,
    verified: false,
    online: false,
    images: [
      'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1759531/pexels-photo-1759531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Professional chef with a passion for creating culinary magic. Let's explore the city's best restaurants together.",
    interests: [
      { icon: '👩‍🍳', label: 'Cooking' },
      { icon: '🍹', label: 'Cocktails' },
      { icon: '🎭', label: 'Theater' },
      { icon: '📷', label: 'Photography' },
    ],
    location: {
      latitude: 40.7061,
      longitude: -74.0088,
      city: 'New York',
      distance: '6 miles away'
    },
    education: 'Culinary Institute of America',
    job: 'Executive Chef'
  },
  {
    id: '6',
    name: 'Mia',
    age: 28,
    verified: true,
    online: true,
    images: [
      'https://images.pexels.com/photos/1090387/pexels-photo-1090387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/865711/pexels-photo-865711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Law by day, jazz by night. Always looking for new experiences and interesting people to share them with.",
    interests: [
      { icon: '⚖️', label: 'Law' },
      { icon: '🎷', label: 'Jazz' },
      { icon: '🏊‍♀️', label: 'Swimming' },
      { icon: '✍️', label: 'Writing' },
    ],
    location: {
      latitude: 40.7587,
      longitude: -73.9787,
      city: 'New York',
      distance: '1 mile away'
    },
    education: 'Harvard Law',
    job: 'Attorney'
  },
  {
    id: '7',
    name: 'Ava',
    age: 24,
    verified: false,
    online: false,
    images: [
      'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Fashion enthusiast with an eye for design. Let's explore art galleries and cute cafés together!",
    interests: [
      { icon: '👗', label: 'Fashion' },
      { icon: '🎨', label: 'Art' },
      { icon: '☕', label: 'Coffee' },
      { icon: '📱', label: 'Social Media' },
    ],
    location: {
      latitude: 40.7248,
      longitude: -74.0018,
      city: 'New York',
      distance: '4 miles away'
    },
    education: 'Parsons School of Design',
    job: 'Fashion Designer'
  },
  {
    id: '8',
    name: 'Isabella',
    age: 25,
    verified: true,
    online: true,
    images: [
      'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2705089/pexels-photo-2705089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    bio: "Healthcare professional who loves salsa dancing and weekend getaways. Looking for someone with a good sense of humor.",
    interests: [
      { icon: '💉', label: 'Healthcare' },
      { icon: '💃', label: 'Salsa' },
      { icon: '✈️', label: 'Travel' },
      { icon: '🤣', label: 'Comedy' },
    ],
    location: {
      latitude: 40.7421,
      longitude: -73.9911,
      city: 'New York',
      distance: '2 miles away'
    },
    education: 'Johns Hopkins',
    job: 'Nurse Practitioner'
  }
];