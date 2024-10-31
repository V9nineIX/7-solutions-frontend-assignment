import { Suspense } from 'react';
import Department from './department';
import { fetchUsers } from "../service/userService";

export const metadata = {
  title: 'department',
};

function Loading() {
  return <div className="p-4">Loading...</div>;
}

export default async function Page() {
  // console.log('Server-side: Fetching initial data');
  const users = await fetchUsers();
  // console.log('Server-side: Data fetched:', users);

  return (
    <Suspense fallback={<Loading />}>
      <Department initialData={users} />
    </Suspense>
  );
}
