export interface OverseasParticipant {
  bank: string;
  swiftCode: string;
  beneficiaryName: string;
  accountNo: string;
}

export interface LocalParticipant {
  bank: string;
  beneficiaryName: string;
  accountNo: string;
}

export interface RegistrationPayment {
  _id: string;
  bg_image_url: string;
  bg_image_public_id: string;
  overseasParticipant: OverseasParticipant;
  localParticipant: LocalParticipant;
  registrationLink: string;
  edasLink: string;
  presentationSlideLink: string;
  ieeConferenceTemplate?: string;
  latexConferenceTemplate?: string;
}
