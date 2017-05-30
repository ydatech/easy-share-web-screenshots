import React, { Component } from 'react'
//import Paper from 'material-ui/Paper';
//import './NotFound.css'


export default class Policy extends Component {
    render() {
        const origin = location.origin
        return (
            <div style={{ paddingTop: 100, maxWidth: 1200 }}>

                <article>
                    <h1>Privacy Policy</h1>
                    This Privacy Policy governs the manner in which Easy Share Web Screenshots (ESWS) collects, uses, maintains and discloses information collected from users (each, a "User") of the <a href="http://esws.embed33.in">http://esws.embed33.in</a> website ("Site"). This privacy policy applies to the Site and all products and services offered by ESWS.<br /><br />

                    <b>Personal identification information</b><br /><br />

                    We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.<br /><br />

                    <b>Non-personal identification information</b><br /><br />

                    We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.<br /><br />

                    <b>Web browser cookies</b><br /><br />

                    Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.<br /><br />

                    <b>How we use collected information</b><br /><br />

                    ESWS may collect and use Users personal information for the following purposes:<br />
                    <ul>
                        <li><i>- To personalize user experience</i><br />
                            We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>

                    </ul>
                    <b>How we protect your information</b><br /><br />

                    We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.<br /><br />

                    Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.<br /><br />

                    <b>Sharing your personal information</b><br /><br />

                    We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.<br /><br />

                    <b>Third party websites</b><br /><br />

                    Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.<br /><br />

                    <b>Compliance with children's online privacy protection act</b><br /><br />

                    Protecting the privacy of the very young is especially important. For that reason, we never collect or maintain information at our Site from those we actually know are under 13, and no part of our website is structured to attract anyone under 13.<br /><br />

                    <b>Changes to this privacy policy</b><br /><br />

                    ESWS has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.<br /><br />

                    <b>Your acceptance of these terms</b><br /><br />

                    By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.<br /><br />

                    <b>Contacting us</b><br /><br />

                    If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:<br />
                    <a href={origin}>Easy Share Web Screenshots (ESWS)</a><br />
                    <a href={origin}>{origin}</a><br />
                    Jl.Kadipaten Raya No.15 Antapani Bandung Indonesia<br />
                    +6289653023212<br />
                    info@{location.host}<br />
                    <br />


                </article>
            </div>
        )
    }
}
