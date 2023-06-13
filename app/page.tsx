'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { WeatherResponse } from '@/interfaces';

export default function Home() {
	const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);
	const coordinates = { lat: '25.686613', lon: '-100.316116' };

	const getWeather = async (hours = 0) => {
		const apiParams = `?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&lang=es&appid=${process.env.API_KEY}`;
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather` + apiParams
		);
		const data: WeatherResponse = await res.json();
		setWeatherInfo(data);
	};

	useEffect(() => {
		getWeather();
	}, []);

	if (!weatherInfo)
		return (
			<main className={styles.loading}>
				<h2>Cargando...</h2>
			</main>
		);

	return (
		<main className={styles.main}>
			<img
				src="/climatic - primary.svg"
				alt="logo"
				className={styles.logo}
				width={74}
				height={15}
			/>
			<div className={styles.card}>
				<p className={styles.weather}>{weatherInfo.weather[0].description}</p>
				<p className={styles.temperature}>
					{parseInt(weatherInfo.main.temp.toString())}
					<span>°</span>
				</p>

				<hr className={styles.bar} />
				<div className={styles.minmax}>
					<p>
						min. <span>{parseInt(weatherInfo.main.temp_min.toString())}</span>
					</p>
					<p>
						Max. <span>{parseInt(weatherInfo.main.temp_max.toString())}</span>
					</p>
				</div>
				<hr className={styles.bar} />
			</div>

			<div className={styles.weather__info}>
				<p className={styles.weather__city}>Pronóstico de {weatherInfo.name}</p>
				<p className={styles.wheather__next}>Próximas 9 horas</p>
			</div>

			<section className={styles.history}>
				<div className={styles.badge}>
					<p>
						min. <span>34</span>
					</p>
					<p>Nubes dispersas</p>
					<p>
						Max. <span>39</span>
					</p>
				</div>
				<div className={styles.minmax}>
					<p>
						<span>28</span>
					</p>
					<p>Algo de nubes</p>
					<p>
						<span>29</span>
					</p>
				</div>
				<div className={styles.minmax}>
					<p>
						<span>19</span>
					</p>
					<p>Cielo claro</p>
					<p>
						<span>22</span>
					</p>
				</div>
			</section>
		</main>
	);
}
