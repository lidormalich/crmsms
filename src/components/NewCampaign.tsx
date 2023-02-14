import { FunctionComponent, useEffect, useId } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMessage } from "../services/FeedbackService";
import Event from "../interfaces/EventInterface";
import { addEvent } from "../services/eventServices";
import { v4 as uuidv4 } from 'uuid';

interface NewCampaignProps {

}

const NewCampaign: FunctionComponent<NewCampaignProps> = () => {

    let navigate = useNavigate();
    let uuidLidor = uuidv4();
    let campaignId: number = 5;
    let formik = useFormik({
        initialValues: {
            campaignName: "", ownerName: "", phone: "", uuid: uuidLidor, bride: "", groom: ""
        }, validationSchema: yup.object({
            campaignName: yup.string().required("Campaign name is a required field").min(2),
            bride: yup.string().required("brige name is a required field").min(2),
            groom: yup.string().required("groom name is a required field").min(2),
            phone: yup.number().required("Phone number is a required field").min(10).positive(),
            ownerName: yup.string().required("Owner Campaign is a required field").min(2)
        }),
        onSubmit: (values: Event, { resetForm }) => {
            addEvent(values).then((res) => {
                // console.log(res.data);
                // console.log(res.data._id);

                successMessage("Event Added");
                resetForm();
                // שינוי תצוגה מ0 אל כלום
                formik.setFieldValue("phone", "");
                localStorage.removeItem("uuid");
                localStorage.setItem("uuid", JSON.stringify(res.data._id));

                navigate(`/campaign/${res.data._id}`)
            })
                .catch((e) => console.log(e))
            console.log(values);
        }
    })

    // שינוי תצוגה מ0 אל כלום
    useEffect(() => {
        formik.setFieldValue("phone", "")

    }, []);
    return (<>
        <div className="container">
            <h5 className="display-5">Add New Event</h5>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="campaignName"
                        placeholder="Harry Potter"
                        name="campaignName"
                        value={formik.values.campaignName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="campaignName">campaign name</label>
                    {formik.touched.campaignName && formik.errors.campaignName && (
                        <small className="text-danger">{formik.errors.campaignName}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="ownerName"
                        placeholder="textme"
                        name="ownerName"
                        value={formik.values.ownerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="ownerName">owner name</label>
                    {formik.touched.ownerName && formik.errors.ownerName && (
                        <small className="text-danger">{formik.errors.ownerName}</small>
                    )}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="groom"
                        placeholder="textme"
                        name="groom"
                        value={formik.values.groom}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="groom">groom חתן</label>
                    {formik.touched.groom && formik.errors.groom && (
                        <small className="text-danger">{formik.errors.groom}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="bride"
                        placeholder="textme"
                        name="bride"
                        value={formik.values.bride}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="bride">bride</label>
                    {formik.touched.bride && formik.errors.bride && (
                        <small className="text-danger">{formik.errors.bride}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="0525552555"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="phone">Owner Phone</label>
                    {formik.touched.phone && formik.errors.phone && (
                        <small className="text-danger">{formik.errors.phone}</small>
                    )}
                </div>


                <button type="submit" className="btn btn-success w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}>ADD New Campaign<i className="fa-solid fa-angles-right"></i></button>
                {/* <i class=""></i> */}
            </form>
        </div>

    </>);
}

export default NewCampaign;