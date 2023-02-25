import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Group from "../../interfaces/Group";
import { successMessage } from "../../services/FeedbackService";
import { addNewGroup } from "../../services/GroupServices";


interface AddGroupProps {
    setGroupChanged: Function;
    groupChanged: boolean;
}

const AddGroup: FunctionComponent<AddGroupProps> = ({ setGroupChanged, groupChanged }) => {
    let { eventId } = useParams();

    let formik = useFormik({
        initialValues: { eventGroupName: "" },
        validationSchema: yup.object({
            eventGroupName: yup.string().required().min(2),
        }),
        onSubmit: (values: any, { resetForm }) => {
            addNewGroup(eventId as string, values).then((res) => {
                successMessage("Event Added");
                resetForm();

                // רענון
                setGroupChanged(!groupChanged);
            })
                .catch((e) => console.log(e))

        }
    })
    return (<>
        <div>
            <h5 className="">Add Guest- pepole interface</h5>
            <form onSubmit={formik.handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="eventGroupName"
                        placeholder="textme"
                        name="eventGroupName"
                        value={formik.values.eventGroupName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="eventGroupName">Group Name</label>
                    {/* {formik.touched.eventGroupName && formik.errors.eventGroupName && (
                        <small className="text-danger">{formik.errors.eventGroupName}</small>
                    )} */}
                </div>





                <button type="submit" className="btn btn-warning w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-plus"></i>  ADD</button>
            </form>
        </div >


    </>);
}

export default AddGroup;