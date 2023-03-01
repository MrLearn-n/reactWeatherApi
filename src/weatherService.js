const API_KEY = 'f2dbd5b9c86e3ab510a313e8c308d149';

const makeIconURL =  (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormWetaherData = async (city, uints = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${uints}`

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);
    
    const {
        weather,
        main: {
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity,
        },
        wind: {speed},
        sys: {country},
        name, 
    } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconUrl: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export {getFormWetaherData};