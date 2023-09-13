export interface Group {
  _id: number | string;
  groupName: string;
  persons: string[];
  groups: string[];
  fathers: string[];
  __v: number;
}

export interface GroupId {
  id: number | string;
}
export interface GroupName {
  name: string;
}
export interface PersonsInGroup {
  id: number | string;
}
export interface GroupsInGroup {
  groups: string[];
}
