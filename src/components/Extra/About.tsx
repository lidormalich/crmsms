import { FunctionComponent } from "react";
import Footer from "./Footer";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<>
        <div className="container" >
            <h1 className="display-1">Created By Lidor Maliach</h1>
            <h5 className="display-5">The Team Behind Wedding Event CRM Website</h5>
            <p className="lead">Our team is made up of experienced event planners, developers, and designers who are passionate about creating innovative solutions that make event planning easier and more efficient. We understand the importance of a well-planned and executed event, and we strive to provide our clients with the highest level of service and support.</p>

            <h2 className="display-4">Contact Us</h2>
            <p className="lead">If you have any questions or feedback about Wedding Event CRM Website, please don't hesitate to contact us. You can reach us by email at <a className="lead" href="mailto:lidormalich@gmail.com">lidormalich@gmail.com</a> or by phone at <a className="lead" href="tel:972526761204"> 052-676-1204</a> . We are always happy to hear from our clients and are committed to providing the best possible experience.</p>
            <p>Thank you for choosing Wedding Event CRM Website for your event planning needs. We hope our system helps make your event planning experience a success!</p>
            <Footer />
        </div>
    </>);
}

export default About;