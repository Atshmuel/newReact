export interface Person {
  _id: number | string;
  name: string;
  age: number;
  groups: string[];
  __v: number;
}

export interface PerId {
  id: number | string;
}
export interface PerName {
  name: string;
}
export interface PerAge {
  age: number;
}
export interface PerGroup {
  groups: [string];
}

export interface CreatePersonProps {
  closeCreateModal: () => void;
}

export interface ErrorType {
  message: string;
}

export interface createFrom {
  name: string;
  age: number;
  groups: string[];
  formData: () => {
    get: (key: string) => string | null;
  };
}
