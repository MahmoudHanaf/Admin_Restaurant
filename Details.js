







import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
  Linking,ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { ceil } from "react-native-reanimated";

import axios  from "axios";

 export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        Data:{},
        Items:[],
        order_id:0,
        loading:true,
    }
  } 

  componentDidMount(){
      let Data =this.props.navigation.getParam("Data")
      let order_id =this.props.navigation.getParam("order_id")
      this.setState({
          Data:Data,
          order_id:order_id,
      })

    
      
      let data_to_send={
        order_id:order_id
      }
      axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Restaurant_Admin_Select_New_Orders_Cart.php",data_to_send).then(res=>{
         if(res.status ==200){
             this.setState({
              Items:res.data,
              loading :false,
             })
            // alert(res.data)

         }else{
           alert("Try again later")
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
          <View style={{width:40,height:50,}}>
          </View>

          <Text style={{ fontSize: 23, fontWeight: 'bold', }}>Details</Text>
          <TouchableOpacity
            onPress={()=>{
              this.props.navigation.goBack()
            }}
          >
           <Icon name ="arrow-left" size={24} style={{}} />
           </TouchableOpacity>
        </View>


     <ScrollView>

       <View style={{width:windowWidth,justifyContent:'center',alignItems:'center'}} > 
        <Icon name ='user-circle' size={68} style={{}}/>
        </View>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:10}}>{this.state.Data.user_name}</Text>
         
         <View style={[styles.sub_view,{height:50,alignSelf:'center'}]}>

         <Text style={{fontSize:16,fontWeight:'bold'}}>Order ID :{this.state.Data.order_id}</Text>
            <Text style={{fontSize:16,fontWeight:'bold'}}>{this.state.Data.order_date}</Text>
         </View>


         <View  style={[styles.sub_view,{height:55,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor:'#fff',
            borderRadius:10,
            paddingLeft:8
        }]} >
          
          <TouchableOpacity
            onPress={()=>{
              Linking.openURL("tel:" + this.state.Data.user_phone)
            }}
          >
              <View style={{
                 width:80,
                 height:40,
                 backgroundColor:'#FF5D00',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:10
                 }}>
                    <Text style={{fontSize:18,fontWeight:'500',color:'#fff'}}>Call</Text>
               </View>
               </TouchableOpacity>

               <View style={[styles.sub_view,{width:windowWidth*.47,paddingRight:5}]}>
               <Text style={{fontSize:18,fontWeight:'bold'}}>{this.state.Data.user_phone}</Text>
              <Icon name ="phone-alt"  size={25} style={{}}/>

               </View>
         </View>


           
         <View  style={[styles.sub_view,{height:55,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor:'#fff',
            borderRadius:10,
            marginTop:15,
            paddingLeft:8
        }]} >
          
          <TouchableOpacity
            onPress={()=>{
              Linking.openURL("https://mail.google.com/mail/u/0/#sent?compose=jrjtWvMZdhVvkdnZGNPJFRCpwPQPHBLnbhQTKJCNBqVcjzWsmMMcRDnxfnzntghBkdTPGHJC' +this.state.Data.order_email"+this.state.Data.user_email)
             
             
              // Linking.openURL('https://mail.google.com/mail/u/0/#sent?compose=jrjtWvMZdhVvkdnZGNPJFRCpwPQPHBLnbhQTKJCNBqVcjzWsmMMcRDnxfnzntghBkdTPGHJC' +this.state.Data.order_email)
            }}
          >
              <View style={{
                 width:80,
                 height:40,
                 backgroundColor:'#FF5D00',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:10
                 }}>
                    <Text style={{fontSize:18,fontWeight:'500',color:'#fff'}}>Email</Text>
               </View>
               </TouchableOpacity>

               
               <Text style={{fontSize:16,fontWeight:'500'}}>{this.state.Data.user_email}</Text>
              <Icon name ="envelope"  size={25} style={{marginRight:5}}/>
         </View>




         <View  style={[styles.sub_view,{height:55,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor:'#fff',
            borderRadius:10,
            marginTop:15,
            paddingLeft:8
        }]} >
          
          <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate("Location",{
                order_longitude:this.state.Data.order_longitude,
                order_latitude:this.state.Data.order_latitude,
                order_latitudeDelta:this.state.Data.order_latitudeDelta,
                order_longitudeDelta:this.state.Data.order_longitudeDelta
              })
            }}
          >  
              <View style={{
                 width:80,
                 height:40,
                 backgroundColor:'#FF5D00',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:10
                 }}>
                    <Text style={{fontSize:18,fontWeight:'500',color:'#fff'}}>Navigate</Text>
               </View>
               </TouchableOpacity>

               
               <Text style={{fontSize:16,fontWeight:'500'}}>{this.state.Data.order_address}</Text>
              <Icon name ="map-marker-alt"  size={25} style={{marginRight:5}}/>
         </View>
           
         <Text style={{fontSize:18,fontWeight:'800',marginRight:10,marginTop:10}}>Message :</Text>
         <Text style={{fontSize:16,fontWeight:'500',marginRight:10}}>{this.state.Data.order_note}</Text>
         

         <View  style={[styles.sub_view,{height:45,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor:'#fff',
            borderRadius:10,
            marginTop:10,
            paddingLeft:10,
            paddingRight:10,
            marginBottom:10,
        }]} >


             <Text style={{fontSize:18,fontWeight:'bold',color:'#FF5D00'}}>Price</Text>
             <Text style={{fontSize:18,fontWeight:'bold',marginRight:55,color:'#FF5D00'}}>Quantity</Text>
             <Text style={{fontSize:18,fontWeight:'bold',color:'#FF5D00'}}>Item</Text>
          </View>


          {
                 this.state.Items.map((item,index)=>

                 <View style={[styles.sub_view,{paddingLeft:10,paddingRight:10}]}>

                  <View style={{width:windowWidth*.18,alignItems:'flex-start',paddingLeft:5}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.cart_price}</Text>
                 </View>
                 <View style={{width:windowWidth*.18,alignSelf:'center'}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.cart_count}</Text>
                 </View>

                 <View style={{width:windowWidth*.46,}}>
                 <Text style={{fontSize:17,fontWeight:'bold'}}>{item.kind_name}</Text>
                 </View>
               
              </View>

                 )
               }

        <View style={[styles.sub_view,{}]}>

       <View style={{ width:windowWidth*.5,backgroundColor:'#fff',height:windowHeight*.16,
           shadowColor: "#000",
           shadowOffset: {
             width: 0,
             height: 1,
           },
           shadowOpacity: 0.22,
           shadowRadius: 2.22,
           elevation: 3,
           borderRadius: 10,
           marginLeft:10,
           marginTop:5
       }}>
       <View  style={[styles.sub_view,{ width:windowWidth*.5,alignSelf:'flex-start',
            marginTop:10,
            paddingLeft:15,
            paddingRight:10,
            marginBottom:10,
        }]} >
                <Text style={{fontSize:17,fontWeight:'bold'}}>5 %</Text>
                <Text style={{fontSize:17,fontWeight:'bold'}}>Discount :</Text>
          </View>

          <View  style={[styles.sub_view,{ width:windowWidth*.5,alignSelf:'flex-start',
            paddingLeft:15,
            paddingRight:10,
            marginBottom:10,
        }]} >
                <Text style={{fontSize:17,fontWeight:'bold'}}>40 LE</Text>
                <Text style={{fontSize:17,fontWeight:'bold'}}>Delivery :</Text>
          </View>


          <View  style={[styles.sub_view,{ width:windowWidth*.5,alignSelf:'flex-start',
            paddingLeft:15,
            paddingRight:10,
            marginBottom:10,
          
        }]} >
                <Text style={{fontSize:17,fontWeight:'bold'}}>{this.state.Data.order_total}</Text>
                <Text style={{fontSize:17,fontWeight:'bold'}}>Total :</Text>
          </View>
          </View>


       <View style={[styles.sub_view,{flexDirection:'column',width:windowWidth*.4,
       height:windowHeight*.18,justifyContent:'space-around',alignItems:'flex-end'}]}>
          <TouchableOpacity>
          <View style={{
                 width:110,
                 height:45,
                 backgroundColor:'#FF5D00',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:10
                 }}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Accept Order</Text>
               </View>
               </TouchableOpacity>


               <TouchableOpacity>
          <View style={{
                 width:110,
                 height:45,
                 backgroundColor:'#FF5D00',
                 justifyContent:'center',
                 alignItems:'center',
                 borderRadius:10,
                 }}>
                    <Text style={{fontSize:16,fontWeight:'bold',color:'#fff'}}>Cancle Order</Text>
               </View>
               </TouchableOpacity>
               </View>
          </View>
     
         </ScrollView>
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
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  style_map:{
    width: windowWidth * .94,
    height: windowHeight * .35, //
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
    paddingTop:10,
    paddingBottom:10,
  },
  sub_view:{
    width:'95%',
    // height:windowHeight*.2,
    // backgroundColor:'#0ff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf:'center'
  }
})