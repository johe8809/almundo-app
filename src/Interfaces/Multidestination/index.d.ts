import React from 'react';

interface PropsMultidestination {
    origin: { City },
    destination: { City }
    dateDeparture: string;
    focusOrigin: boolean;
    fieldSearch: string;
    cities: any[];
    openForm: boolean;
    flightsAdded: any[];
    disabledButton: boolean;
    onFocus: () => void;
    searchFlights: () => void;
    searchCity: () => void;
    renderCities: () => void;
    cancelSearch: () => void;
    initialState: () => void;
    setDateDeparture: () => void;
}

interface StateMultidestination {
    origin: { City };
    destination: { City };
    dateDeparture: string;
    focusOrigin: boolean;
    fieldSearch: string;
    cities: any[];
    openForm: boolean;
    flightsAdded: any[];
    disabledButton: boolean;
}

interface City {
    iata: string;
    name: string;
}