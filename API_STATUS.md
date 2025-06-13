# API Status and Troubleshooting

## Current Status

As of June 13, 2025, the API is currently returning HTML content instead of JSON data. This is causing issues with the article data fetching in the Edukasi pages.

## Implemented Workaround

We've implemented the following workarounds to ensure the application can still function properly:

1. **Mock Data**: Added mock article data in `src/utils/articleHelpers.ts` to be used as fallback when API returns invalid data
2. **Force Mock Data Flag**: Added a `FORCE_MOCK_DATA` flag that can be toggled to always use mock data
3. **HTML Detection**: Added code to detect when the API returns HTML instead of JSON
4. **Error Handling**: Improved error handling to use fallback data instead of showing error screens

## How to Toggle Between Real API and Mock Data

In the file `src/utils/articleHelpers.ts`, you can find a flag at the top of the file:

```typescript
/**
 * Flag to force using mock data for development/testing
 * Set to true when API is not available or when testing UI
 */
export const FORCE_MOCK_DATA = true;
```

- **Set to `true`**: The application will always use mock data and not try to fetch from the API
- **Set to `false`**: The application will attempt to fetch from the API first, and only fall back to mock data if there's an error

## Adding More Mock Articles

If you need to add more mock articles for testing, you can edit the `mockArticles` array in `src/utils/articleHelpers.ts`.

Each mock article should follow this structure:

```typescript
{
  id: number,
  judul: string,
  kategori: string,
  deskripsi: string,
  tag: string, // pipe-separated values
  readTime?: string,
  image?: string,
  author?: string,
  publishDate?: string,
  fullContent?: string, // HTML content
}
```

## Next Steps for API Integration

1. **Confirm API Endpoints**: Verify the correct API endpoints with the backend team
2. **Check Authentication**: The issue could be related to authentication - ensure the token is being sent correctly
3. **Update axiosInstance.tsx**: Make sure the base URL is correct
4. **Set FORCE_MOCK_DATA to false**: Once the API is working correctly, make sure to set this flag to false

## API Response Format

When working correctly, the API should return:

### List Endpoint (`/article/`)

```json
[
  {
    "id": 1,
    "judul": "Article Title",
    "kategori": "Category Name",
    "deskripsi": "Brief description of the article",
    "tag": "tag1|tag2|tag3"
  },
  ...
]
```

### Detail Endpoint (`/article/{id}`)

```json
{
  "id": 1,
  "judul": "Article Title",
  "kategori": "Category Name",
  "deskripsi": "Brief description of the article",
  "tag": "tag1|tag2|tag3",
  "content": "Optional article content",
  "fullContent": "Optional full HTML content",
  "image": "Optional image reference",
  "author": "Optional author name",
  "publishDate": "Optional publish date",
  "readTime": "Optional read time"
}
```
