# Solusi CORS Error

## Masalah

```
Access to XMLHttpRequest at 'http://141.11.190.106:15000/api/v1/auth/register' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource
```

## Penyebab

CORS (Cross-Origin Resource Sharing) error terjadi ketika:

- Frontend berjalan di `http://localhost:5173` (Vite dev server)
- Backend berjalan di `http://141.11.190.106:15000`
- Browser memblokir request lintas origin tanpa header CORS yang tepat

## Solusi yang Diterapkan

### 1. Konfigurasi Vite Proxy (`vite.config.ts`)

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://141.11.190.106:15000',
      changeOrigin: true,
      secure: false,
      rewrite: (path) => path.replace(/^\/api/, '/api'),
    },
  },
}
```

**Cara kerja:**

- Request ke `/api/*` akan di-proxy ke `http://141.11.190.106:15000/api/*`
- `changeOrigin: true` - Mengubah origin header request
- `secure: false` - Mengizinkan HTTP (bukan HTTPS)

### 2. Update axiosInstance (`src/services/axiosInstance.tsx`)

```typescript
const baseURL = import.meta.env.DEV
  ? "/api/v1" // Development: melalui Vite proxy
  : "http://141.11.190.106:15000/api/v1"; // Production: direct URL
```

**Environment Detection:**

- **Development** (`npm run dev`): Menggunakan `/api/v1` → melalui proxy
- **Production** (`npm run build`): Menggunakan URL langsung

## Cara Menggunakan

### Development Mode

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- API requests: `/api/v1/*` → proxy ke `http://141.11.190.106:15000/api/v1/*`
- **Tidak ada CORS error**

### Production Mode

```bash
npm run build
npm run preview
```

- Menggunakan URL backend langsung
- Butuh konfigurasi CORS di backend untuk production

## Testing

Untuk memastikan solusi bekerja:

1. **Restart development server:**

   ```bash
   npm run dev
   ```

2. **Check console logs:**

   - Request URL harus menunjukkan `/api/v1/auth/register`
   - Tidak ada CORS error di browser console

3. **Network tab:**
   - Request URL: `http://localhost:5173/api/v1/auth/register`
   - Response dari: `http://141.11.190.106:15000/api/v1/auth/register`

## Alternatif Solusi Lain

Jika masih ada masalah, bisa menggunakan salah satu dari:

### 1. Environment Variable

```typescript
// .env.local
VITE_API_BASE_URL=http://141.11.190.106:15000/api/v1

// axiosInstance.tsx
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
```

### 2. Browser Extension

- Install CORS browser extension (hanya untuk development)
- **Tidak disarankan untuk production**

### 3. Backend CORS Configuration

Backend perlu menambahkan header:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Status

✅ **IMPLEMENTED** - Vite proxy configuration ditambahkan
✅ **UPDATED** - axiosInstance menggunakan environment detection
✅ **READY** - Restart dev server untuk mengaktifkan solusi
