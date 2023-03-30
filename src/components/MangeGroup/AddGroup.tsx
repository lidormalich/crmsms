import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Group from "../../interfaces/Group";
import { successMessage } from "../../Services/FeedbackService";
import { addNewGroup } from "../../Services/GroupServices";


interface AddGroupProps {
    setGroupChanged: Function;
    groupChanged: boolean;
    onHide: Function;
}

const AddGroup: FunctionComponent<AddGroupProps> = ({ setGroupChanged, groupChanged, onHide }) => {
    let { eventId } = useParams();

    let formik = useFormik({
        initialValues: { eventGroupName: "" },
        validationSchema: yup.object({
            eventGroupName: yup.string().required().min(2).max(25),
        }),
        onSubmit: (values: any, { resetForm }) => {
            addNewGroup(eventId as string, values).then((res) => {
                successMessage("Group Added");
                resetForm();
                // רענון
                setGroupChanged(!groupChanged);
                onHide();
            })
                .catch((e) => console.log(e))

        }
    })
    return (<>
        <div>

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

                </div>





                <button type="submit" className="btn btn-warning w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}><i className="fa-solid fa-plus"></i>  ADD</button>
            </form>
        </div >


    </>);
}

export default AddGroup;