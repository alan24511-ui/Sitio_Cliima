export interface CurrentWeather {
    time: string;
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    precipitation: number;
    weatherCode: number;
    windSpeed: number;
    windDirection: number;
    isDay: boolean;
}