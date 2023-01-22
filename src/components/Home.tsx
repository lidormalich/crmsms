import { FunctionComponent, useState } from "react";
import Addbook from "./Addbook";
import Booktable from "./Booktable";
import Login from "./Login";

interface HomeProps {
    isLogin: boolean;
    setIsLogIn: Function;
}

const Home: FunctionComponent<HomeProps> = ({ isLogin, setIsLogIn }) => {
    // משתני עזר לרענון הקומפוננטה בלי רענון הדף
    let [booksChange, setBooksChanged] = useState<boolean>(false);
    return (<>
        <div className="container">
            {isLogin ? (<>
                <div className="row">
                    <div className="col-md-4">
                        <Addbook setBooksChanged={setBooksChanged} booksChange={booksChange} />
                    </div>
                    <div className="col-md-8">
                        <Booktable booksChange={booksChange} setBooksChanged={setBooksChanged} />
                    </div>
                </div>
            </>) : (<><Login setIsLogIn={setIsLogIn} /></>
            )}
        </div>
    </>);
}

export default Home;