import { FunctionComponent } from "react";
import Footer from "./Footer";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    return (<>
        <div className="container" >
            {/* <header>
            <h1>Welcome to our Wedding Event CRM Website About Page!</h1>
        </header>
        <section>
            <h2>Who We Are</h2>
            <p>We are a team of passionate individuals who understand the complexities and challenges of planning a wedding or any special event. With our years of experience in event planning, we developed a comprehensive customer relationship management (CRM) system that streamlines the event planning process and helps make your event a memorable one.</p>
        </section>
        <section>
            <h2>What We Offer</h2>
            <p>Our Wedding Event CRM Website is designed to make event planning easier and more organized for our clients. With our user-friendly interface, you can easily manage all aspects of your event, from vendor management to guest lists, and everything in between. We offer a wide range of features that are specifically tailored to meet the needs of your event, including customizable templates, email and SMS notifications, and real-time collaboration with your vendors and event planners.</p>
        </section>
        <section>
            <h2>Why Choose Us</h2>
            <p>Our team of experienced event planners is always available to help you with any questions or concerns you may have. We are dedicated to providing our clients with the highest level of customer service, and we pride ourselves on our ability to create unforgettable events that exceed expectations. At Wedding Event CRM Website, we understand that every event is unique and requires a personalized approach. That's why we offer customized solutions that are tailored to meet the specific needs of your event. We are committed to making your event planning experience as seamless and stress-free as possible, so you can focus on enjoying your special day.</p>
        </section>

        <footer>
            <p>Thank you for choosing Wedding Event CRM Website as your go-to event planning solution. We look forward to working with you and helping you create a memorable event that you and your guests will cherish for a lifetime.</p>
        </footer> */}


            <h1 className="display-1">Created By Lidor Maliach</h1>



            <h2 className="display-4">The Team Behind Wedding Event CRM Website</h2>
            <p>Our team is made up of experienced event planners, developers, and designers who are passionate about creating innovative solutions that make event planning easier and more efficient. We understand the importance of a well-planned and executed event, and we strive to provide our clients with the highest level of service and support.</p>

            <h2 className="display-4">Contact Us</h2>
            <p>If you have any questions or feedback about Wedding Event CRM Website, please don't hesitate to contact us. You can reach us by email at <a href="mailto:lidormalich@gmail.com">lidormalich@gmail.com</a> or by phone at <a href="tel:972526761204"> (052) 676-1204</a> . We are always happy to hear from our clients and are committed to providing the best possible experience.</p>
            <p>Thank you for choosing Wedding Event CRM Website for your event planning needs. We hope our system helps make your event planning experience a success!</p>
            <Footer />
        </div>
    </>);
}

export default About;