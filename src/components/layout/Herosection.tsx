import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mountainImage from "@/assets/mountain.jpeg";
import { useTranslate } from "@tolgee/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";

interface Slide {
  id: number;
  image: string;
  topBanner: string;
  mainTitle: string;
  subtitle: string;
  code: string;
  validity: string;
  bottomBanner: string;
}

export default function HeroSection() {
  const { t } = useTranslate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: mountainImage,
      topBanner: t("hero.slide1.topBanner"),
      mainTitle: t("hero.slide1.mainTitle"),
      subtitle: t("hero.slide1.subtitle"),
      code: t("hero.slide1.code"),
      validity: t("hero.slide1.validity"),
      bottomBanner: t("hero.slide1.bottomBanner"),
    },
    // {
    //   id: 2,
    //   image: '/images/hero-slide-2.jpg',
    //   topBanner: 'Nouvelle collection',
    //   mainTitle: 'Équipements 2026',
    //   subtitle: 'Dernières innovations',
    //   code: 'NEW2026',
    //   validity: 'Découvrez maintenant',
    //   bottomBanner: 'Les nouveautés qui révolutionnent votre ride',
    // },
  ];

  // Auto-play du diaporama
  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full">
      {/* Bandeau supérieur fin */}
      <div className="w-full bg-primary-500 py-3 px-4">
        <p className="text-center text-white font-bold text-sm md:text-base uppercase tracking-wider">
          {slide.topBanner}
        </p>
      </div>

      {/* Bandeau principal avec image en background */}
      <div className="relative w-full h-125 md:h-150 overflow-hidden">
        {/* Image de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          {/* Overlay sombre pour améliorer la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/70" />
        </div>

        {/* Contenu du slide */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent drop-shadow-2xl">
            {slide.mainTitle}
          </h1>

          <p className="text-2xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            {slide.subtitle}
          </p>

          <div className="bg-neutral-900/90 backdrop-blur-sm px-8 py-4 rounded-lg border-2 border-primary-500 mb-4">
            <p className="text-accent-400 text-3xl md:text-5xl font-black tracking-wider">
              {slide.code}
            </p>
          </div>

          <p className="text-white text-lg md:text-xl font-medium mb-8 drop-shadow-md">
            {slide.validity}
          </p>

          <Link
            to={ROUTES.PRODUCTS}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-2xl inline-block"
          >
            {t("hero.shopNow", "Shop Now")}
          </Link>
        </div>

        {/* Contrôles du diaporama (si plusieurs slides) */}
        {slides.length > 1 && (
          <>
            {/* Boutons précédent/suivant */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-900/70 hover:bg-neutral-900/90 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
              aria-label={t("hero.previousSlide", "Previous Slide")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-900/70 hover:bg-neutral-900/90 text-white p-3 rounded-full transition-all z-20 backdrop-blur-sm"
              aria-label={t("hero.nextSlide", "Next Slide")}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicateurs de slides */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary-500 w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bandeau inférieur descriptif */}
      <div className="w-full bg-neutral-900 py-8 px-4 border-t border-primary-500/30">
        <p className="text-center text-white text-lg md:text-xl font-medium max-w-4xl mx-auto">
          {slide.bottomBanner}
        </p>
      </div>
    </section>
  );
}
