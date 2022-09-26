export interface IAccordionAction<T> {
  expanded: T;
  setExpanded: React.Dispatch<React.SetStateAction<T>>;
  isEng: boolean;
}
