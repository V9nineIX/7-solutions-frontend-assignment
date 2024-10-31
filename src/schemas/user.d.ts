interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  };
}

interface Department {
  [department: string]: {
    male: number;
    female: number;
    ageRange: string;
    hair: {
      [color: string]: number;
    };
    addressUser: {
      [key: string]: string;
    };
  };
}

export { User, Department };
