import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import People from "../interfaces/People";
import { deletePepoleFromEvent } from "../ServicesOEM/eventServices";
import { errorMessage, successMessage } from "../ServicesOEM/FeedbackService";

interface DeleteModalProps {
    show: boolean;
    phoneNum: string;
    eventId: string;
    onHide: Function;
    refresh: Function;


}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ show, onHide, phoneNum, refresh, eventId, }) => {

    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            refresh={() => refresh()}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Delete Item?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Are You Sure?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide()}>Cancle</Button>
                <Button variant="danger" onClick={() => {
                    deletePepoleFromEvent(phoneNum, eventId).then(() => {
                        successMessage("Men Deleted");
                        refresh();
                    }).catch((e) => {
                        errorMessage("Sorry! Something went wrong...");
                        console.log(e)
                    });
                    onHide()
                }}
                >Yes, Delete It</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default DeleteModal;