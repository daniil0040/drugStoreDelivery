// export type User = {
//   uid: string;
//   displayName: string;
//   email: string;
//   photoURL: string;
// };

import { User } from 'firebase/auth';

export type TUser = Pick<User, 'email' | 'uid' | 'displayName' | 'photoURL'>;
