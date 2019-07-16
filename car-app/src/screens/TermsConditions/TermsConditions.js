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
                <Text style ={styles.titleText}>
                  {'TERMS TO INVEST IN SETH MINING CROWD FUNDING'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Please read this Agreement carefully before accessing the Seth mining crowd Website. Which states As a condition to and in consideration of receiving and accessing Seth Website, the User agrees to be bound by the terms of this Agreement. Use of or access to this constitute, acceptance of and concurrence to be bound by this Agreement. If you do not wish to be bound by this Agreement, do not access Seth Website. If you have any questions about this Agreement, please contact us via mail us at support@seth-mining-invest.com This Website is not for use by any minors (defined as those who are not at least 18 years of age), and you must not use this Website if you a child. This Agreement is entered between Seth (hereafter referred to as SETH MINING CROWDFUNDING ") and any individual, corporation, association, agency, the company, or other entity (hereafter referred to as " THE USER or YOU ") who accesses or uses Page\'s Website (also referred to as This Website SETH Website, is provided without charge to you, is a public website on the Internet Designed to allow Page to communicate with vice versa. This Website is owned and operated by SETH ENERGY & Mineral LLC & SETH ENERGY & MINERAL LTD It contains information, communications,opinions, text, graphics, links, electronic art animations, audio, video, Software,photos,music,sounds and other material and data (collectively referred to herein as Content") formatted, organized and collated in a variety of forms that are generally accessible to Users including directories and databases,and areas On SETH Website that can be modified by Users, such as posting classifieds, uploading multimedia files, registering user profiles, and creating auto notify, personalized pages, and customized project areas, which cannot be done on Seth crowd-funding website'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'ACCEPTANCE OF TERMS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'The services that Seth Energy and Mineral Ltd provide to User is subject to the following Terms of Use ("TOU"). Seth Energy and Mineral Ltd & Seth Energy and Mineral LLC reserve the right to update the TOU at any time without notice to User. The most current version of the TOU can be review by clicking on the "Terms of Use" hypertext link located at the bottom of our Web pages.\nThis Agreement, which incorporates by reference other provisions applicable to use of www.seth-mining-invest.com, including, but not limited to, supplemental terms and conditions set forth hereof ("Supplemental Terms") governing the use of particular specific material contained in www.seth-mining-invest.com, sets forth the terms and conditions that apply to use of www.seth-mining-invest.com by User. By using Seth Energy (other than to read this Agreement for the first time), User agrees to comply with all of the terms and conditions hereof. The right to use www.seth-mining-invest.com is personal to User and is not transferable to any other person or entity. User is responsible for all use of User\'s Account (under any screen name or password) and for ensuring that all use of User\'s Account complies fully with the provisions of this Agreement. User shall be responsible for protecting the confidentiality of User\'s password(s) if any.\nSeth Mining Crowd Funding shall have the right at any time to change or discontinue any aspect or feature of www.seth-mining-invest.com, including, but not limited to, content, hours of availability, and equipment needed for access or use.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'CHANGED TERMS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Seth shall have the right at any time to change or modify the terms and conditions applicable to User\'s use of www.seth-mining-invest.com, or any part thereof, or to impose new conditions, including, but do not or cannot add, any fees for use. Such changes, modifications, additions or deletions shall be effective immediately upon notice thereof, which may be given by means including, but not limited to, posting on www.seth-mining-invest.com, or by electronic or conventional mail, or by any other means by which User obtains notice thereof. Any use of www.seth-mining-invest.com by User after such notice shall be deemed to constitute acceptance by User of such changes, modifications or additions.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'DESCRIPTION OF SERVICES'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Through its Web property, Seth provides User with access to a variety of resources, including download areas, communication forums and product information (collectively "Services"). The Services, including any updates, enhancements, new features, and the addition of any new Web properties, are subject to the TOU. Updates via emails and recent development via website blog or app projects update.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'EQUIPMENT'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'User shall be responsible for obtaining and maintaining all telephone, computer hardware, Software and other equipment needed for access to and use of www.seth-mining-invest.com and all charges related to that.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'USER CONDUCT'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 8}]}>
                  {' • User shall use www.seth-mining-invest.com for lawful purposes only. User shall not post or transmit through www.seth-mining-invest.com any material which violates or infringes in any way upon the rights of others, which is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any law, or which, without Seth\'s express prior approval, contains advertising or any solicitation with respect to products or services. Any conduct by a User that in Seth\'s discretion restricts or inhibits any other User from using or enjoying www.seth-mining-invest.com will not be permitted. User shall not use www.seth-mining-invest.com to advertise or perform any commercial solicitation, including, but not limited to, the solicitation of users to become subscribers of other on-line information services competitive with Seth.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 8}]}>
                  {' • www.seth-mining-invest.com contains copyrighted material, trademarks, and additional proprietary information, including, but not limited to, text, Software, photos, video, graphics, music and sound, and the entire contents of www.seth-mining-invest.com are copyright as a collective work under the copyright laws. Seth owns a copyright in the selection, coordination, arrangement, and enhancement of such content, as well as in the content original to it. User may not modify, publish, transmit, participate in the transfer or sale, create derivative works, or in any way exploit, any of the content, in whole or in part. Except as otherwise expressly permitted under copyright law, no copying, redistribution, retransmission, publication or commercial exploitation of downloaded material will be permitted without the express permission of Seth and the copyright owner. In the event of any permitted copying, redistribution or publication of copyrighted material, no changes in or deletion of author attribution, trademark legend or copyright notice shall be. User acknowledges that it does not acquire any ownership rights by downloading copyrighted material.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 8}]}>
                  {' • User shall not upload, post or otherwise make available on www.seth-mining-invest.com any material protected by copyright, trademark or other proprietary rights without the express permission of the owner of the copyright, trademark or other exclusive right and the burden of determining that any material not protected by copyright rests with User. User shall be solely liable for any damage resulting from any infringement of copyrights, proprietary rights, or any other harm resulting from such a submission. By submitting material to any public area of www.seth-mining-invest.com, User automatically grants, or warrants that the owner of such content has expressly granted Seth the royalty-free, perpetual, irrevocable, non-exclusive right and license to use, reproduce, modify, adapt, publish, translate and distribute such material (in whole or in part) worldwide and/or to incorporate it in other works in any form, media or technology now known or hereafter developed for the full term of any copyright that may exist in such material. The User also permits any other User to access, view, store or reproduce the material for that User\'s personal use. The User at this moment grants Seth the right to edit, copy, publish, and distribute any content made available on www.seth-mining-invest.com by User.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 8}]}>
                  {' • The preceding provisions of Section 5 are for the benefit of Seth, its subsidiaries, affiliates, and its third party content providers and licensors and each shall have the right to assert and enforce such provisions directly or on its behalf.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'USE OF SERVICES'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'The Services may contain email services, bulletin board services, chat areas, news groups, forums, communities, personal web pages, calendars, photo albums, file cabinets and/or other message or communication facilities designed to enable User to communicate with others (each a "Communication Service" and collectively "Communication Services"). User agrees to use the Communication Services only to post, send, and receive messages and material that are proper and, when applicable, related to the particular Communication Service. By way of example, and not as a limitation, User agrees that when using the Communication Services, User will not:'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Use the Communication Services in connection with surveys, contests, pyramid schemes, chain letters, junk email, spamming, or any duplicative or unsolicited messages (commercial or otherwise).'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights (such as rights of privacy and publicity) of others.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Publish, post, upload, distribute, or disseminate any inappropriate, profane, defamatory, obscene, indecent or unlawful topic, name, material, or information.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Upload, or otherwise make available, files that contain images, photographs, Software or other material protected by intellectual property laws, including, by way of example, and not as limitation, copyright or trademark laws (or by rights of privacy or publicity) unless User own or control the rights thereto or have received all necessary consent to do the same.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Use any material or information, including images or photographs, which are made available through the Services in any manner that infringes any copyright, trademark, patent, trade secret, or other proprietary rights of any party.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Upload files that contain viruses, Trojan horses, worms, time bombs, cancelbots, corrupted files, or any other similar software or programs that may damage the operation of another\'s computer or property of another.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'•Advertise or offer to sell or buy any goods or services for any business purpose, unless such Communication Services specifically allows such messages.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Download any file posted by another user of a Communication Service that User knows, or reasonably should know, cannot be legally reproduced, displayed, performed, and distributed in such manner.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Falsify or delete any copyright management information, such as author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of Software or other material contained in a file that is uploaded'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Restrict or inhibit any other user from using and enjoying the Communication Services.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 18}]}>
                  {'• Violate any code of conduct or other guidelines which may be applicable for any particular Communication Service.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Harvest or otherwise collect information about others, including email addresses.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Violate any applicable laws or regulations.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Create a false identity to mislead others.'}
                </Text>
                <Text 
                  style ={[styles.contentText, {paddingLeft : 16}]}>
                  {'• Use, download or otherwise copy, or provide (whether or not for a fee) to a person or entity any directory of users of the Services or other User or usage information or any portion thereof.'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Seth has no obligation to monitor the Communication Services. However, Seth reserves the right to review materials posted to the Communication Services Blog and to remove any materials in its sole discretion. Seth reserves the right to terminate User\'s access to any or all of the Communication Services at any time, without notice, for any reason whatsoever. Seth reserves the right at all times to disclose any information as it deems necessary to satisfy any applicable law, regulation, legal process or governmental request, or to edit, refuse to post or to remove any information or materials, in whole or in part, in Seth\'s sole discretion.\nMaterials uploaded to the Communication Services may be subject to posted limitations on usage, reproduction or dissemination; User is responsible for adhering to such limitations if User downloads the materials.\nAlways use caution when giving out any personally identifiable information in any Communication Services. Seth does not control or endorse the content, messages or information found in any Communication Services and, therefore, Seth expressly disclaims any liability concerning the Communication Services and any actions resulting from User\'s participation in any Communication Services. Managers and hosts have not authorized Seth spokespersons, and their views do not necessarily reflect those.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'MEMBER ACCOUNT, PASSWORD, AND SECURITY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'If any of the Services requires User to open an account, User must complete the registration process by providing Seth Energy and Mineral Ltd with current, complete and accurate information as prompted by the applicable registration form. The User also will choose a password and a user name. User is entirely responsible for maintaining the confidentiality of User\'s password and account. Furthermore, User is solely responsible for any activities that occur under User\'s account. User agrees to notify Seth Energy and Mineral Ltd immediately of any unauthorized use of User\'s account or any other breach of security. Seth Energy and Mineral Ltd will not be liable for any loss that User may incur as a result of someone else using User\'s password or account, either with or without User\'s knowledge. However, User could be held liable for losses incurred by Seth Energy and Mineral Ltd or another party due to someone else using User\'s account or password. User may not use anyone else\'s account at any time, without the permission of the account holder.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'NOTICE SPECIFIC TO SOFTWARE AVAILABLE ON THIS WEB SITE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Any software that is made available to download from the Services ("Software") is the copyrighted work of Seth Energy and Mineral Ltd and or its suppliers. Use of the Software is governed by the terms of the end user license agreement, if any, which accompanies or is included with the Software ("License Agreement"). An end user will be unable to install any Software that is accompanied by or includes a License Agreement unless he or she first agrees to the License Agreement terms.\nThe Software is made available for download solely for use by end users according to the License Agreement. Any reproduction or redistribution of the Software not following the License Agreement is expressly prohibited by law and may result in severe civil and criminal penalties. Violators will be prosecuted to the maximum extent possible.\nWITHOUT LIMITING THE preceding, COPYING OR REPRODUCTION OF THE SOFTWARE TO ANY OTHER SERVER OR LOCATION FOR FURTHER REPRODUCTION OR REDISTRIBUTION IS EXPRESSLY PROHIBITED UNLESS SUCH REPRODUCTION OR REDISTRIBUTION IS EXPRESSLY PERMITTED BY THE LICENSE AGREEMENT ACCOMPANYING SUCH SOFTWARE. THE SOFTWARE IS WARRANTED, IF AT ALL, ONLY ACCORDING TO THE TERMS OF THE LICENSE AGREEMENT. EXCEPT AS WARRANTED IN THE LICENSE AGREEMENT, Seth Energy and Mineral Ltd at this moment disclaim ALL WARRANTIES AND CONDITIONS concerning THE SOFTWARE, INCLUDING ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, WHETHER EXPRESS, IMPLIED OR STATUTORY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.\nFOR YOUR CONVENIENCE, Seth Energy and Mineral Ltd MAY MAKE AVAILABLE AS PART OF THE SERVICES OR IN ITS SOFTWARE PRODUCTS, TOOLS AND UTILITIES FOR USE AND OR DOWNLOAD. Seth Energy and Mineral Ltd do NOT MAKE ANY ASSURANCES concerning THE ACCURACY OF THE RESULTS OR OUTPUT THAT DERIVES FROM SUCH USE OF ANY SUCH TOOLS AND UTILITIES. PLEASE RESPECT THE INTELLECTUAL PROPERTY RIGHTS OF OTHERS WHEN USING THE TOOLS AND UTILITIES MADE AVAILABLE ON THE SERVICES.\nYou are not responsible for providing all hardware, Software, but you are entitled to provide telephone email or other communications equipment and or service to connect to the Internet and access\nSETH Website and are responsible for all Internet access charges, telephone connecting to the Internet to access.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'NOTICE SPECIFIC TO DOCUMENTS AVAILABLE ON THIS WEB SITE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Permission to use Documents (such as white papers, press releases, datasheets, and FAQs) from the Services is granted, provided that (1) the below copyright notice appears in all copies and that both the copyright notice and this permission notice appear, (2) use of such Documents from the Services is for informational and non-commercial or personal use only and will not be copied or posted on any network computer or broadcast in any media, and (3) no modifications of any Documents are made. Accredited educational institutions, such as universities, private/public colleges, and state community colleges, may download and reproduce the Documents for distribution in the classroom. Delivery outside the classroom requires express written permission. Use for any other purpose is expressly prohibited by law and may result in severe civil and criminal penalties. Violators will be prosecuted to the maximum extent possible.\nSeth Energy and Mineral Ltd AND OR ITS RESPECTIVE SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY OF THE INFORMATION CONTAINED IN THE DOCUMENTS AND RELATED GRAPHICS PUBLISHED AS PART OF THE SERVICES FOR ANY PURPOSE. ALL SUCH DOCUMENTS AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. Seth Energy and Mineral Ltd AND OR ITS RESPECTIVE SUPPLIERS as a result of this DISCLAIM ALL WARRANTIES AND CONDITIONS concerning THIS INFORMATION, INCLUDING ALL WARRANTIES AND CONDITIONS OF MERCHANTABILITY, WHETHER EXPRESS, IMPLIED OR STATUTORY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN NO EVENT SHALL Seth Energy and Mineral Ltd AND/OR ITS RESPECTIVE SUPPLIERS BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF INFORMATION AVAILABLE FROM THE SERVICES.\nTHE DOCUMENTS AND RELATED GRAPHICS PUBLISHED ON THE SERVICES COULD INCLUDE TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. Seth Energy and Mineral Ltd AND OR ITS RESPECTIVE SUPPLIERS MAY MAKE IMPROVEMENTS and CHANGES IN THE PRODUCT(S), and THE PROGRAM(S) DESCRIBED HEREIN AT ANY TIME.\nNOTICES REGARDING SOFTWARE, DOCUMENTS, AND SERVICES AVAILABLE ON THIS SITE\nIN NO EVENT SHALL Seth Energy and Mineral Ltd AND/OR ITS RESPECTIVE SUPPLIERS BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF SOFTWARE, DOCUMENTS, PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR INFORMATION AVAILABLE FROM THE SERVICES.\nMATERIALS PROVIDED TO Seth Energy and Mineral Ltd OR POSTED AT ANY OF ITS WEBSITES\nSeth Energy and Mineral Ltd does not claim ownership of the materials User provide to Seth Energy and Mineral Ltd (including feedback and suggestions) or post, upload, input or submit to any Services or its associated services for review by the general public, or by the members of any public or private community, (each a "Submission" and collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting ("Posting") User\'s Submission User is granting Seth Energy and Mineral Ltd, its affiliated companies and necessary sub licensees permission to use User\'s Submission in connection with the operation of their Internet businesses (including, without limitation, all Seth Energy and Mineral Ltd Services), including, without limitation, the license rights to: copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat User\'s Submission; to publish User\'s name in connection with User\'s Submission; and the right to sublicense such rights to any supplier of the Services.\nNo compensation will be paid for the use of User\'s Submission, as provided herein. Seth Energy and Mineral Ltd are under no obligation to post or use any Submission User may provide and Seth Energy, and Mineral Ltd may remove any Submission at any time in its sole discretion. By Posting Submission User warrants and represents to own or otherwise control all of the rights to User\'s Submission as described in these Terms of Use including, without limitation, all the rights necessary for User to provide, post, upload, input or submit the Submissions.\nIn addition to the warranty and representation set forth above, by Posting a Submission that contains images, photographs, pictures or that are otherwise graphical in whole or in part ("Images"), User warrant and represents that (a) User is the copyright owner of such Images, or that the copyright owner of such Images has granted User permission to use such Images or any content and/or images contained in such Images consistent with the manner and purpose of User\'s use and as otherwise permitted by these Terms of Use and the Services, (b) User have the rights necessary to grant the licenses and sublicenses described in these Terms of Use, and (c) that each person depicted in such Images, if any, has provided consent to the use of the Images as set forth in these Terms of Use, including, by way of example, and not as a limitation, the distribution, public display and reproduction of such Images. By Posting Images, User is granting (a) to all members of User\'s private community (for each such Images available to members of such private community), and/or (b) to the general public (for each such Images available anywhere on the Services, other than a private community), permission to use User\'s Images in connection with the use, as permitted by these Terms of Use, of any of the Services, (including, by way of example, and not as a limitation, making prints and gift items which include such Images), and including, without limitation, a non-exclusive, worldwide, royalty-free license to copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat User\'s Images without having User\'s name attached to such Images, and the right to sublicense such rights to any supplier of the Services. The licenses granted in the preceding sentences for a Images will terminate at the time User altogether remove such Images from the Services, provided that, such termination shall not affect any licenses granted in connection with such Images before the time User entirely remove such Images. No compensation will be paid concerning the use of User\'s Images.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'DISCLAIMER OF WARRANTY; LIMITATION OF LIABILITY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'• USER EXPRESSLY AGREES THAT USE OF www.seth-mining-invest.com IS AT USER\'S SOLE RISK. NEITHER Seth Energy and Mineral Ltd, ITS AFFILIATES NOR ANY OF THEIR RESPECTIVE EMPLOYEES, AGENTS, THIRD PARTY CONTENT PROVIDERS OR LICENSORS WARRANT THAT www.seth-mining-invest.com WILL BE UNINTERRUPTED OR ERROR FREE; NOR DO THEY MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF www.seth-mining-invest.com, OR AS TO THE ACCURACY, RELIABILITY OR CONTENT OF ANY INFORMATION, SERVICE, OR MERCHANDISE PROVIDED THROUGH www.seth-mining-invest.com.\n• www.seth-mining-invest.com IS PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF TITLE OR IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, OTHER THAN THOSE WARRANTIES WHICH ARE IMPLIED BY AND INCAPABLE OF EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS APPLICABLE TO THIS AGREEMENT.\n• THIS DISCLAIMER OF LIABILITY APPLIES TO ANY DAMAGES OR INJURY CAUSED BY ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS, COMMUNICATION LINE FAILURE, THEFT OR DESTRUCTION OR UNAUTHORIZED ACCESS TO, ALTERATION OF, OR USE OF RECORD, WHETHER FOR BREACH OF CONTRACT, TORTIOUS BEHAVIOR, NEGLIGENCE, OR UNDER ANY OTHER CAUSE OF ACTION. USER SPECIFICALLY ACKNOWLEDGES THAT Seth Energy and Mineral Ltd IS NOT LIABLE FOR THE DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD-PARTIES AND THAT THE RISK OF INJURY FROM THE preceding RESTS ENTIRELY WITH USER.\n• IN NO EVENT WILL Seth Energy and Mineral Ltd, OR ANY PERSON OR ENTITY INVOLVED IN CREATING, PRODUCING OR DISTRIBUTING www.seth-mining-invest.com OR THE Seth Energy and Mineral Ltd SOFTWARE, BE LIABLE FOR ANY DAMAGES, INCLUDING, WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE www.seth-mining-invest.com. USER as a result of this ACKNOWLEDGES THAT THE PROVISIONS OF THIS SECTION SHALL APPLY TO ALL CONTENT ON THE SITE.\n •IN ADDITION TO THE TERMS SET FORTH ABOVE NEITHER, Seth Energy and Mineral Ltd, NOR ITS AFFILIATES, INFORMATION PROVIDERS OR CONTENT PARTNERS SHALL BE LIABLE REGARDLESS OF THE CAUSE OR DURATION, FOR ANY ERRORS, INACCURACIES, OMISSIONS, OR OTHER DEFECTS IN, OR UNTIMELINESS OR UNAUTHENTICITY OF, THE INFORMATION CONTAINED WITHIN www.seth-mining-invest.com, OR FOR ANY DELAY OR INTERRUPTION IN THE TRANSMISSION THEREOF TO THE USER, OR FOR ANY CLAIMS OR LOSSES ARISING THEREFROM OR OCCASIONED THEREBY. NONE OF THE preceding PARTIES SHALL BE LIABLE FOR ANY THIRD-PARTY CLAIMS OR LOSSES OF ANY NATURE, INCLUDING, BUT NOT LIMITED TO, LOST PROFITS, PUNITIVE OR CONSEQUENTIAL DAMAGES.\n• Before THE EXECUTION OF A STOCK TRADE, USERS ARE ADVISED TO CONSULT WITH YOUR BROKER OR OTHER FINANCIAL REPRESENTATIVE TO VERIFY PRICING OR OTHER INFORMATION. Seth Energy and Mineral Ltd, ITS AFFILIATES, INFORMATION PROVIDERS OR CONTENT PARTNERS SHALL HAVE NO LIABILITY FOR INVESTMENT DECISIONS BASED ON THE INFORMATION PROVIDED. NEITHER, Seth Energy and Mineral Ltd, NOR ITS AFFILIATES, INFORMATION PROVIDERS OR CONTENT PARTNERS WARRANT OR GUARANTEE THE TIMELINESS, SEQUENCE, ACCURACY OR COMPLETENESS OF THIS INFORMATION. Additionally, THERE ARE NO WARRANTIES AS TO THE RESULTS OBTAINED FROM THE USE OF THE INFORMATION.\n• FORCE MAJEURE – NEITHER PARTY WILL BE RESPONSIBLE FOR ANY FAILURE OR DELAY IN PERFORMANCE DUE TO CIRCUMSTANCES BEYOND ITS REASONABLE CONTROL, INCLUDING, WITHOUT LIMITATION, ACTS OF GOD, WAR, RIOT, EMBARGOES, ACTS OF CIVIL OR MILITARY AUTHORITIES, FIRE, FLOODS, ACCIDENTS, SERVICE OUTAGES RESULTING FROM EQUIPMENT AND/OR SOFTWARE FAILURE AND/OR TELECOMMUNICATIONS FAILURES, POWER FAILURES, NETWORK FAILURES, FAILURES OF THIRD PARTY SERVICE PROVIDERS (INCLUDING PROVIDERS OF INTERNET SERVICES AND TELECOMMUNICATIONS). THE PARTY AFFECTED BY ANY SUCH EVENT SHALL NOTIFY THE OTHER PARTY WITHIN A MAXIMUM OF FIFTEEN (15) DAYS FROM ITS OCCURENCE. THE PERFORMANCE OF THS AGREEMENT SHALL THEN BE SUSPENDED FOR AS LONG AS ANY SUCH EVENT SHALL PREVENT THE AFFECTED PARTY FROM PERFORMING ITS OBLIGATIONS UNDER THIS AGREEMENT.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'LINKS TO THIRD PARTY SITES'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'THE LINKS IN THIS AREA WILL LET YOU LEAVE Seth Energy and Mineral Ltd\'S SITE. THE LINKED SITES ARE NOT UNDER THE CONTROL OF Seth Energy and Mineral Ltd AND Seth Energy and Mineral Ltd IS NOT RESPONSIBLE FOR THE CONTENTS OF ANY LINKED SITE OR ANY LINK CONTAINED IN A LINKED SITE, OR ANY CHANGES OR UPDATES TO SUCH SITES. Seth Energy and Mineral Ltd are NOT RESPONSIBLE FOR WEBCASTING OR ANY OTHER FORM OF TRANSMISSION RECEIVED FROM ANY LINKED SITE. Seth Energy and Mineral Ltd are PROVIDING THESE LINKS TO YOU ONLY AS A CONVENIENCE, AND THE INCLUSION OF ANY LINK DOES NOT IMPLY ENDORSEMENT BY Seth Energy and Mineral Ltd OF THE SITE.\nSeth Energy and Mineral Ltd is a distributor (and not a publisher) of content supplied by third parties and Users. Accordingly, Seth Energy and Mineral Ltd have no more editorial control over such content than does a public library, bookstore, or newsstand. Any opinions, advice, statements, services, offers, or other information or content expressed or made available by third parties, including information providers, Users or any other user of www.seth-mining-invest.com, are those of the respective author(s) or distributor(s) and not of Seth Energy and Mineral Ltd. Neither Seth Energy and Mineral Ltd nor any third-party provider of information guarantees the accuracy, completeness, or usefulness of any content, nor its merchantability or fitness for any particular purpose.\nIn many instances, the content available through www.seth-mining-invest.com represents the opinions and judgments of the respective information provider, User, or another user not under contract with Seth Energy and Mineral Ltd. Seth Energy and Mineral Ltd neither endorses nor is responsible for the accuracy or reliability of any opinion, advice or statement made on www.seth-mining-invest.com by anyone other than authorized Seth Energy and Mineral Ltd employee spokespersons while acting in their official capacities. Under no circumstances will Seth Energy and Mineral Ltd be liable for any loss or damage caused by a User\'s reliance on information obtained through www.seth-mining-invest.com. It is the responsibility of User to evaluate the accuracy, completeness, or usefulness of any information, opinion, advice, or other content available through Seth Energy and Mineral Ltd. Please seek the advice of professionals, as appropriate, regarding the evaluation of any specific information, opinion, consultation, or other content.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'UNSOLICITED IDEA SUBMISSION POLICY'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Seth Energy and Mineral Ltd OR ANY OF ITS EMPLOYEES DO NOT ACCEPT OR CONSIDER UNSOLICITED IDEAS, INCLUDING IDEAS FOR NEW ADVERTISING CAMPAIGNS, NEW PROMOTIONS, NEW PRODUCTS OR TECHNOLOGIES, PROCESSES, MATERIALS, MARKETING PLANS OR NEW PRODUCT NAMES. PLEASE DO NOT SEND ANY ORIGINAL CREATIVE ARTWORK, SAMPLES, DEMOS, OR OTHER WORKS. THE SOLE PURPOSE OF THIS POLICY IS TO AVOID POTENTIAL MISUNDERSTANDINGS OR DISPUTES WHEN Seth Energy and Mineral Ltd\'S PRODUCTS OR MARKETING STRATEGIES MIGHT SEEM SIMILAR TO IDEAS SUBMITTED TO Seth Energy and Mineral Ltd. SO, PLEASE DO NOT SEND YOUR UNSOLICITED IDEAS TO Seth Energy and Mineral Ltd OR ANYONE AT Seth Energy and Mineral Ltd. IF DESPITE OUR REQUEST THAT YOU NOT SEND US YOUR IDEAS AND MATERIALS, YOU STILL SEND THEM, PLEASE UNDERSTAND THAT Seth Energy and Mineral Ltd MAKES NO ASSURANCES THAT YOUR IDEAS AND MATERIALS WILL BE TREATED AS CONFIDENTIAL OR PROPRIETARY.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'MONITORING'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Seth Energy and Mineral Ltd shall have the right, but not the obligation, to monitor the content of www.seth-mining-invest.com, including chat rooms and forums, to determine compliance with this Agreement and any operating rules established by Seth Energy and Mineral Ltd and to satisfy any law, regulation or authorized government request. Seth Energy and Mineral Ltd shall have the right in its sole discretion to edit, refuse to post or remove any material submitted to or posted on www.seth-mining-invest.com. Without limiting the preceding, Seth Energy and Mineral Ltd shall have the right to remove any content that Seth Energy and Mineral Ltd, in its sole discretion, finds to violate the provisions hereof or otherwise objectionable.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'INDEMNIFICATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'User agrees to defend, indemnify and hold harmless Seth Energy and Mineral Ltd, its affiliates and their respective directors, officers, employees and agents from and against all claims and expenses, including attorney\'s fees, arising out of the use of Seth Energy and Mineral Ltd by User or User\'s Account.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'TERMINATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Either Seth Energy and Mineral Ltd or User may terminate this Agreement at any time. Without limiting the preceding, Seth Energy and Mineral Ltd shall have the right to immediately terminate User\'s Account in the event of any conduct by User which Seth Energy and Mineral Ltd, in its sole discretion, considers being unacceptable, or in the event of any breach by User of this Agreement.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'MISCELLANEOUS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'This Agreement and any operating rules for www.seth-mining-invest.com established by Seth Energy and Mineral Ltd constitute the entire Agreement of the parties concerning the subject matter hereof and supersede all previous written or oral agreements between the parties concerning such subject matter. This Agreement shall be construed following the laws of the, without regard to its conflict of laws rules. No waiver by either party of any breach or default hereunder shall be deemed to be a waiver of any preceding or subsequent breach or default. The section headings used herein are for convenience only and shall not be given any legal import.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'NOTIFICATIONS AND COMMUNICATION'}
                </Text>
                <Text 
                  style ={[styles.contentText, { paddingLeft: 16}]}>
                  {'• The company will thoroughly review all announcements, updates, and reports from Seth Mining as they represent a record of information about the investment made on a mining site to all investors.\n• The investor is required to provide up-to-date and accurate information, as requested by Seth Mining.\n•Investors should communicate with Seth Mining by email, telephone, or physical correspondence. Email is info@seth-mining-invest.com, telephone'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'CLIENT INTERFERENCE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Investors on Seth Mining Invest shall not interfere by any means with the operations, management, and administration of the mining business. Pieces of Advice are welcome for the development of the entire company; this should be done via email to info@seth-mining-invest.com.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'LIQUIDATION'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'In the event where Seth Mining Investor Seth Energy and Minerals Ltd liquidates before the expiry of management and investment contract, the mining sites as an investment asset would be sold, and proceeds will be distributed to investors or sponsors according to their investment stake on the mining site.\nThis terms and condition would be updated from time to time; notifications would be sent to all stakeholders and investors by email or through member\'s area on the Website. Proceeding to register with Seth Mining Invest or making an investment in a mining site means you agree to Seth Mining Crowd Funding terms and conditions.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'COPYRIGHT NOTICE'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'Seth Energy and Mineral Ltd its logos are trademarks of Seth Energy and Mineral Ltd Ltd. All rights reserved. All other trademarks appearing on Seth Energy and Mineral Ltd are the property of their respective owners.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
                  {'TRADEMARKS'}
                </Text>
                <Text 
                  style ={styles.contentText}>
                  {'The names of actual companies and products mentioned herein may be the trademarks of their respective owners. The example companies, organizations, products, domain names, email addresses, logos, people, and events depicted herein are fictitious. No association with any real company, organization, product, domain name, email address, logo, person, or event is intended or should be inferred.\nAny rights not expressly granted herein are reserved.'}
                </Text>
                <Text 
                  style ={styles.titleText}>
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
