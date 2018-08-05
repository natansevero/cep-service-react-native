import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import axios from 'axios'

const URL = 'https://viacep.com.br/ws/$1/json/';

export default class App extends Component {
  state = {
    cep: '',
    data: {}
  }

  handleChange(text) {
    console.log(text)
    this.setState({ ...this.state, cep: text })
  }

  handleSubmit(e) {
    e.preventDefault();

    let newUrl = URL.replace('$1', this.state.cep)

    axios.get(newUrl)
      .then(res => this.setState({ ...this.state, data: res.data }))
  }

  render() {
    return (
      <View style={styles.container}>    
        <TextInput style={styles.input} 
          onChangeText={text => this.handleChange(text)} 
          value={this.state.cep} maxLength={8} />
        <Button title='Pesquisar' onPress={this.handleSubmit.bind(this)} />

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Logradouro</Text>
          <Text style={styles.resultContent}>
            {this.state.data.logradouro}
          </Text>

          <Text style={styles.resultLabel}>Complemento</Text>
          <Text style={styles.resultContent}>
            {this.state.data.complemento}
          </Text>

          <Text style={styles.resultLabel}>Bairro</Text>
          <Text style={styles.resultContent}>
            {this.state.data.bairro}
          </Text>

          <Text style={styles.resultLabel}>Localidade</Text>
          <Text style={styles.resultContent}>
            {this.state.data.localidade}
          </Text>

          <Text style={styles.resultLabel}>UF</Text>
          <Text style={styles.resultContent}>
            {this.state.data.uf}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  input: {
    borderWidth: 2,
    borderColor: '#CCC'
  },
  resultContainer: {
    padding: 8
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  resultContent: {
    fontSize: 16,
    marginBottom: 8
  }
})
