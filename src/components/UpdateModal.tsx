import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import UpdateBook from "./UpdateBook";

interface UpdateModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    id: string;
}

const UpdateModal: FunctionComponent<UpdateModalProps> = ({ show, onHide, id, refresh }) => {
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
                <UpdateBook id={id} refresh={refresh} onHide={onHide} />
            </Modal.Body>

        </Modal>



    </>);
}

export default UpdateModal;