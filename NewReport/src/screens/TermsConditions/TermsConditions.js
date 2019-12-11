'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, TouchableHighlight,Text, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';


export default class TermsConditions extends Component {
  constructor(props) {
    super(props);
    this.state ={
      overflowModalVisible: false,
      data : '',
      phone : 0,
      token : '',
      profile_id : '',
      showAlert : false,
      message : '',
      refreshing: false,
      gender: '',

    }
  }
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigation.toggleDrawer();
  };
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
        <View style = {styles.navBar}>
          <TouchableOpacity 
            onPress={this.toggleDrawer} 
            style = {styles.headerImage}>
            <Image
              onPress={this.toggleDrawer} 
              source = {require('../../assets/images/menu.png')}
              style = {StyleSheet.flatten(styles.headerIcon)}
            />
          </TouchableOpacity>
          <View style={styles.sethLogoModal}>
              <Text 
                style ={styles.termsContHeader}>
                {'Terms & Conditions'}
              </Text>
            </View>
        </View> 
        <View style={ styles.termsStyle}>
          <View style = {styles.termsView}>
            <View style={styles.horizonLine} />
            <ScrollView contentContainerStyle= {styles.scrollview}>
              <View style={{flexDirection: 'column',padding: 4,}}>
                <Text 
                  style ={styles.titleHeader}>
                  {'THE ELECTRONIC COURT OF APPEAL REPORTS NIGERIA WEBSITE AND MOBILE APP \n(TERMS & CONDITIONS)\n'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The Electronic Court of Appeal Reports (E-C.A.R.), is a service provided by Laurels and Prizes Law Publications which presents the recondite judgments and pronouncements of the 16 divisions of the Court of Appeal of Nigeria and it is aimed at satisfying the fast paced needs of technology savvy legal practitioners and intellectuals. Thus, it is an essential tool for legal practitioners on the bench and in the bar, law faculties and law students, scholars in other fields of education and intellectuals, generally. Please read our terms of service carefully to understand how we intend to serve you. You agree to our terms of service by installing, registering, subscribing or using the website or App otherwise.  '}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'AGREEMENT TO TERMS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“Licensee”) and Laurels and Prizes Law Publications Ltd. (“Licensor”), concerning your access to and use of the Electronic Court of Appeal Reports through the courtofappealreportsnigeria.com website or Electronic Court of Appeal Reports Mobile App as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto. You agree that by accessing the Website, you have read, understood, and agree to be bound by all of these Terms and Conditions.  IF YOU DO NOT AGREE WITH ALL OF THESE TERMS and CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.\nSupplemental terms and conditions or documents that may be posted on the Website or Mobile Application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.  We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms and Conditions to stay informed of updates.  You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Website and Mobile App after the date such revised Terms are posted.\nThe information provided on the Website and Mobile App is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'USE LICENSE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'Licensee is hereby granted the permission to access the Electronic Court of Appeal Reports through the Court of Appeal Reports Nigeria Website and the Mobile Application (App) in accordance with the terms and conditions stipulated in this agreement. Licensor reserves all rights not expressly granted the Licensee.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'User License For The Mobile Application'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'If you access the Electronic Court of Appeal Reports via the mobile application, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the mobile application on wireless electronic devices owned or controlled by you, and to access and use the mobile application on such devices strictly in accordance with the terms and conditions of this mobile application license contained in these Terms of Use. You shall not: (1) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the application; (2) make any modification, adaptation, improvement, enhancement, translation, or derivative work from the application; (3) violate any applicable laws, rules, or regulations in connection with your access or use of the application; (4) remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors of the application; (5) use the application for any revenue generating endeavor, commercial enterprise, or other purpose for which it is not designed or intended; (6) make the application available over a network or other environment permitting access or use by multiple devices or users at the same time; (7) use the application for creating a product, service, or software that is, directly or indirectly, competitive with or in any way a substitute for the application; (8) use the application to send automated queries to any website or to send any unsolicited commercial e-mail; or (9) use any proprietary information or any of our interfaces or our other intellectual property in the design, development, manufacture, licensing, or distribution of any applications, accessories, or devices for use with the application.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Apple and Android Devices'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The following terms apply when you obtain the mobile application from either the Apple Store or Google Play (each an “App Distributor”) to access the Content: (1) the license granted to you for our mobile application is limited to a non-transferable license to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible for providing any maintenance and support services with respect to the mobile application as specified in the terms and conditions of this mobile application license contained in these Terms of Use or as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the mobile application.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'INTELLECTUAL PROPERTY RIGHTS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'Unless otherwise indicated, the Website  and Mobile App is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website and Mobile App (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the Federal Republic of Nigeria, foreign jurisdictions, and international conventions.  The Content and the Marks are provided on the Website and Mobile App “AS IS” for your information and personal use only.  Except as expressly provided in these Terms of Use, no part of the Website  or Mobile App and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.\nProvided that you are eligible to use the Site, you are granted a limited license to access and use the Website or Mobile App and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Website or Mobile App, Content and the Marks.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'USER REPRESENTATIONS'}
                </Text>
            
                <Text 
                  style ={styles.contentText}>
                    {'By using the Website/Mobile App, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;] (3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you will not access the Website or Mobile App through automated or non-human means, whether through a bot, script or otherwise; (5) you will not use the Website or Mobile App for any illegal or unauthorized purpose;  and (6) your use of the Website or Mobile App will not violate any applicable law or regulation.\nIf you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Website or Mobile App (or any portion thereof).'}
                </Text>
                
                <Text 
                  style ={styles.titleText}>
                  {'USER REGISTRATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You are required to register with the Website or Mobile App. To register, you are required to create a user account which involves creating your username and password, and supplying your current email address and mobile telephone number. If you change your email address or mobile telephone number, you must update it as soon as is reasonably possible through our in-app/website change-number feature. You agree to receive emails, text messages or phone calls, from us or our third-party providers, with codes to register for our services (or with instructions to create a new password, as the case may be). Registration does not grant automatic access to the reported cases. Subscription is required to enable you access reported cases.\nYou agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'SUBSCRIPTION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'After registration, you are required to pay for subscription to access the reported cases, in accordance with the subscription-plans we have stipulated. Access to the reported cases will cease when your subscription expires. However, immediately after expiration of subscription, you have 7 (seven) days window period before access to the reported cases is denied. You agree that prompts will be regularly sent to you within those 7 (seven) days, by email, to remind you to re-subscribe.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Subscription Plans'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You can access the Electronic Court of Appeal Reports in the Website/Mobile App by subscribing to either the Individual plan for personal use or the Corporate plan, for firms or organizations. The individual plan consists of the Monthly, Six Months and Yearly Plans. The corporate plan consists of the Basic, Premium and Unlimited Plans.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'Existing Users/Subscribers:'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'If you are already registered, and have an account, on our website - https://courtofappealreportsnigeria.com/ - at the time the Mobile app was launched, you can use the same log-in details you use for the website to access the Mobile App.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'APPROPRIATE DEVICES AND SOFTWARE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You must possess appropriate devices, software and data connections to use the Website and Mobile App, and we provide none of those. You agree to download and install updates to the app whenever updates are required.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'PROHIBITED ACTIVITIES'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You may not access or use the Website for any purpose other than that for which we make the Website or Mobile App available. The Website or Mobile App may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Website or Mobile App, you agree not to:\n 1.  systematically retrieve data or other content from the Website or Mobile App to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us. \n2.  make any unauthorized use of the Website or Mobile App, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses. \n3.  use a buying agent or purchasing agent to make purchases on the Website and Mobile App. \n4.  use the Website or Mobile App to advertise or offer to sell goods and services \n5.  circumvent, disable, or otherwise interfere with security-related features of the Website, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Website or Mobile App and/or the Content contained therein. \n6.  engage in unauthorized framing of or linking to the Website. \n7.  trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords; \n8.  make improper use of our support services or submit false reports of abuse or misconduct. \n9.  engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools. \n10.  interfere with, disrupt, or create an undue burden on the Website/Mobile App or the networks or services connected to the Website/Mobile App. \n11.  attempt to impersonate another user or person or use the username of another user. \n12.  sell or otherwise transfer your profile. \n 13.  use any information obtained from the Website/Mobile App in order to harass, abuse, or harm another person. \n14.  use the Website/Mobile App as part of any effort to compete with us or otherwise use the Website/Mobile App and/or the Content for any revenue-generating endeavor or commercial enterprise. \n15.  decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Website/Mobile App. \n16.  attempt to bypass any measures of the Website/Mobile designed to prevent or restrict access to the Website/Mobile App, or any portion of the Website/Mobile App. \n17.  harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Website/Mobile App to you. \n18.  delete the copyright or other proprietary rights notice from any Content. \n19.  copy or adapt the Website/Mobile App’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code. \n20.  upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Website/Mobile App or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Website/Mobile App. \n21.  upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”). \n22.  except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Website/Mobile App, or using or launching any unauthorized script or other software. \n23.  disparage, tarnish, or otherwise harm, in our opinion, us and/or the Website/Mobile App. \n24.  use the Website/Mobile App in a manner inconsistent with any applicable laws or regulations.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'USER GENERATED CONTRIBUTIONS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The Website/Mobile App may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Website/Mobile App, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Website/Mobile App and through third-party websites.  As such, any Contributions you transmit may be treated as non-confidential and non-proprietary.  When you create or make available any Contributions, you thereby represent and warrant that: \n1.  the creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party. \n2.  you are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Website/Mobile App, and other users of the Website/Mobile App to use your Contributions in any manner contemplated by the Website/Mobile and these Terms of Use. \n3.  you have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Website/Mobile App and these Terms of Use. \n4.  your Contributions are not false, inaccurate, or misleading. \n5.  your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation. \n6.  your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us). \n7.  your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone. \n8.  your Contributions do not advocate the violent overthrow of any government or incite, encourage, or threaten physical harm against another. \n 9.  your Contributions do not violate any applicable law, regulation, or rule. \n10.  your Contributions do not violate the privacy or publicity rights of any third party. \n11  your Contributions do not violate any federal or state laws. \n12.  your Contributions do not otherwise violate, or link to material that violates, any provision of these Terms of Use, or any applicable law or regulation.\nAny use of the Website/Mobile App in violation of the foregoing violates these Terms of Use and may result in, among other things, termination or suspension of your rights to use the Website/Mobile App.'}
                </Text>
                
                <Text 
                  style ={styles.titleText}>
                  {'GUIDELINES FOR REVIEWS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We may provide you areas on the Website/Mobile App to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the service being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hate language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative.\nWe may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate.  Reviews are not endorsed by us, and do not necessarily represent our opinions or  the views  of any of our affiliates or partners.  We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully-paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to reviews.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'SUBMISSIONS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Website/Mobile App ("Submissions") provided by you to us are non-confidential and shall become our sole property.  We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.  You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions.  You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'THIRD-PARTY WEBSITES AND CONTENT'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The Website/Mobile App may contain (or you may be sent via the Website/Mobile App) links to other websites ("Third-Party Websites") as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties ("Third-Party Content"). Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Website/Mobile App or any Third-Party Content posted on, available through, or installed from the Website/Mobile App, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content.  Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us.  If you decide to leave the Website/Mobile App and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should be aware these Terms of Use no longer govern.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'ADVERTISERS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We do not allow advertisers to display their advertisements in this website/Mobile App.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'WEBSITE/MOBILE APP MANAGEMENT'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We reserve the right, but not the obligation, to: (1) monitor the Website/Mobile App for violations of these Terms of Use; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Website/Mobile App or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Website/Mobile App in a manner designed to protect our rights and property and to facilitate the proper functioning of the Website/Mobile App.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'PRIVACY POLICY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We care about data privacy and security. By using the Website/Mobile App, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'COPYRIGHT INFRINGEMENTS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We respect the intellectual property rights of others.  If you believe that any material available on or through the Website/Mobile App infringes upon any copyright you own or control, please immediately notify us using the contact information provided below (a “Notification”).  A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification.  Please be advised that pursuant to extant laws you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Website/Mobile App infringes your copyright, you should consider first contacting an attorney.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'TERM AND TERMINATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'These Terms of Use shall remain in full force and effect while you use the Website/Mobile App. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE WEBSITE/MOBILE APP (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR DELETE [YOUR ACCOUNT AND] ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.\nIf we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'MODIFICATIONS AND INTERRUPTIONS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We reserve the right to change, modify, or remove the contents of the Website/Mobile App at any time or for any reason at our sole discretion without notice.  However, we have no obligation to update any information on our Website/Mobile App.  We also reserve the right to modify or discontinue all or part of the Website/Mobile App without notice at any time.  We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Website/Mobile App.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'GOVERNING LAW'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'These Terms of Use and your use of the Website/Mobile App are governed by and construed in accordance with the laws of the Federal Republic of Nigeria applicable to agreements made and to be entirely performed without regard to its conflict of law principles.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'DISPUTE RESOLUTION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'Option 1: Any legal action of whatever nature brought by either you or us (collectively, the “Parties” and individually, a “Party”) shall be commenced or prosecuted in the Federal and State High Courts of the Federal Republic of Nigeria and the Parties hereby consent to, and waive all defenses of lack of jurisdiction and forum non conveniens with respect to venue and jurisdiction in such Federal and State High Courts.  In no event shall any claim, action, or proceeding brought by either Party related in any way to the Website be commenced more than 2 years after the cause of action arose.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'Option 2: Informal Negotiations and Alternative Forms of Dispute Resolution'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'To expedite resolution and control the cost of any dispute, controversy, or claim related to these Terms of Use (each a "Dispute" and collectively, the “Disputes”) brought by either you or us (individually, a “Party” and collectively, the “Parties”), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least 30 days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.'}
                </Text>
    
                <Text 
                  style ={styles.titleText}>
                  {'Litigation'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'If the Parties are unable to resolve a Dispute through Alternative Dispute Resolution Methods, the Dispute (except those Disputes expressly excluded below) will be finally and exclusively resolved by Litigation.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'Option 2/Option 3: Restrictions'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'Option 2/Option 3: Exceptions to ADR and Litigation'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'The Parties agree that the following Disputes are not subject to the above provisions concerning ADR or Litigation: (a) any Disputes seeking to enforce or protect, or concerning the validity of, any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'CORRECTIONS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'There may be information on the Website/Mobile App that contains typographical errors, inaccuracies, or omissions that may relate to the Website/Mobile App, including descriptions, pricing, availability, and various other information.  We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Website/Mobile App at any time, without prior notice.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'DISCLAIMER'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'THE WEBSITE/MOBILE APP IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.  YOU AGREE THAT YOUR USE OF THE WEBSITE/MOBILE APP SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE WEBSITE/MOBILE APP AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE WEBSITE/MOBILE APP’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THIS WEBSITE/MOBILE APP AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE WEBSITE/MOBILE APP, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE WEBSITE/MOBILE APP, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE WEBSITE/MOBILE APP BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE WEBSITE/MOBILE APP. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE WEBSITE/MOBILE APP, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.  AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'LIMITATIONS OF LIABILITY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE WEBSITE/MOBILE APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'INDEMNIFICATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) [your Contributions]; (2) use of the Website/Mobile App;  (3) breach of these Terms of Use; (4) any breach of your representations and warranties set forth in these Terms of Use; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Website/Mobile App with whom you connected via the Website/Mobile App. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'USER DATA'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'We will maintain certain data that you transmit to the Website/Mobile App for the purpose of managing the Website/Mobile App, as well as data relating to your use of the Website/Mobile App.  Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Website/Mobile App.  You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'ELECTRONIC COMMUNICATIONS,  TRANSACTIONS, AND SIGNATURES'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Website/Mobile App, satisfy any legal requirement that such communication be in writing.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'MISCELLANEOUS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'These Terms of Use and any policies or operating rules posted by us on the Website/Mobile App constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms of Use shall not operate as a waiver of such right or provision.  These Terms of Use operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time.  We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.  If any provision or part of a provision of these Terms of Use is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms of Use and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Terms of Use or use of the Website/Mobile App.  You agree that these Terms of Use will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Terms of Use and the lack of signing by the parties hereto to execute these Terms of Use.'}
                </Text> 
                <Text 
                  style ={styles.titleText}>
                  {'CONTACT US'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {'In order to resolve a complaint regarding the Website/Mobile App or to receive further information regarding use of the Website/Mobile App, please contact us at: \nLaurels and Prizes Law Publications. \nH174 Tony Munagor Street, Golf Course Layout, Enugu Nigeria. \n07035222225 \ncourtofappealreportsnigeria.com \ncourtofappealreports2015@yahoo.com \ninfo@courtofappealreportsnig.com'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {''}
                </Text>
                <Text 
                  style ={styles.contentText}>
                    {''}
                </Text>
                
              </View>
            </ScrollView>
          </View>
          <View style = {styles.modalButton }> 
            <TouchableHighlight
              style = {styles.buttonClose}
              onPress={ this.closeTermsModal}>
              <Text style = {styles.closeText}>
                {''}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    )
  }
} 
