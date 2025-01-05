// utils/countryUtils.js
import { getCountryInfo } from 'sm-country-info';

/**
 * Fetch country data and map flags to sales data.
 * @param {Array} countries - List of country names to fetch data for.
 * @returns {Promise<Object>} - Updated sales data with country flags and detailed country info.
 */
export const fetchCountryDetailsAndFlags = async (countries) => {
    try {
        // Fetch country data for all countries in parallel
        const countryData = await Promise.all(
            countries.map(async (country) => {
                const response = await getCountryInfo(country);
                return response[0];
            })
        );

        // Create a map of country names to flag URLs
        const countryFlagMap = countryData.reduce((flags, country) => {
            flags[country.name.common] = country.flags.svg;
            return flags;
        }, {});

        return {
            countryData,
            countryFlagMap,
        };
    } catch (error) {
        console.error("Error fetching country data with flags:", error);
        
        throw new Error("Failed to fetch country data with flags");
    }
};
