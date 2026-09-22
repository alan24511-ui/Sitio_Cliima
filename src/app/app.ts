import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App {
  private weatherService = inject(WeatherService);

  cityName = 'Monterrey';
  startDate = '2026-09-15';
  endDate = '2026-09-20';

  city: any;
  weather: any;
  air: any;
  elevation: any;
  marine: any;
  historical: any;
  loading = false;

  searchCity() {
    this.loading = true;

    this.weatherService.getCities(this.cityName).subscribe({
      next: cities => {
        if (!cities.length) {
          this.loading = false;
          this.city = null;
          return;
        }

        this.city = cities[0];

        this.weatherService
          .getCurrentWeather(this.city.latitude, this.city.longitude)
          .subscribe(data => this.weather = data);

        this.weatherService
          .getAirQuality(this.city.latitude, this.city.longitude)
          .subscribe(data => this.air = data);

        this.weatherService
          .getElevation(this.city)
          .subscribe(data => this.elevation = data);

        this.weatherService
          .getMarineWeather(this.city)
          .subscribe(data => this.marine = data);

        this.loadHistorical();

        this.loading = false;
      },

      error: error => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  loadHistorical() {
    if (!this.city) return;

    this.weatherService
      .getHistoricalWeather(
        this.city,
        this.startDate,
        this.endDate
      )
      .subscribe(data => {
        this.historical = data;
      });
  }

  getHistoricalDays() {
    if (!this.historical?.daily) return [];

    const daily = this.historical.daily;

    return daily.time.map((date: string, i: number) => ({
      date,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      precipitation: daily.precipitation_sum[i],
      wind: daily.wind_speed_10m_max[i]
    }));
  }

  /* ngOnInit() {
  this.weatherService.getHistoricalForecast(19.4326, -99.1332, '2024-01-01', '2024-01-03')
    .subscribe({
      next: (data) => console.log('Historical Forecast:', data),
      error: (err) => console.error('Error Historical Forecast:', err)
    }); 
  }*/
}

