import React, { useState } from "react";
import { Button, Collapse, Card } from "react-bootstrap";
import useGetTemplateHelpers from "../../hooks/projects/useGetTemplateHelpers";
import TemplateProjectForm from "./TemplateProjectForm";

const MegaMenu = ({
  t,
  register,
  errors,
  control,
  categories,
  categoryId,
  setCategoryId,
  subCategories,
  setSubCategories,
  selectedOptions,
  handleSkillsChange,
  handleSubmit,
  isLoading,
  id,
  skills,
}) => {
  const [open1, setOpen1] = useState(false);
  const [selectedHelper, setSelectedHelper] = useState(null);
  const { data } = useGetTemplateHelpers();
  const [helperName, setHelperName] = useState(null);

  const handleClickHelperName = (help, helpName) => {
    setSelectedHelper(help);
    setHelperName(helpName);
  };
  console.log("mega menu +++++", {
    t,
    register,
    errors,
    control,
    categories,
    categoryId,
    setCategoryId,
    subCategories,
    setSubCategories,
    selectedOptions,
    handleSkillsChange,
    handleSubmit,
    isLoading,
    id,
    skills,
    data,
    selectedHelper,
    open1,
    helperName,
  });

  return (
    <div className="p-4">
      {!selectedHelper && (
        <div className="mb-3">
          {categories?.map((element, index) => (
            <div key={index}>
              <Button
                className="d-block"
                variant="transparent"
                onClick={() => {
                  setOpen1(open1 === index ? null : index);

                  // ✅ Store categoryId + subCategories
                  setCategoryId(element.id);
                  setSubCategories(element.sub_categories || []);
                }}
                aria-controls={`menu-${index}`}
                aria-expanded={open1 === index}
              >
                {element.name}
              </Button>

              <Collapse in={open1 === index}>
                <div id={`menu-${index}`} className="mt-2">
                  <Card body>
                    <div className="row">
                      {element.sub_categories.map((subCat) => (
                        <p
                          key={subCat.id}
                          className="cursor-pointer text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleClickHelperName(subCat, subCat.name);

                            // ✅ Store subCategoryId في الفورم مباشرة
                            control._updateProps?.onChange?.({
                              target: { value: subCat.id },
                            });
                          }}
                        >
                          {subCat.name}
                        </p>
                      ))}
                    </div>
                  </Card>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}

      {selectedHelper && (
        <TemplateProjectForm
          t={t}
          register={register}
          errors={errors}
          control={control}
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          subCategories={subCategories}
          setSubCategories={setSubCategories}
          selectedOptions={selectedOptions}
          handleSkillsChange={handleSkillsChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          id={id}
          skills={skills}
          helperName={helperName}
        />
      )}
    </div>
  );
};

export default MegaMenu;
