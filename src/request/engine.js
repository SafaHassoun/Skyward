import Axios from 'axios';
const KEY = 'b66770c309e04e0c92572314231706';
class RequestEngine {
  constructor(props) {
    this.request = Axios.create({
      baseURL: 'https://api.weatherapi.com/v1',
      timeout: 5000,
    });
  }

  async getCurrentWeather(latitude, longitude) {
    const link = `/current.json?key=${KEY}&q=${latitude},${longitude}&aqi=no`;
    return await this.request.get(link);
  }

  async getForeCast(latitude, longitude, days = 7) {
    const link = `/forecast.json?key=${KEY}&q=${latitude},${longitude}&days=${days}&aqi=no`;
    return await this.request.get(link);
  }
  async getWeatherDetails(latitude, longitude) {
    return await this.getForeCast(latitude, longitude, 1);
  }
}
export default RequestEngine;
