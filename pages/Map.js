import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';


class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tempDataGlobal: [],
			tempDataCountries: [],
		}
	}

 	fetchData1() {
 		fetch('https://api.covid19api.com/summary', {method: 'GET'})
		.then((response) => response.json())
		.then(result => {
        this.setState({
          
			tempDataGlobal: result["Global"],
          
        });
		console.log(this.state.tempDataGlobal)
		.catch(error => {console.log(error);});
        })
	}
 	
	fetchData2() {
	  	fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
				"x-rapidapi-key": "provide your key"
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
 			this.fetchData1();
 			this.fetchData2();
	        
	}

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.container1 }>
					<MapView style={ styles.map } region={{latitude: 42.3601, longitude: -71.0589, latitudeDelta: 100,longitudeDelta: 100}}>
						
						{this.state.tempDataCountries.map((marker, index) => {
							if (marker.latitude != null) {
								return (
									<Marker key={index} coordinate={{latitude: marker.latitude, longitude: marker.longitude}}>
										<Callout>
											<View>
												<Text>{marker.country}</Text>
												<Text>Confirmed: {marker.confirmed}</Text>
												<Text>Recovered: {marker.recovered}</Text>
												<Text>Deaths: {marker.deaths}</Text>
												<Text>Critical: {marker.critical}</Text>
											</View>
										</Callout>
										
									</Marker>
								
								)
							}
								
						}

					)}
					</MapView>
				</View>

				<View style={ styles.container2 }>
					<Text style={{fontSize: 40, fontWeight: 'bold'}}>Global Situation</Text>
					<Text style={{fontSize: 30, fontWeight: 'bold'}}>Current Data</Text>
					<Text style={{fontSize: 20}}>New Confirmed cases: {this.state.tempDataGlobal.NewConfirmed}</Text>
					<Text style={{fontSize: 20}}>Total confirmed cases: {this.state.tempDataGlobal.TotalConfirmed}</Text>
					<Text style={{fontSize: 20}}>New deaths: {this.state.tempDataGlobal.NewDeaths}</Text>
					<Text style={{fontSize: 20}}>NeTotal deaths: {this.state.tempDataGlobal.TotalDeaths}</Text>
					<Text style={{fontSize: 20}}>New recovered cases: {this.state.tempDataGlobal.NewRecovered}</Text>
					<Text style={{fontSize: 20}}>Total recovered cases: {this.state.tempDataGlobal.TotalConfirmed}</Text>
				</View>
			</View>
		)
	}
	
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	container1: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: 'center',
	},
	container2: {
		position: 'absolute',
		top: 600,
		left: 0,
		bottom: 0,
		right: 0,
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 300,

	},
    
});
