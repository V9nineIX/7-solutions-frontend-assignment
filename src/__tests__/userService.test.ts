import { fetchUsers, groupUsersByDepartment } from "@/app/service/userService";
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
    it("should transform users data grouped by department", () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          department: "Engineering",
          company: {
            name: "Tech Corp",
            title: "Software Engineer",
          },
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          department: "Engineering",
          company: {
            name: "Tech Corp",
            title: "Senior Engineer",
          },
        },
        {
          id: 3,
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob@example.com",
          department: "Marketing",
          company: {
            name: "Tech Corp",
            title: "Marketing Manager",
          },
        },
      ];

      const expected = {
        Engineering: {
          count: 2,
          users: [
            {
              id: 1,
              firstName: "John",
              lastName: "Doe",
              email: "john@example.com",
              department: "Engineering",
              company: {
                name: "Tech Corp",
                title: "Software Engineer",
              },
            },
            {
              id: 2,
              firstName: "Jane",
              lastName: "Smith",
              email: "jane@example.com",
              department: "Engineering",
              company: {
                name: "Tech Corp",
                title: "Senior Engineer",
              },
            },
          ],
        },
        Marketing: {
          count: 1,
          users: [
            {
              id: 3,
              firstName: "Bob",
              lastName: "Johnson",
              email: "bob@example.com",
              department: "Marketing",
              company: {
                name: "Tech Corp",
                title: "Marketing Manager",
              },
            },
          ],
        },
      };

      const result = groupUsersByDepartment(mockUsers);
      expect(result).toEqual(expected);
    });

    it("should handle empty users array", () => {
      const result = groupUsersByDepartment([]);
      expect(result).toEqual({});
    });
  });
});
