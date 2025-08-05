import React, { useState, useEffect, useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { ArrowUp } from "lucide-react";
import { Photo } from "../utils";
import { getPhotos } from "../lib/supabase";
import CategoryFilter from "./CategoryFilter";
import detectZoom from "detect-zoom";
import "lazysizes";

const PAGE_SIZE = 20;

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [finished, setFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

    const breakpointColumns = {
    default: 5,
    1536: 5,
    1280: 4,
    1024: 2,
    768: 2,
  };

  const zoom = detectZoom.zoom();
  const baseWidth = 300;
  const adjustedWidth = baseWidth / zoom;

  const preloadImage = useCallback(
    (src: string) => {
      if (!preloadedImages.has(src)) {
        const img = new Image();
        img.src = src;
        setPreloadedImages((prev) => new Set([...prev, src]));
      }
    },
    [preloadedImages]
  );

  const preloadNextImages = useCallback(() => {
    if (!photos.length) return;

    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentImageIndex + i) % photos.length;
      preloadImage(photos[nextIndex].fullUrl);
    }
  }, [currentImageIndex, photos, preloadImage]);

  const fetchMorePhotos = async () => {
    if (loading || finished) return;
    setLoading(true);
    setError(null);

    try {
      const newPhotos = await getPhotos(
        activeCategory !== "ALL" ? activeCategory : undefined,
        page,
        PAGE_SIZE
      );

      if (newPhotos.length === 0) {
        setFinished(true);
      } else {
        setPhotos((prev) => [...prev, ...newPhotos]);
        setPage((prev) => prev + 1);
        newPhotos.slice(0, 5).forEach((photo) => preloadImage(photo.fullUrl));
      }
    } catch (err) {
      console.error("Error fetching photos:", err);
      setError("Failed to load photos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMorePhotos();
  }, [activeCategory]);

  useEffect(() => {
    preloadNextImages();
  }, [currentImageIndex, preloadNextImages]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);

      if (!containerRef.current || loading || finished) return;
      const { bottom } = containerRef.current.getBoundingClientRect();
      if (bottom < window.innerHeight + 300) {
        fetchMorePhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, finished, fetchMorePhotos]);

    const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    preloadNextImages();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const lightboxSlides = photos.map((photo, index) => ({
    src: photo.fullUrl,
    alt: `Shoot For Arts photography #a-${index + 1}`,
  }));

  return (
    <div className="py-6 md:py-8 mt-20" ref={containerRef}>
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setPhotos([]);
          setPage(0);
          setFinished(false);
          setActiveCategory(cat);
        }}
      />

      {loading && photos.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && photos.length === 0 && (
        <div className="text-center py-20">
          <p>No photos found in this category.</p>
        </div>
      )}

      {!error && photos.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4"
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="my-masonry-grid_item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="cursor-pointer overflow-hidden"
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    data-src={photo.thumbUrl}
                    className="lazyload w-full h-[200px] object-cover rounded shadow"
                    alt={`Shoot For Arts photography #a-${index + 1}`}
                    width={adjustedWidth}
                    height={200}
                  />
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>
      )}
            {lightboxSlides.length > 0 && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={lightboxSlides}
          index={currentImageIndex}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 5,
            zoomInMultiplier: 2,
          }}
          on={{
            click: () => {
              const nextIndex = (currentImageIndex + 1) % photos.length;
              setCurrentImageIndex(nextIndex);
              preloadNextImages();
            },
          }}
          carousel={{
            finite: true,
            preload: 3,
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
          }}
        />
      )}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent-dark transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;