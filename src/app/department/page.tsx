
import Department from './department';
import { fetchUsers } from "../service/userService";

export const metadata = {
  title: 'department',
};


export default async function Page() {

  const users = await fetchUsers();
  // console.log('Server-side: Data fetched:', users);

  return (

    <Department initialData={users} />

  );
}
