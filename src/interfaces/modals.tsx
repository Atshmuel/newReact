import { PerName } from "./person";

export interface modalProp {
  toggleModal: () => void;
  name: PerName | string | undefined;
  type: string;
}
