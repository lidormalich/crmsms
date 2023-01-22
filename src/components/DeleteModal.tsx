import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteBook } from "../services/bookServices";
import { errorMessage, successMessage } from "../services/FeedbackService";

interface DeleteModalProps {
    show: boolean;
    id: number;
    onHide: Function;
    refresh: Function;

}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ show, onHide, id, refresh }) => {
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
                    deleteBook(id).then((res) => {
                        successMessage("Book Deleted");
                        refresh()
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