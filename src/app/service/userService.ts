import axios from "axios";
import { User, Department } from "../../schemas/user";

const BASE_URL = "https://dummyjson.com";
export const USERS_ENDPOINT = `${BASE_URL}/users`;

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(USERS_ENDPOINT);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const groupUsersByDepartment = (users: User[]): Department => {
  return users.reduce((acc: Department, user: User) => {
    const dept = user.company.department;

    if (!acc[dept]) {
      acc[dept] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    // Update gender count
    if (user.gender === "male") {
      acc[dept].male++;
    } else if (user.gender === "female") {
      acc[dept].female++;
    }

    // Update hair color count
    const hairColor = user.hair.color;
    acc[dept].hair[hairColor] = (acc[dept].hair[hairColor] || 0) + 1;

    // Update address user mapping
    acc[dept].addressUser[`${user.firstName} ${user.lastName}`] =
      user.address.postalCode;

    // Calculate age range after processing all users in the department
    const ages = users
      .filter((u) => u.company.department === dept)
      .map((u) => u.age)
      .sort((a, b) => a - b);

    const minAge = ages[0];
    const maxAge = ages[ages.length - 1];
    acc[dept].ageRange = `${minAge}-${maxAge}`;

    return acc;
  }, {});
};
