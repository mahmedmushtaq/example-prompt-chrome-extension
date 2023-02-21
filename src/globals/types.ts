export enum RoleTypes {
  user = "user",
  admin = "admin",
}

export type TGenericObj = { [key: string]: any };

export enum CollectionTypes {
  users = "users",
  categories = "categories",
  languages = "languages",
  prompts = "prompts",
}

export interface ICategoryData {
  id: string;
  name: string;
  description: string;
}

export interface ILanguageData {
  id: string;
  name: string;
}

export interface IPromptData {
  id: string;
  categories: ICategoryData[];
  heading: string;
  slug: string;
  langSymbol: string;
  approved: boolean;
  prompt: string;
  promptExample: string;
}
