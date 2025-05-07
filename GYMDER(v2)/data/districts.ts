export interface District {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  polygon: Array<{
    latitude: number;
    longitude: number;
  }>;
  users: Array<{
    id: string;
    name: string;
    age: number;
    images: string[];
    verified: boolean;
    online: boolean;
  }>;
}

export const districts: District[] = [
  {
    id: '1',
    name: 'Kadıköy',
    coordinates: {
      latitude: 40.9923,
      longitude: 29.0277,
    },
    polygon: [
      { latitude: 40.9923, longitude: 29.0277 },
      { latitude: 40.9923, longitude: 29.0377 },
      { latitude: 40.9823, longitude: 29.0377 },
      { latitude: 40.9823, longitude: 29.0277 },
      { latitude: 40.9923, longitude: 29.0277 },
    ],
    users: [
      {
        id: '1',
        name: 'Ayşe',
        age: 25,
        images: ['https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg'],
        verified: true,
        online: true,
      },
      {
        id: '2',
        name: 'Mehmet',
        age: 28,
        images: ['https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg'],
        verified: false,
        online: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Beşiktaş',
    coordinates: {
      latitude: 41.0422,
      longitude: 29.0083,
    },
    polygon: [
      { latitude: 41.0422, longitude: 29.0083 },
      { latitude: 41.0422, longitude: 29.0183 },
      { latitude: 41.0322, longitude: 29.0183 },
      { latitude: 41.0322, longitude: 29.0083 },
      { latitude: 41.0422, longitude: 29.0083 },
    ],
    users: [
      {
        id: '3',
        name: 'Zeynep',
        age: 24,
        images: ['https://images.pexels.com/photos/3095439/pexels-photo-3095439.jpeg'],
        verified: true,
        online: false,
      },
    ],
  },
  {
    id: '3',
    name: 'Üsküdar',
    coordinates: {
      latitude: 41.0235,
      longitude: 29.0126,
    },
    polygon: [
      { latitude: 41.0235, longitude: 29.0126 },
      { latitude: 41.0235, longitude: 29.0226 },
      { latitude: 41.0135, longitude: 29.0226 },
      { latitude: 41.0135, longitude: 29.0126 },
      { latitude: 41.0235, longitude: 29.0126 },
    ],
    users: [
      {
        id: '4',
        name: 'Ali',
        age: 27,
        images: ['https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg'],
        verified: true,
        online: true,
      },
    ],
  },
  {
    id: '4',
    name: 'Şişli',
    coordinates: {
      latitude: 41.0602,
      longitude: 28.9877,
    },
    polygon: [
      { latitude: 41.0602, longitude: 28.9877 },
      { latitude: 41.0602, longitude: 28.9977 },
      { latitude: 41.0502, longitude: 28.9977 },
      { latitude: 41.0502, longitude: 28.9877 },
      { latitude: 41.0602, longitude: 28.9877 },
    ],
    users: [
      {
        id: '5',
        name: 'Deniz',
        age: 26,
        images: ['https://images.pexels.com/photos/1124466/pexels-photo-1124466.jpeg'],
        verified: false,
        online: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Beyoğlu',
    coordinates: {
      latitude: 41.0370,
      longitude: 28.9850,
    },
    polygon: [
      { latitude: 41.0370, longitude: 28.9850 },
      { latitude: 41.0370, longitude: 28.9950 },
      { latitude: 41.0270, longitude: 28.9950 },
      { latitude: 41.0270, longitude: 28.9850 },
      { latitude: 41.0370, longitude: 28.9850 },
    ],
    users: [
      {
        id: '6',
        name: 'Can',
        age: 29,
        images: ['https://images.pexels.com/photos/3095439/pexels-photo-3095439.jpeg'],
        verified: true,
        online: false,
      },
    ],
  },
]; 