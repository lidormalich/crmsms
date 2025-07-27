import { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddPeople from "./AddPeople";
import GloabSeclModal from "./GloabSeclModal";

interface GloablModalProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
  setPeopleChanged: (changed: boolean) => void;
  peopleChange: boolean;
}

const GloablModal: FunctionComponent<GloablModalProps> = ({
  show,
  onHide,
  setPeopleChanged,
  refresh,
  peopleChange,
}) => {
  let [groupChange, setGroupChanged] = useState<boolean>(false);

  useEffect(() => {}, [groupChange]);
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        refresh={() => refresh()}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            <h5>Add Guest</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPeople
            setPeopleChanged={setPeopleChanged}
            peopleChanged={peopleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onHide()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GloablModal;
