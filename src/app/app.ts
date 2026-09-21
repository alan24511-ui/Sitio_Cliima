import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './core/services/weather.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('weatherhub');

  private weatherService = inject(WeatherService);

  ngOnInit() {
    this.weatherService.getCities('Batman').subscribe(console.log);
    this.weatherService.getCurrentWeather(35.6762, 139.8833).subscribe(console.log);
  }
}