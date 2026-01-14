import { TextField } from "@mui/material";
import axios from "axios";
import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCoupleImageInEvent } from "../../Services/eventServices";
import { successMessage } from "../../Services/FeedbackService";
import Loading from "./Loading";
import FormField from "../ui/FormField";
import UIButton from "../ui/Button";
import Card from "../ui/Card";
import { useTranslation } from "../../i18n/useTranslation";

interface UploadImageProps {}

const UploadImage: FunctionComponent<UploadImageProps> = () => {
    let { eventId } = useParams();
    let navigate = useNavigate();
    const t = useTranslation();

    const [imageSelected, setImageSelected] = useState<any>("");
    const [load, setLoad] = useState<boolean>(false);

    const uploadImage = () => {
        setLoad(true);
        const formData = new FormData();
        formData.append('file', imageSelected[0]);
        formData.append('upload_preset', "nnmxcowx");

        axios.post("https://api.cloudinary.com/v1_1/ddk6cfhl0/image/upload", formData)
            .then((response) => {
                updateCoupleImageInEvent(eventId as string, response.data.secure_url);
                successMessage(t.upload.imageSave);
                navigate(-1);
            }).catch((e) => {
                console.log(e);
                setLoad(false);
            });
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-6">
            <Card
                title={t.upload.addNewImage}
                icon={<i className="fa-solid fa-image" />}
                iconColor="blue"
            >
                <div className="space-y-5">
                    <FormField
                        label={t.upload.coupleImage}
                        type="file"
                        id="coupleImage"
                        name="coupleImage"
                        accept="image/*"
                        onChange={(e) => setImageSelected((e.target as HTMLInputElement).files)}
                        leftIcon={<i className="fa-solid fa-upload text-slate-400" />}
                    />
                    <UIButton
                        onClick={uploadImage}
                        disabled={!imageSelected || load}
                        leftIcon={<i className="fa-solid fa-upload" />}
                    >
                        {load ? t.upload.uploading : t.upload.uploadImage}
                    </UIButton>
                    {load && <Loading stringToShow={t.upload.uploading} />}
                </div>
            </Card>
        </div>
    );
};

export default UploadImage;
