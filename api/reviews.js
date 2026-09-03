// Serverless endpoint (Vercel) that fetches real Google reviews for ESSENZA
// MOTORS via the Places API and returns just what the front-end needs.
// The API key never reaches the browser — it only exists here, server-side,
// read from the GOOGLE_PLACES_API_KEY environment variable.
//
// Requires two env vars set in the Vercel project (Settings → Environment
// Variables), not committed to the repo:
//   GOOGLE_PLACES_API_KEY  — a Places API key, restricted to "Places API"
//   GOOGLE_PLACE_ID        — ESSENZA MOTORS' Place ID (ChIJ… format)
//
// Response is cached at the edge for 6h (reviews don't change minute to
// minute, and Place Details is a billed request) with a day of
// stale-while-revalidate so visitors never wait on Google directly.

module.exports = async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    res.status(503).json({ error: 'Google Reviews no está configurado todavía.' });
    return;
  }

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.set('place_id', placeId);
    url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews');
    url.searchParams.set('language', 'es');
    url.searchParams.set('reviews_no_translations', 'true');
    url.searchParams.set('key', apiKey);

    const googleRes = await fetch(url.toString(), { signal: AbortSignal.timeout(8000) });
    const data = await googleRes.json();

    if (data.status !== 'OK') {
      throw new Error(`Places API status: ${data.status} ${data.error_message ?? ''}`);
    }

    const reviews = (data.result.reviews ?? [])
      .filter((r) => r.text && r.text.trim().length > 0)
      .slice(0, 5)
      .map((r) => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
      }));

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({
      rating: data.result.rating ?? null,
      totalReviews: data.result.user_ratings_total ?? null,
      reviews,
    });
  } catch (err) {
    console.error('Error al obtener reseñas de Google:', err);
    res.status(502).json({ error: 'No se pudieron obtener las reseñas de Google.' });
  }
}
