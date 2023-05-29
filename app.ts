const body = document.body;
const volumeInput = body.querySelector('.volume') as HTMLInputElement;
const weatherList = document.querySelector('.weather-list');
let activeWeather: Weather | undefined;

class Weather {
    img: string;
    sound: string;
    private _name: string;
    private _icon: string;
    private _isActive: boolean = false;

    constructor(name: string, icon: string, img: string, sound: string) {
        this._name = name;
        this._icon = icon;
        this.img = img;
        this.sound = sound;
    }

    onChangeBackground(): void {
        body.style.backgroundImage = `url(${this.img})`;
    }

    onChangeSound(): void {
        const audio = body.querySelector('audio')
        audio.src = this.sound;
    }

    enableSound(): void {
        const audio = body.querySelector('audio')
        audio.muted = false;
        audio.play();
    }

    disableSound(): void {
        const audio = body.querySelector('audio')
        audio.muted = true;
        audio.pause();
    }

    get isActive(): boolean {
        return this._isActive;
    }

    set isActive(isActive: boolean) {
        this._isActive = isActive;
    }

    get icon(): string {
        return this._icon;
    }

    get name(): string {
        return this._name;
    }
}

const weatherItems: Weather[] = [
    new Weather(
        'sun',
        'assets/icons/sun.svg',
        'assets/summer-bg.jpg',
        'assets/sounds/summer.mp3'
    ),
    new Weather(
        'rain',
        'assets/icons/cloud-rain.svg',
        'assets/rainy-bg.jpg',
        'assets/sounds/rain.mp3'
    ),
    new Weather(
        'snow',
        'assets/icons/cloud-snow.svg',
        'assets/winter-bg.jpg',
        'assets/sounds/winter.mp3'
    ),
];


const initPage = (weather: Weather): void => {
    body.style.backgroundImage = `url(${weather.img})`;
    volumeInput.addEventListener('input', () => {
        const audio = body.querySelector('audio');
        audio.volume = Number(volumeInput.value) / 100;
    })
    const audio = new Audio();
    audio.src = weather.sound;
    audio.volume = Number(volumeInput.value) / 100;
    body.appendChild(audio);
}

initPage(weatherItems[0]);

const onClickWeather = (weather: Weather, icon: HTMLImageElement): void => {
    if(activeWeather && activeWeather !== weather) {
        activeWeather.disableSound();
        const activeWeatherNode = body.querySelector(`#${activeWeather.name}`);
        const activeWeatherIcon = activeWeatherNode.querySelector('img')
        activeWeatherIcon.src = activeWeather.icon;
        activeWeather.isActive = false;
    }
    weather.onChangeBackground();
    weather.onChangeSound();
    const isActive = weather.isActive;
    activeWeather = weather;
    if (isActive) {
        icon.src = weather.icon;
        weather.disableSound();
    } else {
        icon.src = 'assets/icons/pause.svg';
        weather.enableSound();
    }

    weather.isActive = !isActive;
}

weatherItems.forEach((weather) => {
    const weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-list_item', `weather-list_item__${weather.name}`);
    weatherItem.id = weather.name;
    const icon = document.createElement('img');
    icon.classList.add('weather-list_item_icon');
    icon.src = weather.icon;
    weatherItem.appendChild(icon);

    weatherItem.addEventListener('click', () => {
        onClickWeather(weather, icon);
    })

    weatherList.appendChild(weatherItem);
});
