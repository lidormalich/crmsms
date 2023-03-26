import { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddPeople from "./AddPeople";
import AddGroup from "./MangeGroup/AddGroup";

interface GloabSeclModalProps {
    show: boolean;
    onHide: Function;
    groupChange: boolean;
    setGroupChanged: Function;
}

const GloabSeclModal: FunctionComponent<GloabSeclModalProps> = ({ show, onHide, setGroupChanged, groupChange, }) => {


    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}

            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" >
                    Add Group interface
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddGroup setGroupChanged={setGroupChanged} groupChanged={groupChange} onHide={onHide} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>);
}

export default GloabSeclModal;