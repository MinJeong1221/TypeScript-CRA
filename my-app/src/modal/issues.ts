import { BadgeProps } from "../components/Badge";

export interface DataItem{
  login:string;
  title:string;
}

export interface Data{
  data:DataItem[];
}

export type List = Partial<DataItem> & {name : string};

export interface ListItemType { 
  id: string, 
  labels: BadgeProps[],
  state: 'open'| 'close',
  number :number,
  title : string,
  created_at : string,
  closed_at :string,
  user: {
    login : string
 }
}