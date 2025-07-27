import React from "react";
import { FunctionComponent, useEffect, useId, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import Event from "../interfaces/EventInterface";
import { addEvent } from "../Services/eventServices";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getAllSentences } from "../Services/sentencesServices";

interface NewCampaignProps {}

const NewCampaign: FunctionComponent<NewCampaignProps> = () => {
  const [imageSelected, setImageSelected] = useState<any>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [allweddingSentence, setAllweddingSentence] = useState<any[]>([]);
  let navigate = useNavigate();
  let uuidLidor = uuidv4();
  let formik = useFormik({
    initialValues: {
      campaignName: "",
      ownerName: "",
      phone: "",
      uuid: uuidLidor,
      bride: "",
      groom: "",
      groomParents: "",
      brideParents: "",
      coupleImage: "",
      weddingSentence: "",
      weddingDate: "",
      eventsHall: "",
    },
    validationSchema: yup.object({
      campaignName: yup
        .string()
        .required("Campaign name is a required field")
        .min(2),
      bride: yup
        .string()
        .required("brige name is a required field")
        .min(2)
        .max(10),
      groom: yup
        .string()
        .required("groom name is a required field")
        .min(2)
        .max(10),
      groomParents: yup
        .string()
        .required("groom Parents name is a required field")
        .min(2)
        .max(30),
      brideParents: yup
        .string()
        .required("bride Parents name is a required field")
        .min(2)
        .max(30),
      phone: yup
        .number()
        .required("Phone number is a required field")
        .min(10)
        .positive(),
      eventsHall: yup
        .string()
        .required("Events Hall is a required field")
        .min(3),
      weddingSentence: yup.string().required(),
      weddingDate: yup.date().required(),
      ownerName: yup
        .string()
        .required("Owner Campaign is a required field")
        .min(2),
    }),
    onSubmit: (values: Event, { resetForm }) => {
      const Authorization = sessionStorage.getItem("Authorization");
      addEvent(values, Authorization as string)
        .then((res) => {
          successMessage("Event Added");
          resetForm();
          // שינוי תצוגה מ0 אל כלום
          formik.setFieldValue("phone", "");
          localStorage.removeItem("uuid");
          localStorage.setItem("uuid", JSON.stringify(res.data._id));

          navigate(`/campaign/${res.data._id}`);
        })
        .catch((e) => console.log(e));
    },
  });

  // שינוי תצוגה מ0 אל כלום
  useEffect(() => {
    getAllSentences().then((res) => setAllweddingSentence(res.data));
    formik.setFieldValue("phone", "");
  }, []);
  return (
    <>
      <div className='container'>
        <h5 className='display-5'>Add New Event</h5>
        <form onSubmit={formik.handleSubmit}>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='campaignName'
              placeholder='Harry Potter'
              name='campaignName'
              value={formik.values.campaignName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='campaignName'>campaign name</label>
            {formik.touched.campaignName && formik.errors.campaignName && (
              <small className='text-danger'>
                {formik.errors.campaignName}
              </small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='ownerName'
              placeholder='textme'
              name='ownerName'
              value={formik.values.ownerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='ownerName'>owner name</label>
            {formik.touched.ownerName && formik.errors.ownerName && (
              <small className='text-danger'>{formik.errors.ownerName}</small>
            )}
          </div>

          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='groom'
              placeholder='textme'
              name='groom'
              value={formik.values.groom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='groom'>groom חתן</label>
            {formik.touched.groom && formik.errors.groom && (
              <small className='text-danger'>{formik.errors.groom}</small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='bride'
              placeholder='textme'
              name='bride'
              value={formik.values.bride}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='bride'>bride כלה</label>
            {formik.touched.bride && formik.errors.bride && (
              <small className='text-danger'>{formik.errors.bride}</small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='tel'
              className='form-control'
              id='phone'
              placeholder='0525552555'
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='phone'>Owner Phone</label>
            {formik.touched.phone && formik.errors.phone && (
              <small className='text-danger'>{formik.errors.phone}</small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='groomParents'
              placeholder='0525552555'
              name='groomParents'
              value={formik.values.groomParents}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='groomParents'>הורי החתן Groom Parents</label>
            {formik.touched.groomParents && formik.errors.groomParents && (
              <small className='text-danger'>
                {formik.errors.groomParents}
              </small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='brideParents'
              placeholder='0525552555'
              name='brideParents'
              value={formik.values.brideParents}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='brideParents'>הורי הכלה Bride Parents</label>
            {formik.touched.brideParents && formik.errors.brideParents && (
              <small className='text-danger'>
                {formik.errors.brideParents}
              </small>
            )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className='form-control'
              id='eventsHall'
              placeholder='events Hall'
              name='eventsHall'
              value={formik.values.eventsHall}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='eventsHall'>Events Hall</label>
            {formik.touched.eventsHall && formik.errors.eventsHall && (
              <small className='text-danger'>{formik.errors.eventsHall}</small>
            )}
          </div>

          <div className='form-floating mb-3'>
            <select
              className='form-control'
              id='weddingSentence'
              name='weddingSentence'
              value={formik.values.weddingSentence}
              onChange={formik.handleChange}>
              <option
                value=''
                disabled
                hidden>
                בחר משפט
              </option>
              {allweddingSentence.map((sentence: any) => (
                <option
                  key={sentence.weddingSentence}
                  value={sentence.weddingSentence}>
                  {" "}
                  {sentence.weddingSentence}
                </option>
              ))}
            </select>
            <label htmlFor='weddingSentence'>Group</label>
            {formik.touched.weddingSentence &&
              formik.errors.weddingSentence && (
                <small className='text-danger'>
                  {formik.errors.weddingSentence}
                </small>
              )}
          </div>
          <div className='form-floating mb-3'>
            <input
              type='date'
              className='form-control'
              id='weddingDate'
              placeholder='0525552555'
              name='weddingDate'
              value={formik.values.weddingDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor='weddingDate'>wedding Date</label>
            {formik.touched.weddingDate && formik.errors.weddingDate && (
              <small className='text-danger'>{formik.errors.weddingDate}</small>
            )}
          </div>

          <button
            type='submit'
            className='btn btn-success w-100 my-3'
            disabled={!formik.isValid || !formik.dirty}>
            ADD New Campaign<i className='fa-solid fa-angles-right'></i>
          </button>
          {/* <i class=""></i> */}
        </form>
      </div>
    </>
  );
};

export default NewCampaign;
