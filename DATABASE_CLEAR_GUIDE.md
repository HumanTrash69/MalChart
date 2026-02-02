# Database and Cache Management

## Issue: TV (NEW) vs TV (Continuing) Categorization

The categorization logic has been fixed to properly distinguish between new and continuing shows:

- **TV (NEW)**: Shows that started airing **this season** (based on aired.from date)
- **TV (Continuing)**: Shows that started airing in a **previous season** but are still ongoing

### Previous Logic (WRONG):
```js
TV (NEW): status !== 'Currently Airing'
TV (Continuing): status === 'Currently Airing'
```

This was backwards because new shows are also "Currently Airing"!

### New Logic (CORRECT):
```js
TV (NEW): Started this season (aired.from in current season)
TV (Continuing): Started before this season (aired.from in previous season)
```

## Clearing Old Data

If you have old data with incorrect categorization, you need to clear it:

### Method 1: Using the Admin API Endpoint

**Clear Cache Only:**
```bash
curl -X POST http://localhost:5000/api/anime/admin/clear-cache
```

**Clear Database and Cache:**
```bash
curl -X POST http://localhost:5000/api/anime/admin/clear-database
```

### Method 2: Using the Utility Script

```bash
cd server
node utils/clearDatabase.js
```

This will:
1. Connect to MongoDB
2. Drop all collections
3. Close the connection

### Method 3: Manual MongoDB Commands

```bash
# Connect to MongoDB
mongosh malchart

# Drop all collections
db.seasonalanimes.drop()
db.upcominganimes.drop()

# Exit
exit
```

## After Clearing

1. **Restart the server** - It will fetch fresh data from Jikan API
2. **Wait for data to load** - First request will be slower as it fetches from API
3. **Verify categories** - Check that TV (NEW) and TV (Continuing) are correct

## Testing the Fix

To verify the fix works:

1. Clear the database (any method above)
2. Restart the server
3. Navigate to a current season (e.g., Winter 2026)
4. Check the categories:
   - **TV (NEW)**: Should show anime that started in Winter 2026
   - **TV (Continuing)**: Should show anime that started before Winter 2026 but are still airing

## Examples

**TV (NEW) - Winter 2026:**
- Anime with `aired.from` between January 1, 2026 and March 31, 2026
- These shows just started this season

**TV (Continuing) - Winter 2026:**
- Anime with `aired.from` before January 1, 2026
- But still airing in Winter 2026
- These shows started in previous seasons (Fall 2025, Summer 2025, etc.)

## Cache Duration

By default:
- **Cache:** 24 hours
- **Database:** Checks for staleness every 24 hours

Fresh data will be fetched automatically when stale.
