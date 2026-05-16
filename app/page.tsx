import Header from './components/Header'
import Footer from './components/Footer'
import HomeGallery from './components/HomeGallery'

async function getPopularMovies() {
  try {
    const res = await fetch('https://www.omdbapi.com/?apikey=5fbbb434&s=noir', {
      next: { revalidate: 3600 } // Cache results for 1 hour
    });

    const data = await res.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching SSR movies:', error);
    return [];
  }
}

export default async function Home() {
  const popularMovies = await getPopularMovies();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomeGallery initialMovies={popularMovies} />
      </main>
      <Footer />
    </div>
  )
}
