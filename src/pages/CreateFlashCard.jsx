// In this page we created the createflashcard page in this pages we created input
// boxes of group name , group description , upload image  for the card add term input box and add defination and some feature buttons to

// this form is created with the help of  React Formik and React Icons

import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../validations/schema/CardSchema";
import { nanoid } from "nanoid";
import {
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../app/feature/flashcardSlice";
import TextError from "../validations/customErrorForm/TextError";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);
  const editRef = useRef(null);
  const [groupImg, setGroupImg] = useState("");

  // code for dispatch the values to the store  and
  // reset form and group img on the click on submit(create button)
  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
  };

  return (
    <Formik
      // Decleare the initialValues  for form input boxes
      initialValues={{
        groupid: nanoid(),
        groupname: "",
        groupdescription: "",
        groupimg: null,
        cards: [
          {
            cardid: nanoid(),
            cardname: "",
            carddescription: "",
          },
        ],
      }}
      // yup validation
      validationSchema={FlashCardSchema}
      onSubmit={addFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="w-full space-y-5 text-black-600 text-bold font-medium">
          <div className="md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3">
              <div className="flex flex-col relative">
                <label htmlFor="createGroup">Create Group *</label>
                <Field
                  type="text"
                  name="groupname"
                  id="createGroup"
                  placeholder=" Enter Group Name "
                  className="border-gray-300 md:w-96 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                />
                <ErrorMessage component={TextError} name="groupname" />
              </div>
              {/*  this code will cheack if groupImg is thare and it will render an img element with the src attribute set to groupImg and the alt attribute set to "groupImg"  */}
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="groupImg"
                  className="w-28 h-28 object-contain"
                />
              ) : (
                //  if groupImg is not thare than it will show the upload image button
                <button
                  type="button"
                  onClick={() => filePickerRef.current.click()}
                  // The file picker is implemented as an input element of type "file", which is hidden from view but can be triggered when the button is clicked.
                  className={`md:flex items-center px-10 py-2 mt-6 bg-white border-2 border-slate-300 active:border-blue-600 text-blue-700 font-semibold rounded-md space-x-2 `}
                >
                  <AiOutlineUpload className="w-6 h-6" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    ref={filePickerRef}
                    value={groupImg}
                    // When a file is selected, the onChange event handler is triggered.
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      // This handler reads the selected file, converts it to a data URL, and sets the result as the value of the groupimg field using the setFieldValue function.
                      reader.onload = () => {
                        setFieldValue("groupimg", reader.result);
                        // The groupImg state is also updated with the new image data URL using the setGroupImg function.
                        setGroupImg(reader.result);
                      };
                    }}
                    hidden
                  />
                </button>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-[70%]">
              <label htmlFor="addDescription" className="mb-2">
                Add Description
              </label>
              <Field
                as="textarea"
                name="groupdescription"
                id="addDescription"
                rows={3}
                placeholder="Enter  Group  Description "
                className="resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
              />
              <ErrorMessage component={TextError} name="groupdescription" />
            </div>
          </div>

          {/*----------------------- Add more terms , defination   ----------------------- */}

          <div className="text-black drop-shadow-lg ">
            <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards;
                return (
                  <div>
                    {/* if cards and cards .length is greater than  zero than maping the cards and set index as a key for all cards  other wise set null  */}
                    {cards && cards.length > 0
                      ? cards.map((cards, index) => (
                          <div
                            className="flex rounded-t-lg items-center space-x-10 bg-white px-5 lg:px-10 py-4"
                            key={index}
                          >
                            {/* this will show the number of cards using index key value */}
                            <div className="w-8 h-8 px-5 py-5 flex items-center justify-center bg-red-600 text-white text-md font-semibold rounded-full opacity-95 ">
                              {index + 1}
                            </div>
                            <div className="flex flex-col space-y-3 md:space-x-10 md:flex-row">
                              <div className="relative flex flex-col justify-center space-y-3">
                                <label htmlFor="enterTerm" className="">
                                  Enter Term
                                </label>
                                <Field
                                  type="text"
                                  id="enterTerm"
                                  // It is a dynamically generated string that specifies the name of a form field.
                                  name={`cards.${index}.cardname`}
                                  innerRef={editRef}
                                  placeholder="Enter Terms "
                                  className="border-gray-300 md:w-56 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.cardname`}
                                />
                              </div>
                              <div className="relative flex flex-col justify-center space-y-3">
                                <label htmlFor="enterDefinaton" className="">
                                  Enter Defination
                                </label>
                                <Field
                                  as="textarea"
                                  id="enterDefination"
                                  // It is a dynamically generated string that specifies the name of a form field.
                                  name={`cards.${index}.carddescription`}
                                  placeholder="Enter Defination "
                                  className=" lg:w-72  resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.carddescription`}
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <button
                                  className={`hidden lg:flex lg:items-center lg:w-[19rem] px-2 py-2 bg-white border-2 border-blue-600 active:border-slate-300 text-blue-700 font-semibold rounded-md space-x-2 `}
                                  disabled={true}
                                >
                                  <span> + Select Image</span>
                                </button>
                                <div className="flex items-center justify-around w-full md:flex-col md:space-y-5 md:mt-5">
                                  {/* Delete button for cards created with the help of arrayhelper and indexing */}
                                  <button
                                    type="button"
                                    onClick={() => arrayHelper.remove(index)}
                                  >
                                    <AiOutlineDelete className="w-7 h-7  text-black-500" />
                                  </button>
                                  {/*  Edit button  */}
                                  <button
                                    type="button"
                                    onClick={() => editRef.current.focus()}
                                  >
                                    <AiOutlineEdit className="h-7 w-7 text-blue-700" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    <div className="bg-white rounded-b-lg flex w-full  mb-10 px-5 py-2">
                      {/* button for create more input fields  */}
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelper.push({
                            cardid: nanoid(),
                            cardname: "",
                            carddescription: "",
                          })
                        }
                        className="flex items-center space-x-2 text-blue-600  text-md   mb-5 mt-0 "
                      >
                        <AiOutlinePlus />
                        <span>Add More</span>
                      </button>
                    </div>
                    <div className="flex justify-center w-full">
                      {/*  Submit button ( create ) */}
                      <button
                        onSubmit={isSubmitting ? values : undefined}
                        type="submit"
                        className="py-2 px-6  bg-red-600 text-white rounded-md mb-10"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
