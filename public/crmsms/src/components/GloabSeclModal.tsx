import { FunctionComponent } from "react";
import AddGroup from "./MangeGroup/AddGroup";
import Modal from "./ui/Modal";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";

interface GloabSeclModalProps {
    show: boolean;
    onHide: Function;
    groupChange?: boolean;
    setGroupChanged?: Function;
}

const GloabSeclModal: FunctionComponent<GloabSeclModalProps> = ({ show, onHide, setGroupChanged, groupChange, }) => {
    const t = useTranslation();
    
    return (
        <Modal
            show={show}
            onHide={() => onHide()}
            size="sm"
            title={t.modals.addGroup}
            icon={<i className="fa-solid fa-users" />}
            iconColor="purple"
            footer={
                <div className="flex justify-end gap-3">
                    <UIButton variant="outline" onClick={() => onHide()}>
                        {t.common.close}
                    </UIButton>
                </div>
            }
        >
            <AddGroup
                // setGroupChanged={setGroupChanged} groupChanged={groupChange} 
                onHide={onHide} 
            />
        </Modal>
    );
}

export default GloabSeclModal;