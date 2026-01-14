import { FunctionComponent } from "react";
import { deletePepoleFromEvent } from "../Services/eventServices";
import { errorMessage, successMessage } from "../Services/FeedbackService";
import Modal from "./ui/Modal";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";

interface DeleteModalProps {
    show: boolean;
    phoneNum: string;
    eventId: string;
    onHide: Function;
    refresh: Function;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ show, onHide, phoneNum, refresh, eventId, }) => {
    const t = useTranslation();
    
    const handleDelete = () => {
        deletePepoleFromEvent(phoneNum, eventId).then(() => {
            successMessage(t.guests.guestDeleted);
            refresh();
            onHide();
        }).catch((e) => {
            errorMessage(t.errors.somethingWentWrong);
            console.log(e);
        });
    };

    return (
        <Modal
            show={show}
            onHide={() => onHide()}
            size="sm"
            title={t.modals.deleteGuestQuestion}
            icon={<i className="fa-solid fa-trash-can" />}
            iconColor="red"
            footer={
                <div className="flex justify-end gap-3">
                    <UIButton variant="outline" onClick={() => onHide()}>
                        {t.common.cancel}
                    </UIButton>
                    <UIButton variant="danger" onClick={handleDelete}>
                        {t.common.yes}, {t.modals.deleteItem}
                    </UIButton>
                </div>
            }
        >
            <p className="text-slate-700">{t?.modals?.deleteEventConfirm||t?.guests?.deleteGuestConfirm}</p>
        </Modal>
    );
}

export default DeleteModal;