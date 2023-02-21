import {
  collection,
  getDocs,
  where,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

import { getCategoryById, getCategoryByName } from "./categories";

import { db } from "../firebaseConfig";
import { CollectionTypes, IPromptData } from "../../globals/types";

const promptCollectionRef = collection(db, "prompts");

export const getAllPromptsByCategoryId = async (id: string) => {
  const q = query(
    promptCollectionRef,
    where("categoryIds", "array-contains", id),
    where("approved", "==", true)
  );
  const result = await getDocs(q);
  return getAllPrompts(result);
};

export const getAllPromptsByApprovedStatus = async (status: boolean) => {
  const q = query(promptCollectionRef, where("approved", "==", status));
  const result = await getDocs(q);
  return getAllPrompts(result);
};

export const getAllPrompts = async (result?: QuerySnapshot<DocumentData>) => {
  let allResults = result;
  if (!allResults) {
    allResults = await getDocs(promptCollectionRef);
  }

  const returnDataMap = allResults.docs.map(async (doc) => {
    const data = doc.data();
    // get categoryDetails
    const categoriesMap = data.categoryIds.map(async (id: string) => {
      const categoryData = await getCategoryById(id);
      return categoryData;
    });
    const categories = await Promise.all(categoriesMap);

    delete data.categoryIds;
    delete data.userId;
    return {
      id: doc.id,
      categories,

      ...data,
    };
  });

  const returnData = await Promise.all(returnDataMap);
  return returnData as IPromptData[];
};

export const getAllPromptsSlugsOnly = async () => {
  const q = query(promptCollectionRef, where("approved", "==", true));
  const result = await getDocs(q);

  return result.docs.map((doc) => ({
    slug: doc.data().slug,
    id: doc.id,
  }));
};
