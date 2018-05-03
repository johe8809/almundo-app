import React from 'react';

interface PropsOneWay {
    origin: { City },
    destination: { City }
    dateDeparture: string;
    focusOrigin: boolean;
    fieldSearch: string;
    cities: any[];
    onFocus: () => void;
    searchFlights: () => void;
    searchCity: () => void;
    renderCities: () => void;
    cancelSearch: () => void;
    initialState: () => void;
    setDateDeparture: () => void;
}

interface StateOneWay {
    origin: { City };
    destination: { City };
    dateDeparture: string;
    focusOrigin: boolean;
    fieldSearch: string;
    cities: any[];
}

interface City {
    iata: string;
    name: string;
}