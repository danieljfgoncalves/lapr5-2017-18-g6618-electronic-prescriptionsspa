import swal from 'sweetalert2';


export function eulaAlert() {

    swal({
        title: '<h2>End-User License Agreement (EULA) of <span class="app_name">Building Blocks ISEP</span></h2>',

        html: `
        <p>This End-User License Agreement ("EULA") is a legal agreement between you and <span class="company_name">PIMmedica</span></p>        
        <p>This EULA agreement governs your acquisition and use of our <span class="app_name">Building Blocks ISEP</span> software ("Software") directly from <span class="company_name">PIMmedica</span> or indirectly through a <span class="company_name">PIMmedica</span> authorized reseller or distributor (a "Reseller").</p>
        <p>Please read this EULA agreement carefully before completing the installation process and using the <span class="app_name">Building Blocks ISEP</span> software. It provides a license to use the <span class="app_name">Building Blocks ISEP</span> software and contains warranty information and liability disclaimers.</p>
        <p>If you register for a free trial of the <span class="app_name">Building Blocks ISEP</span> software, this EULA agreement will also govern that trial. By clicking "accept" or installing and/or using the <span class="app_name">Building Blocks ISEP</span> software, you are confirming your acceptance of the Software and agreeing to become bound by the terms of this EULA agreement.</p>
        <p>If you are entering into this EULA agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority or if you do not agree with the terms and conditions of this EULA agreement, do not install or use the Software, and you must not accept this EULA agreement.</p>
        <p>This EULA agreement shall apply only to the Software supplied by <span class="company_name">PIMmedica</span> herewith regardless of whether other software is referred to or described herein. The terms also apply to any <span class="company_name">PIMmedica</span> updates, supplements, Internet-based services, and support services for the Software, unless other terms accompany those items on delivery. If so, those terms apply.</p>
        
        <h3>License Grant</h3>
        <p><span class="company_name">PIMmedica</span> hereby grants you a personal, non-transferable, non-exclusive licence to use the <span class="app_name">Building Blocks ISEP</span> software on your devices in accordance with the terms of this EULA agreement.</p>
        <p>You are permitted to load the <span class="app_name">Building Blocks ISEP</span> software (for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the <span class="app_name">Building Blocks ISEP</span> software.</p>
        <p>You are not permitted to:</p>
        
        <ul>
        <li>Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things</li>
        <li>Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose</li>
        <li>Allow any third party to use the Software on behalf of or for the benefit of any third party</li>
        <li>Use the Software in any way which breaches any applicable local, national or international law</li>
        <li>use the Software for any purpose that <span class="company_name">PIMmedica</span> considers is a breach of this EULA agreement</li>
        </ul>
        
        <h3>Intellectual Property and Ownership</h3>
        <p><span class="company_name">PIMmedica</span> shall at all times retain ownership of the Software as originally downloaded by you and all subsequent downloads of the Software by you. The Software (and the copyright, and other intellectual property rights of whatever nature in the Software, including any modifications made thereto) are and shall remain the property of <span class="company_name">PIMmedica</span>.</p>
        <p><span class="company_name">PIMmedica</span> reserves the right to grant licences to use the Software to third parties.</p>
        
        <h3>Termination</h3>
        <p>This EULA agreement is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time upon written notice to <span class="company_name">PIMmedica</span>.</p>
        <p>This EULA was created by <a href="http://eulatemplate.com">eulatemplate.com</a> for <span class="app_name">Building Blocks ISEP</span></p>
        <p>It will also terminate immediately if you fail to comply with any term of this EULA agreement. Upon such termination, the licenses granted by this EULA agreement will immediately terminate and you agree to stop all access and use of the Software. The provisions that by their nature continue and survive will survive any termination of this EULA agreement.</p>
        
        <h3>Governing Law</h3>
        <p>This EULA agreement, and any dispute arising out of or in connection with this EULA agreement, shall be governed by and construed in accordance with the laws of <span class="country">Portugal</span>.</p>
            `
    }).catch(swal.noop);
}

export function privacyPolicyAlert() {
    swal({
        title: '<h2>PRIVACY POLICY</h2>',

        html: `
        <p>Last Updated on January 7, 2018. This Privacy Policy is effective immediately for Users after that date.</p>

        <h4>Electronic Prescriptions ISEP ("we," "us,") respect your privacy and are committed to protecting it through our compliance with this Privacy Policy. This policy describes:</h4>
        <p>• the types of information that we may collect from you when you access or use our Website - http://lapr5-g6618-electronic-prescriptions.azurewebsites.net and other online services (collectively, our "Services"); and</p>
        <p>• our practices for collecting, using, maintaining, protecting and disclosing that information.</p>
        <p>This policy applies only to information we collect through our Services and in the electronic communications sent through or in connection with our Services.</p>
        <br/>
        <h3>DEFINITIONS</h3>
        <h4>User</h4>
        <p>"User" or "you" or "your" refers to you, as a user of the Services. A user is someone who accesses or uses the Services for the purpose of sharing, displaying, hosting, publishing, transacting, uploading information or viewing pictures and includes other persons jointly participating in using the Services.</p>
        <h4>User Account</h4>
        <p>"User Account" is a separate part of the Website, containing User information required by Electronic Prescriptions ISEP during registration.</p>
        <h4>Content</h4>
        <p>"Content" will include (but is not limited to) images, photos, audio, video, location data, 'nearby places', and all other forms of information or data. </p>
        <p>Electronic Prescriptions ISEP qualifies as a Data Controller under the Regulation (EU) 2016/679 of The European Parliament and of The Council of 27 April 2016 (General Data Protection Regulation (the “GDPR”)). As such, we aim to comply with all legal obligations which the GDPR implies on Data Controllers.</p>
        <p>Electronic Prescriptions ISEP strives to offer its visitors and Users the many advantages of Internet technology and to provide an interactive and personalized experience. For these purposes, we, from Electronic Prescriptions ISEP, may use personally identifiable information – like your name, e-mail address, address, telephone number, etc., which are subject to the terms of this Privacy Policy. We, and we suppose you too, do not tolerate spam. We will therefore never sell, barter, or rent your email address to any unauthorized third parties.</p>
        <br/>
        <h3>WHAT INFORMATION DO WE COLLECT FROM OUR USERS?</h3>
        <p>Electronic Prescriptions ISEP may collect and use information of and regarding its Users. We collect only data which is essential to our operations and enables us to provide you with better user experience.</p>
        <p>The information, through which the person may be identified, may include data, which the User voluntarily enters, uses or provides when using the Services of the Electronic Prescriptions ISEP Website , or submits when creating a User Account. Electronic Prescriptions ISEP collects and uses the information for the purposes, outlined in this Privacy Policy, as well as to offer new services to the User or to familiarize him with new functionalities on the Website.</p>
        <h4>We collect two types of information from and about our Users, including information:</h4>
        <p>• by which you may be personally identified; and/or</p>
        <p>• about your internet connection, the equipment you use to access our Services and your usage details (i.e. your Internet Service Provider).</p>
        <br/>
        <h3>The information we collect on or through our Services may include:</h3>
        <h4>User Account information: Personal information, such as your full name and other information you may provide with your account, such as your address and phone number, that may be displayed as a part of your User Account;</h4>
        <p>We collect this information in order to verify your identity and provide you with an individualised experience of our Services.</p>
        <h4>Preferences: Your preferences and settings such as time zone and language;</h4>
        <p>We collect this information in order to enhance your user experience.</p>
        <h4>Searches and other activities: The search terms you have looked up and results you selected;</h4>
        <p>We collect this information in order to improve your user experience and provide you with more relevant content and Services.</p>
        <h4>Browsing information: How long you used our Services, which features you used, etc.;</h4>
        <p>We collect this information in order to analyse the behaviour of our users and improve our Services.</p>
        <h4>Communications: Between you and Electronic Prescriptions ISEP support staff regarding the Services.</h4>
        <p>We collect this information in order to monitor the quality of our support staff and your communications with us.</p>
        <h4>Location Data: We may collect information about your location if you have instructed your mobile device or computer to send such information via the privacy settings on that mobile device or computer.</h4>
        <p>We may use the location data collected to enhance your use of the Services by providing you with relevant content and contextual advertising</p>
        <br/>
        <h3>HOW WE GATHER INFORMATION FROM USERS?</h3>
        <p>How we collect and store information depends on the pages you are visiting, the activities in which you elect to participate and the services provided. For example, you may be asked to provide information when you register for access to certain portions of our Website, create a User account, request certain features, such as e-mail newsletters or when you make a payment. Like most Websites, Electronic Prescriptions ISEP also collects information automatically and through the use of electronic tools that may be transparent to our visitors and Users. For example, we may log the name of your Internet Service Provider.</p>
        <br/>
        <h3>WHAT WE DO WITH THE INFORMATION WE COLLECT?</h3>
        <p>Like other Websites, we collect information to enhance your visit and deliver more individualised content. We respect your privacy and do not share your information with anyone, except in cases when that proves necessary.</p>
        <h4>We will retain the information we collect from you for a period of 5 years. After the expiry of this period we undertake to delete any information we have collected from you.</h4>
        <p>Aggregate information and information that does not personally identify you, may be used in many ways. For example, Electronic Prescriptions ISEP may combine information about your usage patterns on the Website with similar information obtained from other users to help enhance our site and Services (e.g., to learn which pages are visited the most or what features Users find the most attractive). This information does not include any information about you and does not allow anyone to identify you individually. We may use personally identifiable information, collected on the Website, to communicate with you about your registration and customisation preferences; our Terms of Service and Privacy Policy; services and products offered by or through the Website; and other topics we think you might find of interest. Personally identifiable information collected by Electronic Prescriptions ISEP may also be used for other purposes, including but not limited to Website administration, troubleshooting, processing of e-commerce transactions and other communications with you. Certain third parties who provide technical support for the operation of our Website – our Web hosting service for example – may have access to such information. We will use your information only as permitted by law. We may also disclose your information in response to a court order, at other times when we believe we are reasonably required to do so by the applicable law, in connection with the collection of amounts you may owe to us, and/or to law enforcement authorities, whenever we deem it appropriate or necessary. Please note we may not provide you with notice prior to disclosure in such cases.</p>       
        <br/>
        <h3>RIGHT OF CONSENT WITHDRAWAL</h3>
        <p>You may withdraw your consent for collecting your personal information at any time. To do so, please contact us at building.blocks.isep@gmail.com.</p>
        <br/>
        <h3>CHANGE OR REVIEW OF INFORMATION</h3>
        <p>If you would like to review, change or delete personal data we have collected from you or you had submitted or permanently delete your account, please contact us.</p>
        <p>For more information regarding the termination or deletion of your information, please refer to Section 8: Termination of this Privacy Policy.</p>
        <br/>
        <h3>ACCESSING & CORRECTING YOUR PERSONAL INFORMATION.</h3>
        <p>We take reasonable steps to accurately record the personal information that you provide to us, as well as any subsequent updates.</p>
        <p>We encourage you to review, update, and correct the personal information that we maintain about you. You may request that we delete personal data about you that is inaccurate, incomplete, irrelevant for legitimate purposes, or is being processed in a way which infringes any applicable legal requirements.</p>
        <br/>
        <h3>SECURITY: HOW WE PROTECT YOUR INFORMATION?</h3>
        <p>Electronic Prescriptions ISEP is registered as a Personal Data Controller pursuant to European Union law.</p>
        <p>We have implemented appropriate measures in the form of various technical, physical and other means, including, but not limited to measures regarding the security of our electronic systems and databases, locks, racks, cases and other devices and access controlling systems, fire-notifying and fire extinguishing systems. These means aim at improving the integrity and security of the personal information that we collect and maintain. However, please be advised that even the best security measures cannot guarantee the full elimination of all risks. If we learn of any violation, breach or danger to our security systems breach, then we will attempt to notify you electronically so that timely and appropriate protective steps can be taken. Apart from informing you via e-mail, we may post a notice through the Website if a security breach occurs.</p>
        <p>Your personal data safety is of utmost importance to us. We review and strive to improve our security measures on a regular basis.</p>
        <p>If we detect a breach of our security measures, which has the potential of harming you as individual we will notify you without undue delay.</p>
        <br/>
        <h3>CONTROLLING YOUR PERSONAL DATA</h3>
        <p>Other Users may be able to identify you, or associate you with your account, if you include your personal information in any content you post or make publicly available.</p>
        <p>You may control and restrict the personal data you share with us by visiting the Settings section of your User Account. </p>
        <p>If you have any questions regarding the ways you can control your personal data, please contact us at 1060503@isep.ipp.pt.</p>
        <br/>
        <h3>TERMINATION</h3>
        <p>As mentioned, you may at any time review or change the personal information we maintain about you by contacting Electronic Prescriptions ISEP. Upon your request, we will delete your contact information and personal data from our active databases.</p>
        <p>This Privacy Policy is effective until terminated by either party. If you no longer agree to be bound by this Privacy Policy, you must cease the use of the Electronic Prescriptions ISEP Website. If you are dissatisfied with Electronic Prescriptions ISEP, its’ content, or any of these terms, conditions, and policies, your sole legal remedy is to discontinue using the Website. Electronic Prescriptions ISEP reserves the right to terminate or suspend your access to and use of the Website, or parts of them, without notice, if we believe, in our sole discretion that such use is in violation of any applicable law, or harmful to our interests or the interests of another person or entity, or where Electronic Prescriptions ISEP has reasons to believe that their use is in violation of this Privacy Policy or the Terms of Use.</p>
        <br/>
        <h3>CHILDREN’S PRIVACY</h3>
        <p>Electronic Prescriptions ISEP does not knowingly collect personal information from children under the age of 13. If we learn that we have personal information on a child under the age of 13, we will delete that information from our servers. Electronic Prescriptions ISEP encourages parents to go online with their kids.</p>
        <br/>
        <h3>CHANGES TO THIS POLICY</h3>
        <p>Electronic Prescriptions ISEP reserves the rights to change this Privacy Policy at any time. Please check this page periodically for changes. Your use of the services after any such amendment or change in the Privacy Policy shall be deemed as your express acceptance to such amended/changed Privacy Policy and an assent to be bound by such changed/amended Privacy Policy. Information collected prior to the time any change is posted will be used according to the rules and laws that applied at the time the information was collected.</p>
        <br/>
        <h3>GOVERNING LAW.</h3>
        <p>This Privacy Policy and the use of the Website are governed by the laws of Portugal. The parties undertake to first try to resolve the dispute with by negotiation. If the parties fail to reach an amicable resolution through negotiation, Electronic Prescriptions ISEP agrees to submit the dispute to the competent Court of Portugal.</p>
        <br/>
        <h3>COPYRIGHTS.</h3>
        <p>The copyrights of our Website are the property of Electronic Prescriptions ISEP.</p>
        <p>Texts, graphics, photographs, animations, videos and clips, visible on the Website are the object of copyright and are part of the intellectual property of Electronic Prescriptions ISEP. Those may not be reproduced, used, presented or represented without an explicit written permission by Electronic Prescriptions ISEP. Any distribution of files, obtained by the Users under the Terms and Conditions of the Website, or of parts of such files, constitutes a violation of the relevant intellectual property protection laws and is prosecuted by the law.</p>
        <p>Nothing contained on this Website may be interpreted as granting a license or right of use as a trademark without the prior explicit written consent of Electronic Prescriptions ISEP.</p>
        <br/>
        <h3>MISCELLANEOUS</h3>
        <p>Electronic Prescriptions ISEP is controlled, operated and administered entirely within Portugal.</p>
        <p>If you are accessing the Electronic Prescriptions ISEP Website from another jurisdiction, please be advised that you are transferring your personal information to Electronic Prescriptions ISEP in Portugal and, by using the Website, you consent to that transfer and to abide by the applicable laws concerning your use of the Website and your agreements with us.</p>
        <p>This statement and the policies outlined in this Privacy Policy are not intended to and do not create any contractual or other legal rights in or on behalf of any third party.</p>
        <p>Electronic Prescriptions ISEP may provide a translation of the English version of the Privacy Policy into other languages. You understand and agree that any translation of the Privacy Policy into other languages is only for your convenience and that the English version shall govern your rights and responsibilities. In case there are any inconsistencies between the English version of the Privacy Policy and its translated versions, the English version of the Terms shall prevail.</p>
        <br/>
        <h3>CONTACT</h3>
        <p>If you believe Electronic Prescriptions ISEP does not adhere to this Privacy Policy, in order to address a question, to resolve a complaint regarding the Website or the Electronic Prescriptions ISEP Services, or to receive further information regarding the Services, please contact Electronic Prescriptions ISEP via email at building.blocks.isep@gmail.com.</p>
    `
    }).catch(swal.noop);

}

// Simple Alert
export function basicAlert() {
    swal("basicAlert").catch(swal.noop); // Use ".catch(swal.noop)" for overlay click close error.
}

// Alert with Title
export function withTitle() {
    swal("", "It's pretty, isn't it?");
}

//  HTML Alert
// export function htmlAlert() {
//     swal({
//         title: 'HTML <small>Title</small>!',
//         text: 'A custom <span style="color:#F6BB42">html<span> message.',
//         html: true
//     });
// }

// Question Type Alert
export function typeQuestion() {
    swal("Question", "Are You Sure?", "question");
}

// Success Type Alert
export function typeSuccess() {
    swal("Good job!", "You clicked the button!", "success");
}

// Info Type Alert
export function typeInfo() {
    swal("Info!", "You clicked the button!", "info");
}

// Warning Type Alert
export function typeWarning() {
    swal("Warning!", "You clicked the button!", "warning");
}

// Error Type Alert
export function typeError() {
    swal("Error!", "You clicked the button!", "error");
}

// Custom Icon 
export function customIcon() {
    swal({ title: "Sweet!", text: "Here's a custom image.", imageUrl: "./assets/img/portrait/avatars/avatar-08.png" });
}

// Auto close timer
export function autoClose() {
    swal({ title: "Auto close alert!", text: "I will close in 2 seconds.", timer: 2000, showConfirmButton: false });
}

// Allow Outside Click
export function outsideClick() {
    swal({
        title: 'Click outside to close!',
        text: 'This is a cool message!',
        allowOutsideClick: true
    });
}

// Ajax Request
export function ajaxRequest() {
    swal({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 2000);
            });
        },
        allowOutsideClick: false
    }).then(function (email) {
        if (email) {
            swal({
                type: 'success',
                title: 'Ajax request finished!',
                html: 'Submitted email: ' + email
            });
        }
    })
}

// Button Options
export function customButton() {
    swal({
        title: '<i>HTML</i> <u>example</u>',
        type: 'info',
        html:
            'You can use <b>bold text</b>, ' +
            '<a href="//github.com">links</a> ' +
            'and other HTML tags',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Opps!'
    })
}

// Prompt Function
// export function promptFunction() {
//     swal({
//         title: "An input!",
//         text: "Write something interesting:",
//         input: "text",
//         showCancelButton: true,
//         closeOnConfirm: false,
//         animation: "slide-from-top",
//         inputPlaceholder: "Write something"
//     }).then(function (inputValue) {
//         if (inputValue === false) return false;
//         if (inputValue === "") {
//             swal.showInputError("You need to write something!");
//             return false
//         }
//         swal("Nice!", "You wrote: " + inputValue, "success");
//     });

// }

// Confirm Button Action
export function confirmText() {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: 'Text Changed',
        cancelButtonText: "No, cancel"
    }).then(function (isConfirm) {
        if (isConfirm) {
            swal(
                'Changed!',
                'Confirm button text was changed!!',
                'success'
            );
        }
    }).catch(swal.noop);
}

// Confirm & Cancel Button
export function confirmCancelButton() {
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0CC27E',
        cancelButtonColor: '#FF586B',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success btn-raised mr-5',
        cancelButtonClass: 'btn btn-danger btn-raised',
        buttonsStyling: false
    }).then(function () {
        swal(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
        )
    }, function (dismiss) {
        // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        if (dismiss === 'cancel') {
            swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}

// Chaining modals / Steps
export function steps() {
    swal.setDefaults({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        cancelButtonColor: '#FF586B',
        animation: false
    });

    var steps = [
        {
            title: 'Step 1',
            text: 'Chaining modals is easy with Step 1'
        },
        {
            title: 'Step 2',
            text: 'Chaining modals is easy with Step 2'
        },
        {
            title: 'Step 3',
            text: 'Chaining modals is easy with Step 3'
        },
    ];

    swal.queue(steps).then(function () {
        swal({
            title: 'All done!',
            text: 'Great job :)',
            confirmButtonText: 'Lovely!',
            showCancelButton: false
        });
    }).then(function () {
        swal.resetDefaults();
    }).catch(swal.noop);
}