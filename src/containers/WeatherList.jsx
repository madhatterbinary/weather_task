import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class WeatherList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchWeather('Havana');
  }

  renderWeather(data) {
    function toCelsius(f) {return Math.round((f-32) * (5/9))}
    let name = data.city.name;
    const original_dates = data.list.map(weather => weather.dt_txt.slice(0, 11));
    const dates = [];
    const temps = [];
    const pressures = [];
    const humidities = [];
    const original_temps = data.list.map(weather => weather.main.temp);
    const original_pressures = data.list.map(weather => weather.main.pressure);
    const original_humidities = data.list.map(weather => weather.main.humidity);

    for (var i = 0; i < original_dates.length; i=i+8) {
     console.log("temps "+original_temps[i]);
      dates.push(moment(original_dates[i]).format('D MMM YYYY'));
      temps.push(Math.round(original_temps[i]));
      pressures.push(Math.round(original_pressures[i]));
      humidities.push(original_humidities[i]);
    }
    var num = dates.map(function(date,i){

        if (i>0)name = '';
        return(
          <tr key={date}>
            <td>{name}</td><td>{date}</td><td>{temps[i]+'°C'}</td><td>{pressures[i]+'hpa'}</td><td>{humidities[i]+'%'}</td>
          </tr>
        );
     });
     return (<tbody key={temps}>{num}</tbody>);
  }
  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Date</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
          {this.props.weather.map(this.renderWeather)}
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);
