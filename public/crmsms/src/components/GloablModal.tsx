import { FunctionComponent, useEffect, useState } from "react";
import AddPeople from "./AddPeople";
import GloabSeclModal from "./GloabSeclModal";
import Modal from "./ui/Modal";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";

interface GloablModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    setpeopleChanged: Function;
    peopleChange: boolean;
}

const GloablModal: FunctionComponent<GloablModalProps> = ({ show, onHide, setpeopleChanged, refresh, peopleChange, }) => {
    let [groupChange, setGroupChanged] = useState<boolean>(false);
    const t = useTranslation();

    useEffect(() => {

    }, [groupChange]);
    return (
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            title={t.modals.addGuest}
            icon={<i className="fa-solid fa-user-plus" />}
            iconColor="blue"
            footer={
                <div className="flex justify-end gap-3">
                    <UIButton variant="outline" onClick={() => onHide()}>
                        {t.common.close}
                    </UIButton>
                </div>
            }
        >
            <AddPeople setpeopleChanged={setpeopleChanged} peopleChange={peopleChange} />
        </Modal>
    );
}

export default GloablModal;