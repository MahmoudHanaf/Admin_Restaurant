


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Platform, ToastAndroid,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
// import AppIntroSlider from 'react-native-app-intro-slider';

// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';

// import { backgroundColor, next, button, textInput } from './Tasks/Colors'



import MapView, {
    ProviderPropType,
    Marker,
    AnimatedRegion,
  } from 'react-native-maps';

  export default class Location extends React.Component{
    constructor(props){
      super(props);
      this.state={
        
       
       
          latitude: 	30.94226470,
          longitude: 30.81574230  ,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421, 
          initialRegion :{},
        
           //0.0421
       

      }
    }

     componentDidMount(){
      //  let cart =this.props.navigation.getParam("cart")
       let longitude =this.props.navigation.getParam("order_longitude")
       let latitude =this.props.navigation.getParam("order_latitude")
       let latitudeDelta =this.props.navigation.getParam("order_latitudeDelta")
       let longitudeDelta =this.props.navigation.getParam("order_longitudeDelta")
     

       this.setState({
       
        longitude:longitude,
        latitude:latitude,
        latitudeDelta:latitudeDelta,
         longitudeDelta:longitudeDelta,
      
      })

     
     
     }
    // componentDidMount() {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     var lat = parseFloat(position.coords.latitude)
    //     var long = parseFloat(position.coords.longitude)
  
    //     var initialRegion = {
    //       latitude: lat,
    //       longitude: long,
    //       latitudeDelta: LATITUDE_DELTA,
    //       longitudeDelta: LONGITUDE_DELTA,
    //     }
  
    //     this.setState({initialPosition: initialRegion})
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    // }
  






    // componentDidMount(){
    //   this.handleUserLocation()
    // }

    // handleUserLocation =() =>{
    //   navigator.geolocation.getCurrentPosition(() =>{
    //      alert("True")
    //   })
      
    // }


    /*
     this.map.animateToRegion({
          ...this.state.initialRegion,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
      })
      this.setState({
        ...this.state.initialRegion,
        latitude:pos.coords.longitude,
        longitude:pos.coords.longitude
      })
    */

     

    onChangeValue =initialRegion =>{
      ToastAndroid.show(JSON.stringify(initialRegion),ToastAndroid.SHORT)

      this.setState({
        initialRegion
      })
      alert(initialRegion)
    }

    render(){
      return(
        <>
         <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />

        <View style={styles.container}>
        <MapView style={styles.map} 
              
          initialRegion={{
            latitude: JSON.parse(this.state.latitude) , 
            longitude: JSON.parse(this.state.longitude),
            latitudeDelta: JSON.parse(this.state.latitudeDelta),
            longitudeDelta: JSON.parse(this.state.longitudeDelta),
          }}
         
        //  initialRegion={this.state.initialRegion}
        //  onRegionChangeComplete={this.onChangeValue}
      />

      <View style={{position:'absolute'}}>
        <Image source={require('../img/m1.png')}
          style={{width:45,height:40,resizeMode:'contain'}} 
        />
      </View>

    

    </View>
        </>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });