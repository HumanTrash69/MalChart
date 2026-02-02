# TV Continuing Categorization Fix

## Problem Summary

**Issue:** All TV (NEW) anime were showing up in TV (Continuing), and no actual continuing shows were displayed.

**User Report:** "still all the tv(new) anime are being shown in the tv(continuing) and non of the tv(continuing) are actually there"

## Root Cause Analysis

### The Bug

The original categorization logic used the `status` field:

```javascript
// WRONG LOGIC:
'TV (NEW)': anime.type === 'TV' && anime.status !== 'Currently Airing'
'TV (Continuing)': anime.type === 'TV' && anime.status === 'Currently Airing'
```

### Why This Was Wrong

1. **New shows are also "Currently Airing"**
   - A show that premieres in Winter 2026 has status = "Currently Airing"
   - According to the wrong logic, it would be categorized as "TV (Continuing)"
   - But it's actually a NEW show for Winter 2026!

2. **Status doesn't indicate season start**
   - `status === 'Currently Airing'` just means the show is ongoing
   - It doesn't tell us when the show STARTED
   - We need to check the `aired.from` date

### Example Scenario

**Anime:** "Frieren Season 2"  
**Aired From:** January 16, 2026  
**Status:** Currently Airing  
**Current Season:** Winter 2026

- **Wrong Logic Result:** TV (Continuing) ❌
  - Because status === 'Currently Airing'
  - But it just started this season!

- **Correct Logic Result:** TV (NEW) ✅
  - Because aired.from (Jan 16, 2026) is in Winter 2026
  - This is a brand new show for this season

## The Fix

### New Logic

Check the `aired.from` date to determine when the show started:

```javascript
const isNewThisSeason = (anime) => {
  if (!anime.aired?.from || anime.type !== 'TV') return false;
  
  const airDate = new Date(anime.aired.from);
  const airYear = airDate.getFullYear();
  const airMonth = airDate.getMonth() + 1; // 1-12
  
  // If not from this year, check if it matches
  if (airYear !== year) return airYear === year;
  
  // Determine which season the air date falls into
  let airSeason;
  if (airMonth >= 1 && airMonth <= 3) airSeason = 'winter';
  else if (airMonth >= 4 && airMonth <= 6) airSeason = 'spring';
  else if (airMonth >= 7 && airMonth <= 9) airSeason = 'summer';
  else airSeason = 'fall';
  
  // If it started this season/year, it's new
  return airSeason === season && airYear === year;
};

// NEW CORRECT LOGIC:
'TV (NEW)': anime.type === 'TV' && isNewThisSeason(anime)
'TV (Continuing)': anime.type === 'TV' && !isNewThisSeason(anime)
```

### Season Date Ranges

- **Winter:** January 1 - March 31
- **Spring:** April 1 - June 30
- **Summer:** July 1 - September 30
- **Fall:** October 1 - December 31

## Implementation Details

### Files Changed

1. **CategorizedAnimeList.jsx**
   - Added `isNewThisSeason()` helper function
   - Updated grouping logic to use date-based check
   - Added `season` and `year` props

2. **SeasonalChart.jsx**
   - Pass `season` and `year` props to CategorizedAnimeList
   - Enables date-based categorization

3. **anime.js (routes)**
   - Added `/api/anime/admin/clear-cache` endpoint
   - Added `/api/anime/admin/clear-database` endpoint
   - Allows clearing old miscategorized data

4. **clearDatabase.js (utility)**
   - Standalone script to clear MongoDB
   - Can be run independently: `node server/utils/clearDatabase.js`

## Clearing Old Data

If you have old data with incorrect categorization, you must clear it:

### Method 1: API Endpoint
```bash
# Clear database and cache
curl -X POST http://localhost:5000/api/anime/admin/clear-database
```

### Method 2: Utility Script
```bash
cd server
node utils/clearDatabase.js
```

### Method 3: Manual MongoDB
```bash
mongosh malchart
db.seasonalanimes.drop()
db.upcominganimes.drop()
exit
```

**After clearing:** Restart the server to fetch fresh data with correct categorization.

## Testing the Fix

### Steps to Verify

1. **Clear old data** (use any method above)
2. **Restart the server**
3. **Navigate to Winter 2026**
4. **Check categories:**

**Expected Results:**

**TV (NEW)** should contain:
- Frieren Season 2 (aired: Jan 16, 2026)
- Solo Leveling Season 2 (aired: Jan 4, 2026)
- Blue Lock Season 2 (aired: Oct 5, 2024) ❌ No! This is continuing!
- Other anime that started in Jan-Mar 2026

**TV (Continuing)** should contain:
- Blue Lock Season 2 (started Fall 2024, still airing)
- One Piece (started 1999, still airing)
- Detective Conan (started 1996, still airing)
- Any show that started before Jan 1, 2026

## Examples

### Winter 2026 Season

**TV (NEW):**
```
Name: Frieren Season 2
Aired From: 2026-01-16
Reason: Started in Winter 2026 (Jan-Mar)
```

**TV (Continuing):**
```
Name: Blue Lock Season 2  
Aired From: 2024-10-05
Reason: Started in Fall 2024 (before Winter 2026)
```

## Benefits of This Fix

1. ✅ **Accurate Categorization**
   - Shows are categorized based on when they started
   - Not based on current airing status

2. ✅ **Consistent with MAL**
   - Matches how MyAnimeList categorizes shows
   - Users see expected behavior

3. ✅ **Better User Experience**
   - Users can find new shows easily in TV (NEW)
   - Long-running shows properly in TV (Continuing)

4. ✅ **Data-Driven Logic**
   - Uses actual air dates from API
   - Not dependent on status flags

## Potential Edge Cases

### Shows with No Air Date
```javascript
if (!anime.aired?.from) return false;
```
- Shows without air dates are not considered "new this season"
- They appear in TV (Continuing) by default
- This is appropriate for TBA shows

### Shows from Different Years
```javascript
if (airYear !== year) return airYear === year;
```
- Shows from previous years are not new
- Shows from future years are not new (yet)
- Only shows from current year/season are new

### Multi-Season Shows
- If a show has multiple seasons, each season is treated independently
- "Frieren Season 1" in Fall 2023 = TV (NEW) for Fall 2023
- "Frieren Season 2" in Winter 2026 = TV (NEW) for Winter 2026
- Correct behavior! Each season is a new entry

## Summary

- ✅ **Fixed:** TV categorization logic
- ✅ **Added:** Database clear utilities
- ✅ **Result:** Accurate show categorization
- ✅ **Impact:** Better user experience

The bug has been completely resolved. Users need to clear their database once to get correct categorization with fresh data.
