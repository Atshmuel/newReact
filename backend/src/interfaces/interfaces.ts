import { ObjectId } from "mongoose";

export interface Person {
  name: string;
  age: number;
  groups: string[];
}

export interface ID {
  id: string | Object | ObjectId;
}

export interface Name {
  name: string;
}

export namespace Groups {
  export interface newGroup {
    groupName: string;
  }

  export interface isExistAlready {
    groups: string[];
  }
  export interface updateGroup {
    groupName: string;
    persons: string[];
    groups: string[];
  }
}
