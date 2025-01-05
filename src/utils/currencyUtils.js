// utils/currencyUtils.js
import { getCountryInfo } from 'sm-country-info';

/**
 * Fetch currency symbols for a list of countries
 * @param {Array} countries - List of country names.
 * @returns {Promise<Object>} - Object with country codes as keys and their currency symbols as values.
 */
export const fetchCurrencySymbols = async (countries) => {
    try {
        const countryData = await Promise.all(
            countries.map(async (country) => {
                const response = await getCountryInfo(country);
                return response[0];
            })
        );
        
        const currencySymbols = countryData.reduce((currencies, country) => {
            const currencyCodes = Object.keys(country.currencies);
            currencies[currencyCodes] = currencyCodes.map(
                (code) => country.currencies[code].symbol
            );
            return currencies;
        }, {});

        return currencySymbols;
    } catch (error) {
        console.error("Error fetching currency symbols:", error);
        throw new Error("Failed to fetch currency symbols");
    }
};
