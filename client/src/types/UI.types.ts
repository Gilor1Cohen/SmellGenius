import type {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

import type {
  BuyingRecommendationsData,
  PerfumeInformationResData,
  ShortPerfume,
} from "./Perfumes.types";

export interface GoldBtnProps {
  text: string;
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: FieldError;
  defaultValue?: any;
}

export interface SelectGenderProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  errors?: FieldError;
}

export interface EditProfileProps {
  setEditUserDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface EditPasswordProps {
  setEditPassword: React.Dispatch<React.SetStateAction<boolean>>;
  editPasswordLoading: boolean;
  setEditPasswordLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PerfumeHomeItemProps {
  Perfume: string;
  Year: number;
  Brand: string;
  Country: string;
}

export interface PerfumeInformationProps {
  data: PerfumeInformationResData;
  loading: boolean;
  like: boolean;
  onLike: (perfumeName: string) => Promise<void>;
}

export interface SituationCardProps {
  text: string;
  onClick: () => void;
}

export interface PerfumeCardProps {
  p: ShortPerfume;
  idx: number;
  slug: string;
}

export interface BuyingRecommendationsBoxProps {
  title: string;
  data: BuyingRecommendationsData;
}
