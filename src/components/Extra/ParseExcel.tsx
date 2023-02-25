import { FunctionComponent, useState } from "react";
import * as XLSX from 'xlsx';


interface ParseExcelProps {

}

const ParseExcel: FunctionComponent<ParseExcelProps> = () => {
    let [fileName, setFilename] = useState<any[]>([]);
    let [culums, setCulums] = useState<any[]>([]);
    let handelFile = async (e: any) => {
        const file = e.target.files[0];

        setFilename(file.name);

        const data = await file.arrayBuffer();
        /* data is an ArrayBuffer */
        const workbook = XLSX.readFile(data, { sheetRows: 5 }); //how much want


        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // console.log(jsonData);
        setCulums(jsonData);
        console.log(culums);

    }
    return (<>
        <h1>Parse Excel</h1>
        {fileName && (<p>{fileName}</p>)}
        {/* {console.log(culums[4][1])} */}
        <input type={"file"}
            onChange={(e) => handelFile(e)}
        ></input>

        {culums.length && console.log(culums)}
    </>);
}

export default ParseExcel;