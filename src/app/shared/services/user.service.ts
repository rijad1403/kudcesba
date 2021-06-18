import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = [
    {
      id: 1,
      name: 'Mujo Mujic',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjx4UieqE-Bepuju7kdcIqS8OWWqaxW3K90A&usqp=CAU',
      rating: '5,0',
    },
    {
      id: 2,
      name: 'Suljo Suljic',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lvcb27aJRUsvtQwAasjUB9z7Wf-XaVwr5w&usqp=CAU',
    },
    {
      id: 3,
      name: 'Alaga Alagić',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgIUF7SE6CROioPfFm3jxwN5cPMxD_MobRdw&usqp=CAU',
      rating: '4,0',
    },
  ];

  constructor() {}

  getAll() {
    return this.users;
  }

  getByID(userId: number) {
    return this.users.find((user) => user.id === userId);
  }
}
