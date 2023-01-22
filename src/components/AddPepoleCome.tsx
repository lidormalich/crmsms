import { FunctionComponent } from "react";

interface AddPepoleComeProps {
    uuid: string;
}

const AddPepoleCome: FunctionComponent<AddPepoleComeProps> = ({ uuid }) => {
    return (<>
        <h1>uuid is {uuid}</h1>

    </>);
}

export default AddPepoleCome;