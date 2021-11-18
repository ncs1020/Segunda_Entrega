import * as React from "react";
import axios from 'axios';
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

export default class VerificaTelefono extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      url:"http://apilayer.net/api/validate",
      access_key: '8d3f9e9af92d2fbce737c87a6d1b1c75',
      number: '',
      country_code:"",
      format: 1,
      resultado:200,
      valido:true,
      caracteristica:'',
      numero_telefono:'',
      bandera_pais:'',
      nombre_pais:'',
      tipo_operadora:''
    }
  }

  phoneNumber = (number) => {this.setState({number : number});};
  componentDidMount(){if(this.state.number!=''){this.validar;}}

  validar = () => { 
    
    let url = this.state.url+'?access_key='+this.state.access_key+'&number='+this.state.number+'&country_code='+this.state.country_code+'&format='+this.state.format;
    axios.get(url)
    .then(res => {
      this.setState({resultado:res.status});
      this.setState({valido:res.data.valid});
      this.setState({caracteristica:res.data.country_prefix});
      this.setState({numero_telefono:res.data.local_format});
      this.setState({ bandera_pais:res.data.country_code});
      this.setState({nombre_pais:res.data.country_name});
      this.setState({tipo_operadora:res.data.line_type});
     })
    .catch ((error) => console.error(error));
  };

 render(){
  let variable=null;
  let caracteristicas=null;
  let numero_telefono=null;
  let nombre_pais=null;
  let bandera_pais=null;
  let tipo_operadora=null;
  if(this.state.resultado==200 && this.state.valido){
    caracteristicas=<Text style={styles.baseText}> Caracteristica: {this.state.caracteristica}</Text>
    numero_telefono=<Text style={styles.baseText}> Numero de telefono: {this.state.numero_telefono}</Text>
    nombre_pais=<Text style={styles.baseText}> Nombre del pais: {this.state.nombre_pais}</Text>
    bandera_pais=<Text style={styles.baseText}> Bandera del pais: {this.state.bandera_pais}</Text>
    tipo_operadora=<Text style={styles.baseText}> Tipo de operadora: {this.state.tipo_operadora}</Text>
  }else{variable=<Text style={styles.baseText}> Ocurrió un error. Verifique el numero ingresado.</Text>}
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={this.phoneNumber.bind(this)}
        />
        <Button
          onPress={this.validar}
          title="Validar"
          color="#841584"
        />
        {variable}
        {caracteristicas}
        {numero_telefono}
        {nombre_pais}
        {bandera_pais}
        {tipo_operadora}
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    marginTop: 50,
    borderWidth: 1,
    padding: 10,
  },
  baseText: {
    height: 40,
    margin: 12,
    padding: 10,
    color: 'black',
    fontWeight: 'bold',
    borderWidth: 2,
  },
 
});
