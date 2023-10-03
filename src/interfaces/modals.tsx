import { Group, Person } from "../types/Types";
import { PerName } from "./person";

export interface modalProp {
  toggleModal: () => void;
  name: PerName | string | undefined;
  type: string;
}
export interface UpdateProps {
  toggleModal: () => void;
  toggleUpdated: () => void;
  // info: { type: Group; i: "Group" } | { type: Person; i: "Person" };
  type: Group | Person;
  // type: "Group" | "Person";
}
