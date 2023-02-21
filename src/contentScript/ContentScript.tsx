import React, { useCallback, useEffect, useState } from "react";
import X from "../shared/Svg/X";
import { getAllCategories } from "../firebase/db/categories";
import { ICategoryData, IPromptData } from "../globals/types";
import ChevronRight from "../shared/Svg/ChevronRight";
import ArrowLeft from "../shared/Svg/ArrowLeft";
import { getAllPromptsByCategoryId } from "../firebase/db/prompt";

const ContentScript = () => {
  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const [categoryPrompts, setCategoryPrompts] = useState<IPromptData[]>([]);
  const [closeDiv, setCloseDiv] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadCategories = useCallback(async () => {
    try {
      const categories = await getAllCategories();
      setCategories(categories);
    } catch (err) {
      console.log("error in loading categories");
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const toggleDiv = () => setCloseDiv(!closeDiv);

  const chipMap = categoryPrompts.length ? categoryPrompts : categories;

  const onClickCategoryChip = async (categoryData: ICategoryData) => {
    // load all prompts according to category
    setLoading(true);
    try {
      const allPrompts = await getAllPromptsByCategoryId(categoryData.id);
      console.log("allPrompts ", allPrompts);
      setCategoryPrompts(allPrompts);
    } catch (err) {
      console.log("error in fetching prompts by category name", err);
    }
    setLoading(false);
  };
  const onClickPromptChip = (promptData: IPromptData) => {
    // insert prompt into text area

    const textAreaEl = document.querySelector(
      "[data-id^='root']"
    ) as HTMLTextAreaElement;

    if (!textAreaEl) {
      return console.log(
        "unable to locate textarea. Please consult to admin for this case"
      );
    }

    let val = "";
    const splitText = promptData.prompt.split(".");

    textAreaEl.value = promptData.prompt;
    textAreaEl.focus();
    textAreaEl.selectionStart = textAreaEl.value.length;
    textAreaEl.style.height = "auto";
    textAreaEl.rows = splitText.length;
  };

  const removeCategoryPrompts = () => setCategoryPrompts([]);

  return (
    <div
      style={{
        position: "absolute",
        width: closeDiv ? "10%" : "100%",
        color: "white",
        top: -70,
        left: 0,
      }}
    >
      <div className="flex space-between items-center">
        {!closeDiv && (
          <div style={{ width: "100%", margin: "auto", overflowX: "auto" }}>
            <div className="flex items-center">
              {!loading
                ? chipMap.map((chipItem) => (
                    <div
                      key={chipItem.id}
                      className="bg-chipbg text-white whitespace-nowrap py-2 px-3 rounded-2xl cursor-pointer mr-2"
                      onClick={() => {
                        console.log("chipItem ", chipItem);
                        if (chipItem.name) {
                          return onClickCategoryChip(chipItem);
                        }
                        return onClickPromptChip(chipItem);
                      }}
                    >
                      {chipItem.heading || chipItem.name}
                    </div>
                  ))
                : "Please wait..."}
            </div>
          </div>
        )}
        {!!categories.length && (
          <div className="ml-1 cursor-pointer">
            <div className="flex items-center">
              {closeDiv ? (
                <h3 className="mr-1" onClick={toggleDiv}>
                  Open
                </h3>
              ) : (
                !!categoryPrompts.length && (
                  <ArrowLeft onClick={removeCategoryPrompts} />
                )
              )}
              {closeDiv ? (
                <ChevronRight onClick={toggleDiv} />
              ) : (
                <X onClick={toggleDiv} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentScript;
