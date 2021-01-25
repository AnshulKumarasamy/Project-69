import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Permission from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async ()=>{
        const {status} = await Permission.askAsync(Permissions.CAMERA);
        this.setState({
            //status === "granted" is true when user has granted permission
            //status === "granted" is false when user has not granted permission
            hasCameraPermissions: status === "granted"
        });
    }

    handleBarCodeScanned = async({type, data})=>{
        this.setState({
            scanned:true,
            scannedData: data,
            buttonState:'normal'
        });
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner
                    onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        } else if(buttonState === "normal"){
            return(
                <View style={styles.container}>
                    <Image
                        style={styles.imageIcon}
                        source={{
                        uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
                        }}
                    />
                    <Text style={styles.displayText}>
                        hasCameraPermissions === true ? this.state.scannedData : "Require camera permission"
                    </Text>
                    <TouchableOpacity style={styles.scanButton}
                        onPress={this.getCameraPermissions}
                        style={styles.scanButton}
                        title = "Bar Code Scanner">
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    displayText:{
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton:{
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
      },
    buttonText:{
        fontSize: 20,
    },
    imageIcon: {
        width: 150,
        height: 150,
        marginLeft: 95,
    },
});