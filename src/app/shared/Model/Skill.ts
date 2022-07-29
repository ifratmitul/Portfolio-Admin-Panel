export interface Skill {
  id: string;
  skillName: string;
  rating: number;
  photoUrl: string;
}


export interface SkillPayload {
  skillName:string;
  photoFile: File;
}
