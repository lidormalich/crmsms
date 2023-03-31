import { FunctionComponent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as XLSX from 'xlsx';
import { sendExcel } from "../../Services/excelServices";
import Loading from "./Loading";
import { errorMessage } from "../../Services/FeedbackService";


interface ParseExcelProps {

}

const ParseExcel: FunctionComponent<ParseExcelProps> = () => {
    let { id } = useParams();
    let counterKey = 0;
    let navigate = useNavigate();
    let [fileName, setFilename] = useState<any[]>([]);
    let [fileEvent, setFileEvent] = useState<any>();
    let [load, setLoad] = useState<boolean>(false);
    let [showTable, setShowTable] = useState<boolean>(false);
    let [culums, setCulums] = useState<any[]>([]);
    let [data, setData] = useState<any[]>([])

    let handelFile = async (e: any) => {
        // console.log("HI");
        readFile(e).then(async (res) => {
            if (res[0] != false) {
                // await sendExcel(res, id as string);
                // navigate("/")
            } else {
                console.log(res[0]);
                errorMessage("not in format")
            }
        });
    }

    let checkIfWOrk = (workbook: any) => {
        let arrString = ['Phone Number', 'First Name', 'Last Name', 'Number Of Guests']; // 'Number Of Guests Accept'
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
        setShowTable(true);
        // console.log(jsonData);
        // console.log(jsonData.length);
        return jsonData;
    }
    let submitAll = async () => {
        setLoad(true);
        setShowTable(false);
        await sendExcel(culums, id as string);
        navigate(`/campaign/${id}`);
    }

    return (<>
        <div className="container">
            <h1>Parse Excel</h1>
            {/* {fileName && (<p>{fileName}</p>)} */}
            <div>
                <input type={"file"} accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                    onChange={(e) => { setFileEvent(e); handelFile(e) }}
                ></input>
            </div>


            {culums.length && showTable && <table className="table table-secondary table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Guests</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {culums.map((item) =>
                        <tr key={counterKey++}>
                            <th scope="row"><input type="checkbox" onChange={(e) => {
                                let datanew = { ...item, ...data };
                                if (e.target.checked) setData(datanew); console.log(data);
                            }} /></th>
                            <th scope="row">{`${item["First Name"]}  ${item["Last Name"]}`}</th>
                            <th scope="row">{item["Number Of Guests"]}</th>
                            <th scope="row">{item["Phone Number"]}</th>
                        </tr>
                    )}
                </tbody>
            </table>}

            {!showTable ? <button type="button" className="rounded-pill border border-3 my-3  bg-success border-success w-25 btn" disabled data-bs-toggle="button" >Upload and Send</button> : <button type="submit" className="btn rounded-pill border border-3 my-3  bg-success border-success w-25 " onClick={(e) => submitAll()}>Upload and Send</button>}
            {load && <>
                <Loading stringToShow={"Uploading file and saving people..."} />
            </>}
        </div>
    </>);
}

export default ParseExcel;