import { PerGroup, PerName } from "./person";

export interface modalProp {
  toggleModal: () => void;
  name: PerName | string | undefined;
  type: string;
}
export interface UpdateProps {
  toggleModal: () => void;
  id: string;
  name: PerName | string;
  age: PerName | number;
  groups: PerGroup | string[];
}
