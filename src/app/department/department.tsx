'use client';

import { useUsers } from "./useUsers";
import { User } from "../../schemas/user";
import { groupUsersByDepartment } from "../service/userService";

interface UserProfileProps {
  initialData: User[];
}

export default function UserProfile({ initialData }: UserProfileProps) {
  const { data: users, error } = useUsers(initialData);

  if (error) {
    console.error('Client-side: Error in UserProfile:', error);
    return <div className="p-4 text-red-500">Error loading users: {error.message}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="p-4">No users found</div>;
  }

  const departmentStats = groupUsersByDepartment(users);


  return (
    <div className='space-y-6 p-4'>
      {Object.entries(departmentStats).map(([department, stats]) => (
        <div key={department} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">{department}</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Gender Distribution</h3>
              <p>Male: {stats.male}</p>
              <p>Female: {stats.female}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Age Range</h3>
              <p>{stats.ageRange}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Hair Colors</h3>
              {Object.entries(stats.hair).map(([color, count]) => (
                <p key={color}>{color}: {count}</p>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">User Address (Postal Codes)</h3>
              {Object.entries(stats.addressUser).map(([name, postalCode]) => (
                <p key={name}>{name}: {postalCode}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
