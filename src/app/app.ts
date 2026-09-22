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

    // MÉTODO 1: Buscar ciudades
    console.log('--- MÉTODO 1: getCities ---');

    this.weatherService.getCities('Monterrey').subscribe({
      next: (cities) => {

        console.log('Ciudades encontradas:', cities);

        if (cities.length > 0) {

          const city = cities[0];

          console.log('Ciudad seleccionada:', city);

          // MÉTODO 2: Tiempo actual
          console.log('--- MÉTODO 2: getCurrentWeather ---');

          this.weatherService
            .getCurrentWeather(city.latitude, city.longitude)
            .subscribe({
              next: (weather) => {
                console.log('Tiempo actual:', weather);
              },
              error: (error) => {
                console.error('Error en getCurrentWeather:', error);
              }
            });

          // MÉTODO 3: Calidad del aire
          console.log('--- MÉTODO 3: getAirQuality ---');

          this.weatherService
            .getAirQuality(city.latitude, city.longitude)
            .subscribe({
              next: (air) => {
                console.log('Calidad del aire:', air);
              },
              error: (error) => {
                console.error('Error en getAirQuality:', error);
              }
            });

          // MÉTODO 4: Elevación
          console.log('--- MÉTODO 4: getElevation ---');

          this.weatherService
            .getElevation(city)
            .subscribe({
              next: (elevation) => {
                console.log('Elevación:', elevation);
              },
              error: (error) => {
                console.error('Error en getElevation:', error);
              }
            });

          // MÉTODO 5: Información marina
          console.log('--- MÉTODO 5: getMarineWeather ---');

          this.weatherService
            .getMarineWeather(city)
            .subscribe({
              next: (marine) => {
                console.log('Información marina:', marine);
              },
              error: (error) => {
                console.error('Error en getMarineWeather:', error);
              }
            });

        } else {
          console.log('No se encontraron ciudades.');
        }
      },

      error: (error) => {
        console.error('Error en getCities:', error);
      }
    });
  }
}