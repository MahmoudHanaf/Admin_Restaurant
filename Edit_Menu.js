


import * as React from "react";
import {
    Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import * as ImagePicker from 'react-native-image-picker';

import axios from "axios";

import Details from '../Tasks/Details'
import All_Orders from '../Tasks/All_Orders'
import All_Details from "../Tasks/All_Details";

export default class Add_meal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Drawer_Visible: false,
            email: '',
            emailEroor: 'Please Enter Item Name',
            showView: false,
            text: '',
            textEroor:'',
            name: '',
            nameEroor: '',
            small:0,
            smallEroor: '',
            middle: 0,
            middleEroor: '',
            large:0,
            largeEroor: '',
            description: '',
            descriptionEroor: '',
            img: '',
            categoris_id:0,
            content:'',
            contentEroor:'',
            kind_id:0,
            photo_uri:'',
            Items: [
                {
                    text: 'Burger',
                    color: '',
                    show: true,
                },
                {
                    text: 'Chicken',
                    color: '',
                    show: true,
                },
                {
                    text: 'Meat',
                    color: '',
                    show: true,
                },
                {
                    text: 'Crepe',
                    color: '',
                    show: true,
                },
                {
                    text: 'Pizza',
                    color: '',
                    show: true,
                },
                {
                    text: 'Dessert',
                    color: '',
                    show: true,
                },
            ],


        }
    }


    componentDidMount() {
        let name = this.props.navigation.getParam("name")
        let photo_uri = this.props.navigation.getParam("photo")
        let description = this.props.navigation.getParam("description")
        let small = this.props.navigation.getParam("small")
        let middle = this.props.navigation.getParam("middle")
        let large = this.props.navigation.getParam("large")
        let content = this.props.navigation.getParam("content")
        let categoris_id = this.props.navigation.getParam("categoris_id")
        let kind_id = this.props.navigation.getParam("kind_id")

        this.setState({ 
            name: name,
            photo_uri:photo_uri,
            description: description,
            small: small,
            middle: middle,
            large: large,
            content: content,
            categoris_id: categoris_id,
            kind_id:kind_id
        })
    }

    get_Data(){
        axios.get("https://engineermahmoud.000webhostapp.com/Project/Restaurant_Select_Menu.php").then(res=>{
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



      select_first_photo() {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary({options, includeBase64: true}, res => {
          // console.log('Response = ', res);
    
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            if (this.state.photo_uri == this.state.defaultPhoto_uri) {
              this.state.options.push({
                text: 'مسح الصورة',
                destructive: true,
                onPress: () => {
                  this.setState({
                    photo_uri: this.state.defaultPhoto_uri,
                    V_uri: false,
                  });
                  
                  ToastAndroid.showWithGravity(
                    'تم مسح صورة البروفايل',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                  );
                  this.state.options.pop();
                },
              });
            }
                
            this.setState({
              photo_data: res.assets[0],
              photo_uri: res.assets[0].uri,
            });
    
          }
    
        });
    
      }




    MyData() {

        let Eroors = 0;


        //name
        if (this.state.name.trim() == '') {
            Eroors++
            this.setState({
                nameEroor:'Enter Meal name '
            })
        }else{
            this.setState({
                nameEroor:''
            })
        }

       //Kind categoris 
       if (this.state.text == '') {
           Eroors++
        this.setState({
            textEroor:'choose categoris of Meal '
        })
        }else{
            this.setState({
                textEroor:''
            })
        }

          //price samll
       if (this.state.small == 0) {
        Eroors++
        this.setState({
         smallEroor:'Enter small price'
        })
       }else{
        this.setState({
            smallEroor:''
           })
       }
       
           //price middle
           if (this.state.middle == 0) {
            Eroors++
            this.setState({
             middleEroor:'Enter middle price'
            })
           }else{
            this.setState({
                middleEroor:''
               })
           }


               //price large
       if (this.state.large == 0) {
        Eroors++
        this.setState({
         largeEroor:'Enter large price'
        })
       }
       else{
        this.setState({
            largeEroor:''
           })
       }

        
       if (this.state.description == '') {
        Eroors++
        this.setState({
            descriptionEroor:'please Enter Description of Meal'
        })
    }else{
        this.setState({
            descriptionEroor:''
        })
    }


// content
    if (this.state.content == '') {
        Eroors++
        this.setState({
            contentEroor:'please Enter content of Meal'
        })
    }else{
        this.setState({
            descriptionEroor:''
        })
    }

    //
        if (Eroors == 0) {
           
            let data_to_send={
                kind_name: this.state.name,
                kind_details: this.state.description,
                kind_small: this.state.small,
                kind_middle: this.state.middle,
                kind_large: this.state.large,
                kind_content: this.state.content,
                categoris_kind_id: this.state.categoris_id,
                kind_id:this.state.kind_id
              }
              axios.post("https://hodahanafy.000webhostapp.com/Restaurant/Resaturant_Admin_Update_Menu.php",data_to_send).then(res=>{
                 if(res.status ==200){
                    //  this.setState({
                    //   Items:res.data,
                    // //   loading :false,
                    //  })
                    alert(res.data)

                
                    this.props.navigation.goBack()
        
                 }else{
                   alert("Try again later")
                 }
              })
        }
    }





    render() {
        return (
            <>
                <StatusBar
                    backgroundColor="#fff"  //#FF6C00
                    barStyle="dark-content"
                />

                <View style={styles.header}>
                    <View style={{width:60,height:50}}></View>

                    <Text style={{ fontSize: 23, fontWeight: 'bold', }}>Edit Menu</Text>
                    
                    <TouchableOpacity
            onPress={()=>{
              this.props.navigation.goBack()
            }}
          >
           <Icon name ="arrow-left" size={24} style={{}} />
           </TouchableOpacity>
                </View>


                <ScrollView>

                    <View style={styles.img}>
                    {
                            this.state.photo_uri ==''?(
                                <Icon name="image" size={100} style={{ color: '#fff' }} />
                            ):(
                                <Image source={{uri:this.state.photo_uri}}
                                 style={{width:110,height:110,resizeMode:'cover'}}
                                  />
                            )
                        }
                    </View>
                    <TouchableOpacity
                      onPress={()=>{
                        this.select_first_photo()
                      }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold',
                         textDecorationLine: 'underline', textAlign: 'center',
                          marginTop: 5 }}>Uplode Image</Text>
                    </TouchableOpacity>


                    <View style={{ height: 80, justifyContent: 'space-between' }}>
                        <View style={styles.text_input}>

                            <TextInput
                                style={{ fontSize: 18 }}
                                placeholder="Enter Item Name"
                                value={this.state.name}
                                onChangeText={(value) => {
                                    this.setState({ name: value })
                                }}
                            />
                        </View>
                        <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center'}}>{this.state.nameEroor}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.state.showView == true ?
                                this.setState({ showView: false, })
                                :
                                this.setState({ showView: true })
                        }}
                    >
                        <View style={[styles.text_input, { justifyContent: 'space-between' }]}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{this.state.text == '' ? "Choose Categoris" : this.state.text}</Text>
                            <Icon name="sort-down" style={{ marginLeft: 5 }} size={21} />
                        </View>
                    </TouchableOpacity>

                    {
                        this.state.showView == true ?
                            <>
                                {
                                    this.state.Items.map((item, index) =>
                                        <View style={{
                                            backgroundColor: '#fff',
                                            width: windowWidth * .89,
                                            padding: windowWidth * .03,
                                            paddingLeft: windowWidth * .03,
                                            height: 45,
                                            alignSelf: 'center',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.22,
                                            shadowRadius: 2.22,
                                            elevation: 3,

                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ text: item.text, showView: false, showView2: true,categoris_id:index+1 })
                                                }}
                                            >
                                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#000', margin: 0 }}>{item.text}</Text>
                                            </TouchableOpacity>

                                        </View>

                                    )
                                }
                            </>
                            :
                            null
                    }
                      <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center'}}>{this.state.textEroor}</Text>

                    
                       
                        <Text style={{ fontSize: 22, fontWeight: '800%', marginRight: 20,marginTop:0 }}>Price : </Text>



                    <View style={{ width: windowWidth * .9, justifyContent: 'space-around', flexDirection: 'row', alignSelf: 'center' }}>


                        <View style={{ height: 80, justifyContent: 'space-between' }}>
                            <View style={[styles.text_input, { width: 100 }]}>

                                <TextInput placeholder="Large"
                                    style={{ fontSize: 18 }}
                                    keyboardType='number-pad'
                                    value={this.state.large}
                                    onChangeText={(value) => {
                                        this.setState({ large: value })
                                    }}
                                />
                            </View>
                            <Text style={{fontSize:12,fontWeight:'bold',textAlign:'center'}}>{this.state.largeEroor}</Text>
                        </View>



                        <View style={{ height: 80, justifyContent: 'space-between' }}>
                            <View style={[styles.text_input, { width: 100 }]}>

                                <TextInput placeholder="Middle"
                                    style={{ fontSize: 18 }}
                                    keyboardType='number-pad'
                                    value={this.state.middle}
                                    onChangeText={(value) => {
                                        this.setState({ middle: value })
                                    }}
                                />
                            </View>
                            <Text style={{fontSize:12,fontWeight:'bold',textAlign:'center'}}>{this.state.middleEroor}</Text>
                        </View>

                        <View style={{ height: 80, justifyContent: 'space-between' }}>
                            <View style={[styles.text_input, { width: 100 }]}>

                                <TextInput placeholder="Small"
                                    style={{ fontSize: 18 }}
                                    keyboardType='number-pad'
                                    value={this.state.small}
                                    onChangeText={(value) => {
                                        this.setState({ small: value })
                                    }}
                                />
                            </View>
                            <Text style={{fontSize:12,fontWeight:'bold',textAlign:'center'}}>{this.state.smallEroor}</Text>
                        </View>

                    </View>



                    <View style={{ height: 80, justifyContent: 'space-between', }}>
                        <View style={[styles.text_input, {}]}>

                            <TextInput placeholder="Write Description"
                                style={{ fontSize: 18 }}

                                value={this.state.description}
                                onChangeText={(value) => {
                                    this.setState({ description: value })
                                }}
                            />
                        </View>
                        <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center'}}>{this.state.descriptionEroor}</Text>
                    </View>

                    <View style={{ height: 80, justifyContent: 'space-between', }}>
                        <View style={[styles.text_input, {}]}>

                            <TextInput placeholder="Write Content of Item"
                                style={{ fontSize: 17 }}

                                value={this.state.content}
                                onChangeText={(value) => {
                                    this.setState({ content: value })
                                }}
                            />
                        </View>
                        <Text style={{fontSize:14,fontWeight:'bold',textAlign:'center'}}>{this.state.descriptionEroor}</Text>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                            this.MyData()
                            
                        }}
                    >
                        <View style={{
                            width: windowWidth * .5,
                            height: 50,
                            backgroundColor: '#FF5100',
                            borderRadius: 10,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            marginBottom: 20
                        }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>Save</Text>
                        </View>
                    </TouchableOpacity>



                </ScrollView>


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
    img: {
        width: windowWidth * .9,
        height: windowHeight * .24,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 5,
    },
    text_input: {
        width: windowWidth * .9,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF5100',
        paddingLeft: 10,
        paddingRight: 8,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'center',
        // marginBottom:20,
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3,
        marginTop: 15
    }

})
