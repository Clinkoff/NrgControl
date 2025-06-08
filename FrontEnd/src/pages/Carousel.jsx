import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      image: "assets/imagem1.png",
      title: "Energia Solar",
      description: "Descubra como a energia solar pode transformar sua casa",
      articleUrl: "/artigos/energia-solar",
    },
    {
      id: 2,
      image: "assets/imagem2.png",
      title: "Diminua Seus Gastos",
      description:
        "Estratégias inteligentes para reduzir custos e manter a rotina",
      articleUrl: "/artigos/diminuir-gastos",
    },
    {
      id: 3,
      image: "assets/imagem3.png",
      title: "Saiba Como Economizar",
      description: "Dicas práticas para economizar energia no dia a dia",
      articleUrl: "/artigos/como-economizar",
    },
    {
      id: 4,
      image: "assets/imagem4.png",
      title: "Consumo Inteligente",
      description:
        "Formas de transformar seu lar em um ambiente de consumo inteligente",
      articleUrl: "/artigos/consumo-inteligente",
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };



  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden bg-white">
      {/* Main carousel container */}
      <div
        className="relative h-[70vh] min-h-[500px] overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Slides */}
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex items-center justify-center"
            >
              {/* Imagem de fundo */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay gradient para melhor contraste do texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              {/* Conteúdo do slide */}
              <div
                className={`relative z-10 text-center text-white px-8 md:px-16 space-y-6 max-w-4xl transition-all duration-700 absolute bottom-16 left-1/2 transform -translate-x-1/2 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-gray-100 font-light drop-shadow-sm mb-8">
                  {slide.description}
                </p>

                <Link
                  to={slide.articleUrl}
                  className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md border border-gray-200
             hover:bg-gray-50 hover:scale-105 hover:shadow-lg 
             transition duration-300 ease-in-out"
                >
                  Ler Artigo
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 group shadow-lg"
        >
          <ChevronLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 group shadow-lg"
        >
          <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-8 h-3 bg-white rounded-full shadow-lg"
                : "w-3 h-3 bg-white/50 hover:bg-white/75 rounded-full hover:scale-125"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 ease-in-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg"
      >
        {isAutoPlay ? "⏸️ Pausar" : "▶️ Play"}
      </button>

      {/* Slide counter */}
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}

export default Carousel;
