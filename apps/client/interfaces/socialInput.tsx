export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface SocialInputProps {
  platform: string;
  icon: any;
  label: string;
  placeholder: string;
  existingLink?: SocialLink;
  onAdd: (url: string) => void;
  onRemove: (id: string) => void;
}
