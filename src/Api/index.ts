export const getFlights = (params) => {
    return fetch(`http://192.168.1.61:5001/flights/?${params}`)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data;
        })
        .catch((error) => {
            console.error(error);
        });

}