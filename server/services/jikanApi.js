const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting: Wait between requests to avoid hitting API limits
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch seasonal anime from Jikan API
 * @param {number} year - Year
 * @param {string} season - Season (winter, spring, summer, fall)
 * @returns {Promise<Array>} Array of anime
 */
const fetchSeasonalAnime = async (year, season) => {
  try {
    let allAnime = [];
    let page = 1;
    let hasNextPage = true;

    console.log(`Fetching seasonal anime for ${season} ${year}...`);

    while (hasNextPage) {
      const response = await fetch(`${BASE_URL}/seasons/${year}/${season}?page=${page}`);
      
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited, wait longer
          console.log('Rate limited, waiting 60 seconds...');
          await delay(60000);
          continue;
        }
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.data?.length > 0) {
        allAnime = [...allAnime, ...data.data];
        hasNextPage = data.pagination?.has_next_page;
        page++;
        
        // Wait 1 second between requests to respect rate limits
        if (hasNextPage) {
          await delay(1000);
        }
      } else {
        hasNextPage = false;
      }
    }

    // Remove duplicates
    const uniqueAnime = Array.from(
      new Set(allAnime.map(a => a.mal_id))
    ).map(id => allAnime.find(a => a.mal_id === id));

    console.log(`Fetched ${uniqueAnime.length} anime for ${season} ${year}`);
    return uniqueAnime;
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    throw error;
  }
};

/**
 * Fetch current season info from Jikan API
 * @returns {Promise<Object>} Current season data
 */
const fetchCurrentSeason = async () => {
  try {
    const response = await fetch(`${BASE_URL}/seasons/now`);
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching current season:', error);
    throw error;
  }
};

/**
 * Fetch upcoming anime
 * @returns {Promise<Array>} Array of upcoming anime
 */
const fetchUpcomingAnime = async () => {
  try {
    let allAnime = [];
    let page = 1;
    let hasNextPage = true;

    console.log('Fetching upcoming anime...');

    // Fetch all pages of upcoming anime
    while (hasNextPage) {
      const response = await fetch(`${BASE_URL}/seasons/upcoming?page=${page}`);
      
      if (!response.ok) {
        if (response.status === 429) {
          console.log('Rate limited, waiting 60 seconds...');
          await delay(60000);
          continue;
        }
        break;
      }

      const data = await response.json();
      
      if (data.data?.length > 0) {
        allAnime = [...allAnime, ...data.data];
        hasNextPage = data.pagination?.has_next_page;
        page++;
        
        // Wait 1 second between requests to respect rate limits
        if (hasNextPage) {
          await delay(1000);
        }
      } else {
        hasNextPage = false;
      }
    }

    const uniqueAnime = Array.from(
      new Set(allAnime.map(a => a.mal_id))
    ).map(id => allAnime.find(a => a.mal_id === id));

    console.log(`Fetched ${uniqueAnime.length} upcoming anime`);
    return uniqueAnime;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    throw error;
  }
};

module.exports = {
  fetchSeasonalAnime,
  fetchCurrentSeason,
  fetchUpcomingAnime
};
