import React from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import People from "../interfaces/People";
import { addPeopleToEvent } from "../Services/eventServices";
import { getAllGroup } from "../Services/GroupServices";
import Group from "../interfaces/Group";
import { useParams } from "react-router-dom";
import GloabSeclModal from "./GloabSeclModal";

interface AddPeopleProps {
  setPeopleChanged: (changed: boolean) => void;
  peopleChanged: boolean;
}

/**
 * Add people form with validation, loading, and error handling
 */
const AddPeople: FunctionComponent<AddPeopleProps> = ({
  setPeopleChanged,
  peopleChanged,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();
  let groupKey = 0;

  useEffect(() => {
    getAllGroup(eventId as string)
      .then((res) => setGroups(res.data))
      .catch((e) => setError("Failed to load groups"));
  }, [eventId]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      firstName: "",
      lastName: "",
      NumberOfGuests: 0,
      NumberOfGuestsAccept: 0,
      eventGroupName: "",
    },
    validationSchema: yup.object({
      phoneNumber: yup.string().required("Phone number is required").min(2),
      firstName: yup.string().required("First name is required").min(2),
      lastName: yup.string().required("Last name is required").min(2),
      NumberOfGuests: yup
        .number()
        .required("Number of guests is required")
        .positive(),
      eventGroupName: yup.string().required("Group is required"),
    }),
    onSubmit: async (values: People, { resetForm }) => {
      setIsLoading(true);
      setError(null);
      try {
        await addPeopleToEvent(eventId as string, values);
        successMessage("Person added successfully");
        resetForm();
        setPeopleChanged(!peopleChanged);
      } catch (e) {
        setError("Failed to add person");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        noValidate>
        <div className='form-floating mb-3'>
          <input
            type='tel'
            className='form-control'
            id='phoneNumber'
            placeholder='Phone Number'
            name='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          <label htmlFor='phoneNumber'>Phone Number</label>
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <small className='text-danger'>{formik.errors.phoneNumber}</small>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='firstName'
            placeholder='First Name'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          <label htmlFor='firstName'>First Name</label>
          {formik.touched.firstName && formik.errors.firstName && (
            <small className='text-danger'>{formik.errors.firstName}</small>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='lastName'
            placeholder='Last Name'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          <label htmlFor='lastName'>Last Name</label>
          {formik.touched.lastName && formik.errors.lastName && (
            <small className='text-danger'>{formik.errors.lastName}</small>
          )}
        </div>
        <div className='form-floating mb-3'>
          <span>
            <button
              type='button'
              className='w-25 btn btn-outline-primary'
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}>
              Add Group
            </button>
            <select
              className='form-control'
              id='eventGroupName'
              name='eventGroupName'
              value={formik.values.eventGroupName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={isLoading}>
              <option hidden>Choose a Group...</option>
              {groups.map((group: Group) => (
                <option
                  key={groupKey++}
                  value={group.eventGroupName}>
                  {group.eventGroupName}
                </option>
              ))}
            </select>
          </span>
          {formik.touched.eventGroupName && formik.errors.eventGroupName && (
            <small className='text-danger'>
              {formik.errors.eventGroupName}
            </small>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            type='number'
            className='form-control'
            id='NumberOfGuests'
            placeholder='Number Of Guests'
            name='NumberOfGuests'
            value={formik.values.NumberOfGuests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
          />
          <label htmlFor='NumberOfGuests'>Number Of Guests</label>
          {formik.touched.NumberOfGuests && formik.errors.NumberOfGuests && (
            <small className='text-danger'>
              {formik.errors.NumberOfGuests}
            </small>
          )}
        </div>
        {error && <div className='alert alert-danger mt-2'>{error}</div>}
        <button
          type='submit'
          className='btn btn-warning w-100 my-3'
          disabled={!formik.isValid || isLoading}>
          {isLoading ? (
            <i className='fa-solid fa-spinner fa-spin'></i>
          ) : (
            <i className='fa-solid fa-plus'></i>
          )}{" "}
          ADD
        </button>
      </form>
      <GloabSeclModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        groupChange={peopleChanged}
        setGroupChanged={setPeopleChanged}
      />
    </div>
  );
};

export default AddPeople;
