import { fetchUsers, groupUsersByDepartment } from "../app/service/userService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("userService", () => {
  describe("fetchUsers", () => {
    it("should fetch users successfully", async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          department: "Engineering",
          gender: "male",
          age: 25,
          hair: { color: "Black" },
          address: { postalCode: "12345" },
          company: {
            name: "Tech Corp",
            title: "Software Engineer",
          },
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: { users: mockUsers } });

      const result = await fetchUsers();
      expect(result).toEqual(mockUsers);
    });
  });

  describe("groupUsersByDepartment", () => {
    it("should transform users data grouped by department with statistics", () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "Terry",
          lastName: "Medhurst",
          email: "terry@example.com",
          gender: "male",
          age: 25,
          hair: { color: "Black" },
          address: { postalCode: "12345" },
          company: {
            department: "Engineering",
            name: "Tech Corp",
            title: "Software Engineer",
          },
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          gender: "female",
          age: 30,
          hair: { color: "Blond" },
          address: { postalCode: "67890" },
          company: {
            department: "Engineering",
            name: "Tech Corp",
            title: "Senior Engineer",
          },
        },
        {
          id: 3,
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@example.com",
          gender: "male",
          age: 35,
          hair: { color: "Brown" },
          address: { postalCode: "11111" },
          company: {
            department: "Marketing",
            name: "Tech Corp",
            title: "Marketing Manager",
          },
        },
      ];

      const expected = {
        Engineering: {
          male: 1,
          female: 1,
          ageRange: "25-30",
          hair: {
            Black: 1,
            Blond: 1,
          },
          addressUser: {
            TerryMedhurst: "12345",
            JaneSmith: "67890",
          },
        },
        Marketing: {
          male: 1,
          female: 0,
          ageRange: "35-35",
          hair: {
            Brown: 1,
          },
          addressUser: {
            BobJohnson: "11111",
          },
        },
      };

      const result = groupUsersByDepartment(mockUsers);
      expect(result).toEqual(expected);
    });

    it("should handle single user in department", () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "Terry",
          lastName: "Medhurst",
          email: "terry@example.com",
          gender: "male",
          age: 25,
          hair: { color: "Black" },
          address: { postalCode: "12345" },
          company: {
            department: "Engineering",
            name: "Tech Corp",
            title: "Software Engineer",
          },
        },
      ];

      const expected = {
        Engineering: {
          male: 1,
          female: 0,
          ageRange: "25-25",
          hair: {
            Black: 1,
          },
          addressUser: {
            TerryMedhurst: "12345",
          },
        },
      };

      const result = groupUsersByDepartment(mockUsers);
      expect(result).toEqual(expected);
    });
  });
});
