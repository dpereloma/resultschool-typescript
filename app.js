var body = document.body;
var volumeInput = body.querySelector('.volume');
var Weather = /** @class */ (function () {
    function Weather(name, icon, img, sound) {
        this._isActive = false;
        this._name = name;
        this._icon = icon;
        this.img = img;
        this.sound = sound;
    }
    Weather.prototype.onChangeBackground = function () {
        body.style.backgroundImage = "url(".concat(this.img, ")");
    };
    Weather.prototype.onChangeSound = function () {
        var audio = body.querySelector('audio');
        audio.src = this.sound;
    };
    Weather.prototype.enableSound = function () {
        var audio = body.querySelector('audio');
        audio.muted = false;
        audio.play();
    };
    Weather.prototype.disableSound = function () {
        var audio = body.querySelector('audio');
        audio.muted = true;
        audio.pause();
    };
    Object.defineProperty(Weather.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (isActive) {
            this._isActive = isActive;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Weather.prototype, "icon", {
        get: function () {
            return this._icon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Weather.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    return Weather;
}());
var weatherItems = [
    new Weather('sun', 'assets/icons/sun.svg', 'assets/summer-bg.jpg', 'assets/sounds/summer.mp3'),
    new Weather('rain', 'assets/icons/cloud-rain.svg', 'assets/rainy-bg.jpg', 'assets/sounds/rain.mp3'),
    new Weather('snow', 'assets/icons/cloud-snow.svg', 'assets/winter-bg.jpg', 'assets/sounds/winter.mp3'),
];
var initPage = function (weather) {
    body.style.backgroundImage = "url(".concat(weather.img, ")");
    volumeInput.addEventListener('input', function () {
        var audio = body.querySelector('audio');
        audio.volume = Number(volumeInput.value) / 100;
    });
    var audio = new Audio();
    audio.src = weather.sound;
    audio.volume = Number(volumeInput.value) / 100;
    body.appendChild(audio);
};
initPage(weatherItems[0]);
var activeWeather;
var weatherList = document.querySelector('.weather-list');
weatherItems.forEach(function (weather) {
    var weatherItem = document.createElement('div');
    weatherItem.classList.add('weather-list_item', "weather-list_item__".concat(weather.name));
    weatherItem.id = weather.name;
    var icon = document.createElement('img');
    icon.classList.add('weather-list_item_icon');
    icon.src = weather.icon;
    weatherItem.appendChild(icon);
    weatherItem.addEventListener('click', function () {
        if (activeWeather && activeWeather !== weather) {
            activeWeather.disableSound();
            var activeWeatherNode = body.querySelector("#".concat(activeWeather.name));
            var activeWeatherIcon = activeWeatherNode.querySelector('img');
            activeWeatherIcon.src = activeWeather.icon;
            activeWeather.isActive = false;
        }
        weather.onChangeBackground();
        weather.onChangeSound();
        var isActive = weather.isActive;
        activeWeather = weather;
        if (isActive) {
            icon.src = weather.icon;
            weather.disableSound();
        }
        else {
            icon.src = 'assets/icons/pause.svg';
            weather.enableSound();
        }
        weather.isActive = !isActive;
    });
    weatherList.appendChild(weatherItem);
});
