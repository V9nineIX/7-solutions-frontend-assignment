"use client";

import useSWR from "swr";
import { fetchUsers, USERS_ENDPOINT } from "../service/userService";
import { User } from "../../schemas/user";

const fetcher = async () => {
  try {
    // console.log("Client-side: Fetching data");
    const data = await fetchUsers();
    // console.log("Client-side: Data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error in fetcher:", error);
    throw new Error("Failed to fetch users");
  }
};

export function useUsers(fallbackData?: User[]) {
  // console.log("Client-side: Using fallback data:", fallbackData);

  return useSWR<User[]>(USERS_ENDPOINT, fetcher, {
    fallbackData,
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    dedupingInterval: 5000, // Dedupe requests within 5 seconds
    refreshInterval: 30000, // Refresh data every 30 seconds
    onSuccess: (data) => {
      console.log("Client-side: SWR cache updated:", data);
    },
  });
}
