import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';


class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDataCountries: [],
    }
  }

  fetchData() {
      fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "Provide your key"
      }
    })
    .then((response) => response.json())
    .then(result => {
      this.setState({
        tempDataCountries: result,
      });
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    
    });
        
  }
  componentDidMount() {
      this.fetchData();
          
  }

  render() {
    return (
      <View style={styles.container}>
            <FlatList
              data={this.state.tempDataCountries}
              renderItem={({ item }) => 
                <View>
                  <Text style={styles.title}>{item.country}</Text>
                  <Text>Confirmed: {item.confirmed}</Text>
                  <Text>Deaths: {item.deaths}</Text>
                  <Text>Recovered: {item.recovered}</Text>
                  <Text>Critical: {item.critical}</Text>
                </View>
              } />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 10,
    top: 30,
    bottom: 60,
  },
  title: {
    fontSize: 32,

  }
});
