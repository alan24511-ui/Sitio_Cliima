import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  // Future Open-Meteo API methods will be added here without changing the base architecture.
  // Example methods:
  // getCities(...)
  // getCurrentWeather(...)
  // getAirQuality(...)
  // getElevation(...)
  // getMarineWeather(...)
  // getHistoricalWeather(...)
  // getHistoricalForecast(...)
  // getECMWF(...)
  // getPreviousRuns(...)
  // getSingleRun(...)
}
