import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import People from "../interfaces/People";
import UpdatePeopleToInvitation from "./UpdatePeopleToInvitation";

interface UpdateModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    phoneNum: string;
    eventId: string;

}

const UpdateModal: FunctionComponent<UpdateModalProps> = ({ show, onHide, phoneNum, eventId, refresh }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UpdatePeopleToInvitation phoneNum={phoneNum} eventId={eventId} refresh={() => refresh()} onHide={onHide} />
            </Modal.Body>

        </Modal>



    </>);
}

export default UpdateModal;