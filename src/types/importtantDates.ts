// export type NotificationStatus = "Done" | "Pending";

export interface DateField {
  current: string;
  previous: string | null;
  isCancelled: boolean;
}

export interface Batch {
  batchNo: string;
  paperSubmission: DateField;
  notificationOfAcceptance: DateField;
  registration: DateField;
  regularRegistrationDeadline: DateField;
  uploadFinalManuscript: DateField;
}

export interface ImportantDates {
  submissionType: string;
  batch: Batch[];
  conferenceDate: string;
}

export type DateFieldKey =
  | "paperSubmission"
  | "registration"
  | "uploadFinalManuscript";
