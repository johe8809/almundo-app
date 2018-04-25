export const getFlights = (params) => {
    return fetch(`http://10.0.2.172:5001/flights/?${params}`)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch((error) => {
            console.error(error);
        });

}