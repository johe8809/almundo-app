export const getFlights = () => {
    return fetch('http://10.0.2.172:5001/flight')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch((error) => {
            console.error(error);
        });

}