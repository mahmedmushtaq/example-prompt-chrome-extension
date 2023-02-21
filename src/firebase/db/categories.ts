import { collection } from "firebase/firestore";

import { getAllData, getDataById, getDataByKeyField } from "./firebaseAbstractFile";
import { CollectionTypes, ICategoryData } from "../../globals/types";
import { db } from "../firebaseConfig";

const categoriesCollectionRef = collection(db, "categories");

export const getAllCategories = async () => {
  const allCategories = (await getAllData(
    categoriesCollectionRef
  )) as ICategoryData[];

  return allCategories;
};

export const getCategoryById = async (id: string) => {
  const result = await getDataById(CollectionTypes.categories, id);
  return result;
};

export const getCategoryByName = async (val: string) => {
  const result = await getDataByKeyField(
    CollectionTypes.categories,
    "name",
    val
  );
  return result;
};
