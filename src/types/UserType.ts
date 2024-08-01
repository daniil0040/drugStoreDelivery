// export type User = {
//   uid: string;
//   displayName: string;
//   email: string;
//   photoURL: string;
// };

import { UserRoles } from '@/constants';
import { User } from 'firebase/auth';

export type TUser = Pick<User, 'email' | 'uid' | 'displayName' | 'photoURL'> & {
  role: UserRoles;
  phoneNumber: string | null;
};
