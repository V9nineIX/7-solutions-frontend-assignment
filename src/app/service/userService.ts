import axios from "axios";
import { User, Department } from "@/schemas/user";

const BASE_URL = "https://dummyjson.com";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const groupUsersByDepartment = (users: User[]): Department => {
  return users.reduce((acc: Department, user: User) => {
    const dept = user.department;

    if (!acc[dept]) {
      acc[dept] = {
        count: 0,
        users: [],
      };
    }

    acc[dept].users.push(user);
    acc[dept].count++;

    return acc;
  }, {});
};
