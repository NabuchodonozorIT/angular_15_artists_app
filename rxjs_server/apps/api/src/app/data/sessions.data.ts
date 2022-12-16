import { SessionModel, ProfileModel } from "@core";

export const sessionsData: SessionModel[] = [
  {
    token: 'sdkfh247824kshfi2468iKJHi',
    user: {
      id: 1,
      name: 'Piotr',
      email: 'piotr@myflow.pl',
      password: '123'
    }
  },
  {
    token: 'khu68sd765&(*7yuIo(8^$#EG',
    user: {
      id: 2,
      name: 'Paweł',
      email: 'pawel@myflow.pl',
      password: '456'
    }
  }
];

export const profileData: ProfileModel[] = [
 {
  id: 1,
  userId: 1,
  description: 'Od 2007 roku zajmuje się programowaniem w technologiach webowych',
  photoUrl: 'https://randomuser.me/api/portraits/men/28.jpg'
 },
 {
  id: 2,
  userId: 2,
  description: 'Jest ogrodnikiem, nie lubi komputerów',
  photoUrl: 'https://randomuser.me/api/portraits/men/71.jpg'
 }
]
