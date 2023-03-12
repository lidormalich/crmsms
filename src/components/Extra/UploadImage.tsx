import { TextField } from "@mui/material";
import axios from "axios";
import { FunctionComponent, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { updateCoupleImageInEvent } from "../../Services/eventServices";
import { successMessage } from "../../Services/FeedbackService";
import Loading from "./Loading";

interface UploadImageProps {

}

const UploadImage: FunctionComponent<UploadImageProps> = () => {
    let { eventId } = useParams();
    let navigate = useNavigate();

    const [imageSelected, setImageSelected] = useState<any>("");
    const [load, setLoad] = useState<boolean>(false);


    const uploadImage = () => {
        setLoad(true);
        const formData = new FormData();
        formData.append('file', imageSelected[0]);
        formData.append('upload_preset', "nnmxcowx");

        axios.post("https://api.cloudinary.com/v1_1/ddk6cfhl0/image/upload", formData)
            .then((response) => {
                // setImageUrl(response.data.secure_url);
                updateCoupleImageInEvent(eventId as string, response.data.secure_url);
                successMessage("Image Save");
                navigate(-1);

            }).catch((e) => console.log(e));
    }
    const submit = () => {
        uploadImage();
    }
    return (<>
        <div className="container">
            <h5 className="display-5">Add New Image For Couple</h5>
            <div className="form-floating mb-3">
                <input type="file"
                    onChange={(e) => setImageSelected(e.target.files)}
                    className="form-control"
                    id="coupleImage"
                    placeholder="0525552555"
                    name="coupleImage"
                />
                <label htmlFor="coupleImage">couple Image</label>
                <Button onClick={() => submit()}>Upload Image</Button>
            </div>
            {load && <>
                <Loading stringToShow={"Uploading file..."} />
            </>}
        </div>

    </>);
}

export default UploadImage;