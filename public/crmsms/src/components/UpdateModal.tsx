import { FunctionComponent } from "react";
import UpdatePeopleToInvitation from "./UpdatePeopleToInvitation";
import Modal from "./ui/Modal";
import { useTranslation } from "../i18n/useTranslation";

interface UpdateModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    phoneNum: string;
    eventId: string;
}

const UpdateModal: FunctionComponent<UpdateModalProps> = ({ show, onHide, phoneNum, eventId, refresh }) => {
    const t = useTranslation();
    
    return (
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            title={t.modals.updateGuest}
            icon={<i className="fa-solid fa-user-pen" />}
            iconColor="blue"
        >
            <UpdatePeopleToInvitation phoneNum={phoneNum} eventId={eventId} refresh={() => refresh()} onHide={onHide} />
        </Modal>
    );
}

export default UpdateModal;