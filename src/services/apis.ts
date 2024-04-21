import {offersEndpoint} from "@/services/app_urls";

const getOffers = async (): Promise<any> => {
    try {
        const response = await fetch(offersEndpoint, {
            method: 'GET',
        });

        const responseData = await response.json();
        console.log(responseData); // You can handle the response data as needed
        return responseData;
    } catch (error) {
        console.error('Error getting history:', error);
        throw error; // Re-throw the error to propagate it
    }
};

export default getOffers;