





import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import axios from'axios'

import All_Details from '../Tasks/All_Details'
import Details from '../Tasks/Details'
import Home_Admin from "../Tasks/Home_Admin";
export default class All_Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Drawer_Visible: false,
      Orders: [ ],
      loading:true,
      loading_Items:true,

    }
  }


  componentDidMount(){
    axios.get("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Admin_Select_New_Orders.php").then(res=>{
      if(res.status ==200){
       
       this.setState({
         Orders :res.data,
         loading:false
       })
       
      }else{
        alert("Try agaib later")
      }
   })
  }






  render() {
    return (
      <>
        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />


{
   this.state.loading ==true ? (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={55} color="#FF5D00">
        </ActivityIndicator>
        </View>
   ):(
     <>
      <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.state.Drawer_Visible == false ? (
                this.setState({ Drawer_Visible: true })
              ) : (
                this.setState({ Drawer_Visible: false })
              )

            }}
          >
            <Icon name="align-justify" size={26} style={{}} />
          </TouchableOpacity>

          <Text style={{ fontSize: 23, fontWeight: 'bold', }}>All Orders</Text>
          <Image source={require('../img/m2.jpg')}
        style={{ width: '15%', height: '100%', resizeMode: 'contain', borderRadius: 15 }}
      />
        </View>

        {
          this.state.Drawer_Visible == true ?
            (
              <View style={{
                width: windowWidth * .73,
                height: windowHeight,
                backgroundColor: '#fff',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                alignItems: 'center'
              }}>
                <Image source={require('../img/m3.png')}
                  style={{ width: windowWidth * .64, height: windowHeight * .29, resizeMode: 'contain' }}
                />

                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Page1")
                    this.setState({ Drawer_Visible: false })
                  }}
                >
                  <View style={styles.drwer_view}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', }}>New Orders</Text>

                    <View style={{
                      width: windowWidth * .29, justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="clipboard-list" size={27} style={{ marginLeft: 16 }} />
                    </View>
                  </View>
                </TouchableOpacity>



                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Page5")
                    this.setState({ Drawer_Visible: false })
                  }}
                >
                  <View style={styles.drwer_view}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', }}>Add Meal</Text>

                    <View style={{
                      width: windowWidth * .29, justifyContent: 'center',
                      alignItems: 'center'
                    }}>

                      <Icon name="utensils" size={27} style={{ marginLeft: 16 }} />
                    </View>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Page6")
                    this.setState({ Drawer_Visible: false })
                  }}
                >
                  <View style={styles.drwer_view}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', }}>Menu</Text>
                    <View style={{
                      width: windowWidth * .29, justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="utensils" size={27} style={{ marginLeft: 16 }} />
                    </View>
                  </View>
                </TouchableOpacity>


                <TouchableOpacity
                  onPress={() => {
                    this.setState({ Drawer_Visible: false })
                    this.setState({ Drawer_Visible: false })
                  }}
                >
                  <View style={styles.drwer_view}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', }}>All Orders</Text>
                    <View style={{
                      width: windowWidth * .29, justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Icon name="clipboard-list" size={27} style={{ marginLeft: 16 }} />
                    </View>
                  </View>
                </TouchableOpacity>


              </View>

            ) : (


              <View style={styles.container}>
                <ScrollView>

                  {
                    this.state.Orders.map((data, index) =>

                      <View style={styles.style_map} >
                        <View style={{
                          height: 70,
                          width: '95%',
                          //  backgroundColor:'#ddd',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>

                          



                          <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.user_name}</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500' }}>{data.order_date}</Text>
                          </View>


                          <Icon name ='user-circle' size={55} style={{}}/>
                        </View>

                        <View style={[styles.sub_view,{height:50,width:'95%',}]}>
                        <Text style={{fontSize:18,fontWeight:'500'}}>Order ID : {data.order_id}</Text>
                        <Text style={{fontSize:18,fontWeight:'bold',}}>Total cost : {data.order_total}</Text>
                      </View>

                        <View style={[styles.sub_view, {}]}>

                          <TouchableOpacity activeOpacity={.5}
                            onPress={() => {
                              this.props.navigation.navigate("Page4", {
                                Data:data,
                                order_id:data.order_id,
                              })

                            }}

                          >
                            <View style={{
                              width: 100,
                              height: 40,
                              backgroundColor: '#FF5D00',
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderRadius: 10
                            }}>
                              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>View Details</Text>
                            </View>
                          </TouchableOpacity>

                          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Order Status : <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FF5D00' }}>
                            Delivered</Text>

                          </Text>

                        </View>



                      </View>

                    )
                  }
                </ScrollView>
              </View>

            )
        }
     </>
   )
}

       




      </>
    )
  }
}

//  export default createAppContainer(
//    createStackNavigator(
//      {
//       Page1:All_Orders,
//       Page2:All_Details,
//       // Page3:Home_Admin,
//    },
//    {
//     headerMode: 'none'
//   },
//   {
//     initialRouteName: 'Page1'
//   }
//    ),



//  )



const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',   //windowHeight * .08
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  style_map: {
    width: windowWidth * .94,
    height: windowHeight * .3, //
    backgroundColor: '#fff',     //#F3F0F7
    marginTop: windowHeight * .04,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 20,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  sub_view: {
    width: '95%',
    // height:windowHeight*.2,
    // backgroundColor:'#0ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drwer_view: {
    width: windowWidth * .73,
    height: windowHeight * .1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 23,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,

  }
})