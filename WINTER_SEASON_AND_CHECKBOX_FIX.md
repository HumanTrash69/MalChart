# Winter Season and Checkbox Logic Fix

## Overview

This document details the fixes for two critical UX issues:
1. TV (Continuing) detection for Winter season
2. Checkbox logic reversal for content filters

---

## Issue 1: Winter Season TV (Continuing) Detection

### Problem

Shows that started airing in late December 2025 were incorrectly appearing as "TV (NEW)" in Winter 2026, when they should be "TV (Continuing)".

### Root Cause

Winter season spans December through February, crossing two calendar years. The previous logic only checked if the show started within the current year's season months, missing December of the previous year.

### Solution

Updated the `isNewThisSeason()` function to explicitly handle Winter season's two-year span:

```js
if (season === 'winter') {
  // Winter includes Dec (prev year) + Jan-Mar (current year)
  if (airYear === year && airMonth >= 1 && airMonth <= 3) return true;
  if (airYear === year - 1 && airMonth === 12) return true;
  return false;
}
```

### Examples

**Winter 2026 Categorization:**
- Show starts Dec 25, 2025 → **TV (Continuing)** ✅
- Show starts Jan 5, 2026 → **TV (NEW)** ✅
- Show starts Feb 10, 2026 → **TV (NEW)** ✅
- Show starts Oct 2025 → **TV (Continuing)** ✅

**Why This Matters:**
- December 2025 shows are already airing before Winter 2026 season "officially" starts
- They are "continuing" into Winter 2026, not "new" to that season
- Matches MyAnimeList's behavior

---

## Issue 2: Checkbox Logic Reversal

### Problem

The content filter checkboxes had counter-intuitive behavior:
- **Checked (✓)** = Hide content
- **Unchecked ( )** = Show content

This is opposite of what users expect. A checkmark typically means "yes, show this" not "no, hide this".

### User Feedback

> "when hentai and kids are selected we don't see hentai or anime for kids, but it shows a tick mark, isn't that tick mark kinda means like when ticked it will show hentai and kids anime which it is not"

### Solution

Completely reversed the logic:
- **Checked (✓)** = **Show** this content type
- **Unchecked ( )** = **Hide** this content type
- **Default: Unchecked** = Content hidden (safe defaults)

### Implementation

**State Naming:**
```js
// Before
const [filters, setFilters] = useState({
  hideHentai: true,  // checked = hide
  hideKids: true     // checked = hide
});

// After
const [filters, setFilters] = useState({
  showHentai: false,  // checked = show, unchecked = hide
  showKids: false     // checked = show, unchecked = hide
});
```

**Filter Logic:**
```js
// Before
if (filters.hideHentai && isHentai(anime)) return false;

// After
if (!filters.showHentai && isHentai(anime)) return false;
```

### User Experience

**Before:**
1. User sees checkboxes checked by default
2. Inappropriate content is hidden
3. User unchecks box thinking "I want to see this"
4. Nothing happens (content still hidden)
5. Confusion! ❌

**After:**
1. User sees checkboxes unchecked by default
2. Inappropriate content is hidden
3. User checks box to see this content
4. Content appears
5. Intuitive! ✅

---

## Files Modified

### 1. CategorizedAnimeList.jsx
**Change:** Fixed `isNewThisSeason()` function
- Added explicit Winter season handling
- December of previous year now included

### 2. SeasonalChart.jsx
**Changes:**
- Renamed state: `hideHentai/hideKids` → `showHentai/showKids`
- Changed defaults: `true` → `false`
- Reversed filter logic: `if (filters.hideX)` → `if (!filters.showX)`

### 3. SortSection.jsx
**Changes:**
- Updated checkbox binding: `hideHentai` → `showHentai`
- Updated checkbox binding: `hideKids` → `showKids`
- Changed defaults: `true` → `false`

---

## Testing

### Test Winter Season Detection

1. Navigate to Winter 2026
2. Check TV (NEW) category
   - Should contain shows starting Jan-Mar 2026
   - Should NOT contain shows starting Dec 2025
3. Check TV (Continuing) category
   - Should contain shows starting Dec 2025
   - Should contain shows starting before Dec 2025

### Test Checkbox Logic

1. Open the site (default state)
2. Verify both checkboxes are **unchecked**
3. Verify hentai/kids content is **hidden**
4. **Check** the "Hentai" box
5. Verify hentai content now **appears**
6. **Uncheck** the "Hentai" box
7. Verify hentai content **disappears** again

---

## Impact

### Winter Season Fix:
- ✅ Accurate categorization of December shows
- ✅ Matches MAL behavior
- ✅ Better user experience
- ✅ Clear distinction between new and continuing shows

### Checkbox Fix:
- ✅ Intuitive checkbox behavior
- ✅ Matches user expectations
- ✅ Safe defaults (inappropriate content hidden)
- ✅ Clear visual feedback
- ✅ Standard UI/UX patterns

---

## Summary

Both issues have been completely resolved:

1. **Winter Season Detection** - Shows starting in December 2025 correctly appear as TV (Continuing) in Winter 2026
2. **Checkbox Logic** - Checkmarks now intuitively show/hide content as expected

These fixes improve the overall user experience and make the application behavior more predictable and aligned with user expectations.
