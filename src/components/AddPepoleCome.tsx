import { FunctionComponent, useContext } from "react";

interface AddPepoleComeProps {
    uuid: string;
}

const AddPepoleCome: FunctionComponent<AddPepoleComeProps> = ({ uuid }) => {

    return (<>
        <h1>uuid is {uuid}</h1>
        <h2>theme</h2>
    </>);
}

export default AddPepoleCome;