"use client";

import useSWR from "swr";
import { fetchUsers, USERS_ENDPOINT } from "../service/userService";
import { User } from "../../schemas/user";

const fetcher = async () => {
  try {
    const data = await fetchUsers();

    return data;
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw new Error("Failed to fetch users");
  }
};

export function useUsers(fallbackData?: User[]) {
  return useSWR<User[]>(USERS_ENDPOINT, fetcher, {
    fallbackData,
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    onSuccess: (data) => {
      console.log("Client-side: SWR cache updated:", data);
    },
  });
}
