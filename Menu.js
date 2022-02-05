
import * as React from "react";
import {
    Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, 
    ScrollView, FlatList,ActivityIndicator,Alert
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import axios  from "axios";
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';




import Details from '../Tasks/Details'
import All_Orders from '../Tasks/All_Orders'
import All_Details from "../Tasks/All_Details";

export default class Add_meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
     Drawer_Visible:false,
      Categoris: [],
      loading:true,

        }
    }

componentDidMount(){
  axios.get("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Menu.php").then(res=>{
    if(res.status ==200){
     
     this.setState({
      Categoris :res.data,
       loading:false
     })
     
    }else{
      alert("Try agaib later")
    }
 })
}


get_Data(){
  axios.get("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Select_Menu.php").then(res=>{
    if(res.status ==200){
     
     this.setState({
      Categoris :res.data,
       loading:false
     })
     
    }else{
      alert("Try agaib later")
    }
 })
}


componentWillUnmount(){
  this.get_Data()
}


Delete(kind_id){
  let data_to_send={
    kind_id:kind_id,
  }
  axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Resaturant_Admin_Delete_Menu.php",data_to_send).then(res=>{
     if(res.status ==200){
        //  this.setState({
        //   Items:res.data,
        // //   loading :false,
        //  })
        alert(res.data)

     }else{
       alert("Try again later")
     }
  })

}


createTwoButtonAlert = (kind_id) =>
 Alert.alert(
   "Do You Want to delete item ",
   "",

   [
     {
       text: "No",
       onPress: () => console.log("Cancel Pressed"),
       style: 'cancel',
     },
     { text: "Yes", onPress: () => {
     this.Delete(kind_id)
    
     }
    
  }
   ],
   { cancelable: false }
 );
  

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

                    <Text style={{ fontSize: 23, fontWeight: 'bold', }}>Menu</Text>
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
                      this.props.navigation.navigate("Page3")
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
             
            ):(
               <View>
               <ScrollView>
                {
                    this.state.Categoris.map((item,index)=>
                    <View style={styles.style_map}>
 
 
                         <View style={{
                          width:100,
                          height:50,
                          justifyContent:'space-around',
                          alignItems:'center',
                          flexDirection:'row',
                      }}>
                          <TouchableOpacity
                           onPress={()=>{
                             this.createTwoButtonAlert (item.kind_id)
                            //  this.Delete(item.kind_id)
                             this.get_Data()
                           }}
                          >
                          <Icon name="trash-alt" style={{}} size={19}/>
                          </TouchableOpacity>
 
                          <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate("Page7",{
                                  name: item.kind_name,
                                  photo: item.kind_photo,
                                  description: item.kind_details,
                                  small: item.kind_small,
                                  middle: item.kind_middle,
                                  large: item.kind_large,
                                  content: item.kind_content,
                                  categoris_id: item.categoris_kind_id,
                                  kind_id:item.kind_id,
                                })

                            }}
                          >
                         <Icon name="edit" style={{}} size={20}/>
                         </TouchableOpacity>
                      </View>
 
                       
                       <Text style={{fontSize:18,fontWeight:'bold'}}>{item.kind_name}</Text>
 
                       <Image source={item.kind_photo}
                         style={{ width: 80, height: 70, resizeMode: 'contain', borderRadius: 35 }}
                     />
 
                     
                    </View>
                     
                    )
                   
                }
                <View style={{width:50,height:80}}></View>
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
    style_map:{
       width:windowWidth*.95,
       height:windowHeight*.1,
       backgroundColor:'#fff',
       justifyContent:'space-between',
       alignItems:'center',
       flexDirection:'row',
       alignSelf:'center',
       shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 1,
       },
       shadowOpacity: 0.22,
       shadowRadius: 2.22,
       elevation: 3,
       marginTop:20
    },
    drwer_view:{
        width:windowWidth*.73,
        height:windowHeight*.1,
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'flex-end',
        flexDirection:'row',
        marginTop:23,
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