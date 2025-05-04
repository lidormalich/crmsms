import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import './404.css';


interface PagenotFoundProps {

}

const PagenotFound: FunctionComponent<PagenotFoundProps> = () => {
    return (<><section className="page_404">
        <div className="container">
            <div className="row">
                <div className="col-sm-12 ">
                    <div className="col-sm-10 col-sm-offset-1  text-center">
                        <div className="four_zero_four_bg">
                            <h1 className="text-center ">404</h1>


                        </div>

                        <div className="contant_box_404">
                            <h3 className="h2">
                                Look like you're lost
                            </h3>

                            <p>הבחור רעב, הוא אכל בטעות את הכבל- והשרת לא נמצא</p>
                            <p>אולי נסה לחזור למקום שכן עובד באתר?</p>
                            <Link to="/" className="link_404">לחזרה למסך הראשי</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section></>);
}

export default PagenotFound;