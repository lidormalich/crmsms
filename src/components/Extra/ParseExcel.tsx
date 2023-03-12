import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import { sendExcel } from "../../Services/excelServices";
import Loading from "./Loading";


interface ParseExcelProps {

}

const ParseExcel: FunctionComponent<ParseExcelProps> = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    let [fileName, setFilename] = useState<any[]>([]);
    let [fileEvent, setFileEvent] = useState<any>();
    let [load, setLoad] = useState<boolean>(false);
    let [culums, setCulums] = useState<any[]>([]);
    let handelFile = async (e: any) => {
        setLoad(true);
        readFile(e).then(async (res) => {
            if (res[0] != false) {
                await sendExcel(res, id as string);
                navigate("/")
            } else {
                console.log(res[0]);

                console.log("Error");

            }

        });


    }
    let checkIfWOrk = (workbook: any) => {
        let arrString = ['Phone Number', 'First Name', 'Last Name', 'Number Of Guests', 'Number Of Guests Accept'];
        for (let index = 0; index < arrString.length; index++) {
            if (workbook[index] != arrString[index]) return false;
        }
        return true;
    }

    let readFile = async (e: any) => {
        const file = e.target.files[0];
        setFilename(file.name);
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data, { sheetRows: 300 }); //how much want        
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const sheetHeader = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (!checkIfWOrk(sheetHeader[0])) {
            return [false];
        }
        setCulums(jsonData);
        return jsonData;
    }
    return (<>
        <h1>Parse Excel</h1>
        {fileName && (<p>{fileName}</p>)}
        <input type={"file"}
            onChange={(e) => setFileEvent(e)}
        ></input>
        <button type="submit" onClick={(e) => handelFile(fileEvent)}>SEND</button>
        {load && <>
            <Loading stringToShow={"Uploading file and saving people..."} />
        </>}

    </>);
}

export default ParseExcel;