interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  company: {
    name: string;
    title: string;
  };
}

interface Department {
  [department: string]: {
    count: number;
    users: User[];
    avgAge?: number;
  };
}

export { User, Department };
