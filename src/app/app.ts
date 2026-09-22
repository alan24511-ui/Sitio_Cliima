import { Component, OnInit, inject } from '@angular/core';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: ''
})
export class App implements OnInit {
  private weatherService = inject(WeatherService);

  ngOnInit(): void {
    console.log('===== PRUEBA WEATHER SERVICE =====');

    this.weatherService.getCities('Monterrey').subscribe({
      next: cities => {
        console.log('MÉTODO 1:', cities);
        if (!cities.length) return console.log('No se encontraron ciudades.');

        const city = cities[0];
        console.log('Ciudad:', city);

        this.weatherService.getCurrentWeather(city.latitude, city.longitude)
          .subscribe({ next: data => console.log('MÉTODO 2:', data), error: e => console.error('Error M2:', e) });

        this.weatherService.getAirQuality(city.latitude, city.longitude)
          .subscribe({ next: data => console.log('MÉTODO 3:', data), error: e => console.error('Error M3:', e) });

        this.weatherService.getElevation(city)
          .subscribe({ next: data => console.log('MÉTODO 4:', data), error: e => console.error('Error M4:', e) });

        this.weatherService.getMarineWeather(city)
          .subscribe({ next: data => console.log('MÉTODO 5:', data), error: e => console.error('Error M5:', e) });

        this.weatherService.getHistoricalWeather(city, '2026-09-15', '2026-09-20')
          .subscribe({ next: data => console.log('MÉTODO 6:', data), error: e => console.error('Error M6:', e) });
      },
      error: e => console.error('Error M1:', e)
    });
  }
}