import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteEvent } from "../Services/eventServices";
import { errorMessage, successMessage } from "../Services/FeedbackService";

interface DeleteCMPProps {
    show: boolean;
    eventId: string;
    onHide: Function;
    refresh: Function;
}

const DeleteCMP: FunctionComponent<DeleteCMPProps> = ({ show, onHide, refresh, eventId }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
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
                    deleteEvent(eventId).then((res) => {
                        successMessage("Event Deleted");
                        refresh();
                    }).catch((e) => {
                        errorMessage("Sorry! Something went wrong...");
                        console.log(e)
                    });
                    onHide();
                }}
                >Yes, Delete that Event</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default DeleteCMP;