import Axios from 'axios';
const KEY = '1469bcf832b14b239c9114030232705';
class RequestEngine {
  constructor(props) {
    super(props);
    this.request = Axios.create({
      baseUrl: 'http://api.weatherapi.com/v1',
      timeout: 5000,
    });
  }

  async getCurrentWeather(latitude, longitude) {
    const link = `/current.json?key=${KEY}&q=${latitude},${longitude}&aqi=no`;
    return await this.request.get(link);
  }

  async getForeCast(latitude, longitude, days = 3) {
    const link = `/forecast.json?key=${KEY}&q=${latitude},${longitude}&days=${days}&aqi=no`;
    return await this.request.get(link);
  }
  async getWeatherDetails(latitude, longitude) {
    return await this.getForeCast(latitude, longitude, 1);
  }
}
export default RequestEngine;
