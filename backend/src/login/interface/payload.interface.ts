import { Rol } from 'src/rol/model/rol.model';

export interface PayloadInterface {
  uuid: string;
  userType: 'user Admin' | 'Superadmin';
  name: string;
  telephone: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
  deleteAt: Date;
  roles: Rol[];
}
