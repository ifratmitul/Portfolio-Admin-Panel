import { Photo } from "./Photo";

export interface Education {
  id: string;
  institution: string;
  startDate: Date;
  endDate: Date;
  degree: string;
  major: string;
  result: number;
  priority: number;
  logo: Photo;
}
