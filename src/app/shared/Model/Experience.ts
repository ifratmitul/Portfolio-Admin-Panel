export interface Experience {
  id: string;
  company: string;
  position: string;
  responsibilities?: any;
  photoUrl: string;
  startDate: Date;
  endDate?: any;
}

export interface ExperiencePayload {
  id?: string | null;
  company: string;
  position: string;
  responsibilities?: any;
  PhotoFile?: File | null;
  startDate: Date;
  endDate?: Date | null;
}
