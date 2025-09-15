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
  console.log(data);

  return (
    <div className="p-4 bg-light">
      {!selectedHelper && (
        <div className="mb-3">
          {data?.map((element, index) => (
            <div key={index}>
              <Button
                className="d-block"
                variant="transparent"
                onClick={() => setOpen1(open1 === index ? null : index)}
                aria-controls={`menu-${index}`}
                aria-expanded={open1 === index}
              >
                {element.name}
              </Button>

              <Collapse in={open1 === index}>
                <div id={`menu-${index}`} className="mt-2">
                  <Card body>
                    <div className="row">
                      {element.helpers.map((help) => (
                        <p
                          key={help.id}
                          className="cursor-pointer text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedHelper(help)} 
                        >
                          {help.name}
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

      {/* لو في helper مختار اعرض TemplateProjectForm */}
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
        />
      )}
    </div>
  );
};

export default MegaMenu;
