# Article Recommendations Implementation

## Overview

This implementation adds personalized article recommendations to the KIA Digital application based on the user's current trimester calculated from their HPHT (Hari Pertama Haid Terakhir) data.

## API Endpoint

The feature consumes the following API endpoint:

```
GET {{base_url}}/article/recom?trimester=1
```

**Parameters:**

- `trimester`: Integer (1, 2, or 3) representing the trimester

**Response Format:**

```json
{
  "detail": {
    "status": "success",
    "message": "success get recommendation",
    "data": [
      {
        "id": 1,
        "title": "Mengatasi Rasa Lelah yang Tak Tertahankan",
        "category": "Kesehatan Ibu Hamil",
        "description": "Strategi mengelola fatigue ekstrim selama kehamilan.",
        "tags": ["bradikardia", "gula_darah_rendah"]
      }
    ]
  }
}
```

## Implementation Details

### 1. ArticleService.tsx

A service class that handles:

- Fetching article recommendations from the API
- Calculating trimester from HPHT date
- Getting current user's trimester

**Key Methods:**

- `getArticleRecommendations(trimester: number)`: Fetches recommendations
- `calculateTrimesterFromHPHT(hpht: string)`: Calculates trimester (1-3) based on pregnancy weeks
- `getCurrentTrimester(userInformation)`: Gets user's current trimester

### 2. useArticleRecommendations.ts

Custom React hook that:

- Fetches user information to get HPHT data
- Automatically calculates current trimester
- Fetches recommendations based on the trimester
- Handles loading states and errors

**Features:**

- Automatic trimester calculation
- Cache management (30 minutes stale time)
- Error handling with retry logic
- Supports both automatic and manual trimester specification

### 3. ArticleRecommendations.tsx

React component that displays personalized recommendations:

- Shows loading states while fetching data
- Handles cases where user hasn't set HPHT data
- Displays recommendations in a clean, clickable format
- Shows relevant tags and categories
- Provides navigation to full articles

### 4. Integration in Edukasi.tsx

Added the ArticleRecommendations component to the main Edukasi page:

- Positioned prominently before the search section
- Responsive design that fits the existing layout
- Seamless integration with existing navigation

## Trimester Calculation Logic

The trimester is calculated based on pregnancy weeks from HPHT:

- **Trimester 1**: 0-12 weeks
- **Trimester 2**: 13-28 weeks
- **Trimester 3**: 29-40 weeks

```typescript
const weeks = Math.floor(diffDays / 7);
if (weeks <= 12) return 1;
else if (weeks <= 28) return 2;
else if (weeks <= 40) return 3;
```

## User Experience Flow

1. **User has HPHT data**:

   - System automatically calculates current trimester
   - Fetches and displays relevant recommendations
   - Shows trimester badge for context

2. **User missing HPHT data**:

   - Shows helpful message explaining the feature
   - Provides quick navigation to set HPHT data
   - Maintains good UX without blocking access

3. **API errors**:
   - Graceful error handling with user-friendly messages
   - Retry functionality for temporary issues
   - Non-blocking - doesn't affect main article browsing

## Benefits

1. **Personalized Content**: Articles tailored to user's pregnancy stage
2. **Smart Automation**: No manual trimester selection needed
3. **Health-Focused**: Recommendations based on medical relevance
4. **Seamless Integration**: Works within existing app flow
5. **Responsive Design**: Adapts to all screen sizes

## Testing

To test the implementation:

1. **With HPHT data**:

   - Set HPHT in user profile to get different trimesters
   - Verify correct trimester calculation
   - Check that recommendations appear

2. **Without HPHT data**:

   - Remove/don't set HPHT
   - Verify helpful message appears
   - Test navigation to HPHT setup

3. **API scenarios**:
   - Test with backend running (real recommendations)
   - Test with backend down (error handling)
   - Test with invalid trimester values

## Future Enhancements

1. **Caching**: Store recommendations locally for offline use
2. **Bookmarking**: Allow users to save recommended articles
3. **Progress Tracking**: Mark articles as read
4. **Advanced Filtering**: Filter recommendations by health conditions
5. **Notifications**: Alert users to new relevant articles

## Files Created/Modified

### New Files:

- `src/services/ArticleService.tsx`
- `src/hooks/useArticleRecommendations.ts`
- `src/components/ArticleRecommendations.tsx`

### Modified Files:

- `src/pages/Edukasi.tsx` - Added ArticleRecommendations component

## API Dependencies

This feature requires:

1. Working `/article/recom` endpoint
2. User information API for HPHT data
3. React Query for state management
4. Existing authentication setup

The implementation gracefully handles API unavailability and provides fallback UX.
