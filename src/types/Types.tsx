export type Person = {
  _id: string | number;
  name: string;
  age: number;
  groups: string[];
  __v: number;
};

export type Group = {
  _id: string | number;
  groupName: string;
  persons: string[];
  groups: string[];
  fathers: string[];
  __v: number;
};

export type ID = {
  id: string | number;
};
