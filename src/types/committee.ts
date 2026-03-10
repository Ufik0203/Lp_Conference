export interface CommitteeMember {
  _id: string;
  order: number;
  name: string;
  university: string;
  country: string;
}

export interface CommitteeSection {
  image_url: string;
  image_public_id: string;
  members: CommitteeMember[];
}

export interface TPCSection {
  _id: string;
  order: number;
  title: string;
  members: CommitteeMember[];
}

export interface TechnicalProgramCommittee {
  image_url: string;
  image_public_id: string;
  sections: TPCSection[];
}

export interface CommitteeInterface {
  steeringCommittee: CommitteeSection;
  organizingCommittee: CommitteeSection;
  technicalProgramCommittee: TechnicalProgramCommittee;
  technicalCommittee: CommitteeSection;
  technicalSupport: CommitteeSection;
}

export type CommitteeSectionKey =
  | "steeringCommittee"
  | "organizingCommittee"
  | "technicalProgramCommittee"
  | "technicalCommittee"
  | "technicalSupport";

export interface CommitteeResponse {
  message: string;
  data: CommitteeInterface;
}
