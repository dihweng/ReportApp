'use strict';
import React, {Component} from 'react';
import { View, ScrollView, UIManager,Text,SafeAreaView, Platform,LayoutAnimation,StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';

class AccordionView extends Component {

  constructor() {
    super();
    this.state = {
      updated_Height: 0
    }
  }

  componentWillReceiveProps(update_Props) {
    if (update_Props.item.expanded) {
      this.setState(() => {
        return {
          updated_Height: null
        }
      });
    }
    else {
      this.setState(() => {
        return {
          updated_Height: 0
        }
      });
    }
  }

  shouldComponentUpdate(update_Props, nextState) {

    if (update_Props.item.expanded !== this.props.item.expanded) {
      return true;
    }
    return false;
  }

  render() {

    return (

      <View style={styles.Panel_Holder}>
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={this.props.onClickFunction}
          style={styles.Btn}>

          <Text 
            style={styles.Panel_Button_Text}>{
            this.props.item.title} 
          </Text>
        </TouchableOpacity>
        <View 
          style={{ height: this.state.updated_Height, overflow: 'hidden' }}>
          <Text style={styles.Panel_text}>
            {this.props.item.body}
          </Text>
        </View>
      </View>

    );
  }
}

export default class Faq extends Component {

  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
                                                               
    const arrayFaq = [

      { expanded: false, title: "Why do you currently pay a dividend?", body: "We pay interest after 6month to 5 years and investors that choose to exit the account provided will be credited with his investment or the money require from his or her investment they get it in 24 hours depends on different bank operating time but note every money invested with one year window 12 month we give 1 % as bonus per year if invested for 5 years we give 5% as bonus which will be given as stake or shares buy back" },
      { expanded: false, title: "What does Seth Energy do with its Excess Cash Flow?", body: "We reinvest excess cash flow into acquire mining site and kept substantial to give back to investors our project is a 5 year term to acquire more site refining and smelting plant." },
      { expanded: false, title: "Why did Seth Energy choose to be a public company?", body: "In the nearest future we choose to be on two quoted on two stock exchange" },
      { expanded: false, title: "How have you mitigated risk?", body: "Our risk is mininmum we make sure all insurance covered all equipment all human resources is also covered and all commuinity which we are involve is settled well and some amount of work force are from the community also . We have CSR community socila responsiblity providing some basic health care and social amenities in the community in which we work. Our structure provides attractive economic benefits." },
      { expanded: false, title: "How does Seth Energy finance their investments?", body: "Our bulk of working capital is from our crowd funding.      " },
      { expanded: false, title: "What types of businesses have you invested in so far?", body: "Seth Energy and Mineral have invested so far in limestone deposit ,feldspar mineral deposit and done exploration for lead and zinc ore mines and have also done mining for lead ore deposit site and actively trading base metals to oversea buyers." },
      { expanded: false, title: "How does seth mining crowd funding generate cash flow?", body: "When ore is mine from the ground and sells to smelters or traders cash flow is been generated and substantial amount of profit is been pluged in to acquire other mining site and some kept to payback investors." },
      { expanded: false, title: "How long do you hold your investments for?", body: "Our investment plan, seth mining crowd funding is just for 5 years and each interest earn on it from investors and as profit to us also . The interest is 3% earn profit per month which make our investmnt portfolio is of high yield to investors.The invest can be refunded back on when client need his investement it will be calculated on months when fund is with the platform with 24 hours fund is return back. But for large investment it could take sometime maybe 3 days to 7 days which amount to more than a 1 million dollars." },
      { expanded: false, title: "What type of businesses will you not invest in?", body: "We mine base metals having our portfolio and projected plan of acquiring more lead ore site establishing lead smelting plant 1500 ton per month plant, Bitumen mining and refining movement of bulk minerals companies. What we invest in is mainly base metals tin ore ,lead ore ,zinc ore iron ore and cooper ore ,Our criteria is to invest in mining deposit of economic viable." },
      { expanded: false, title: "What is your investment criteria?", body: "We consentrate on base metals mine with long life span and proven reserved deposit.We look at raising $5million to purchase mining equipment from caterpillar America and Atlas copco sweden.And some few chinese equipment" },
      { expanded: false, title: "What makes your investment model unique from other investment funds?", body: "In addition to being patient Seth Mining Crowd Funding, proven management teams and respects for talent. Business partners and staff are incented to grow free cash flow distributions, aligning them with Seth Energy Vision Seth Mining Crowd Funding is one of the first mining crowd funding platform." },
      { expanded: false, title: "What is your investment philosophy?", body: "We provide investors confidence capital along with a strong business motive focused on growth. Our patient position is predicated on allowing successful investors value for thier investment to continue driving the business forward. We have a 3 % per month investment window not have a fixed investment horizon unlike conventional private equity models." },
      { expanded: false, title: "What is Seth Mining Invest. Seth mining crowd funding", body: "The fund is powered by Seth Energy and Mineral Ltd registers in Seychelles, the fund is ti raise money from would be investors to fund mining site mining contract concentrating on base metals. The fund is founded in 2018 and last for 5 yaers where as the fund will be liquidated and stop to exist." },

    ];

    this.state = { AccordionData: [...arrayFaq] }
  }

  handleBackPress = () => {
    return this.props.navigation.goBack();
  }

  update_Layout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const faqArray = this.state.AccordionData.map((item) => {

      const newItem = Object.assign({}, item);

      newItem.expanded = false;

      return newItem;
    });

    faqArray[index].expanded = true;

    this.setState(() => {
      return {
        AccordionData: faqArray
      }
    });
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
          <View style = {styles.nameView}>
            
            <DisplayText
              text={'FAQs'}
              styles = {StyleSheet.flatten(styles.txtHeader)}
            />
          </View>
        </View> 
        <View style={styles.MainContainer}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}>
            {
              this.state.AccordionData.map((item, key) =>
                (
                  <AccordionView 
                    key={key} 
                    onClickFunction = {this.update_Layout.bind(this, key)} 
                    item={item} 
                  />
                ))
            }
          </ScrollView>
        </View>
    </SafeAreaView>
    
   )
  }
} 
