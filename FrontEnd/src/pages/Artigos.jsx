import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./footer";

const artigos = [
  {
    id: 1,
    image: 'assets/imagem1.png',
    title: 'Energia Solar',
    description: 'Descubra como a energia solar pode transformar sua casa e reduzir sua conta de luz',
    path: '/artigos/energia-solar',
    categoria: 'Sustentabilidade'
  },
  {
    id: 2,
    image: 'assets/imagem2.png',
    title: 'Diminua Seus Gastos',
    description: 'Estratégias inteligentes para reduzir custos e manter a qualidade de vida',
    path: '/artigos/diminuir-gastos',
    categoria: 'Economia'
  },
  {
    id: 3,
    image: 'assets/imagem3.png',
    title: 'Saiba Como Economizar',
    description: 'Dicas práticas para economizar energia no dia a dia sem perder conforto',
    path: '/artigos/como-economizar',
    categoria: 'Dicas'
  },
  {
    id: 4,
    image: 'assets/imagem4.png',
    title: 'Consumo Inteligente',
    description: 'Formas de transformar seu lar em um ambiente de consumo inteligente e eficiente',
    path: '/artigos/consumo-inteligente',
    categoria: 'Tecnologia'
  },
];

export default function Artigos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Nossos Artigos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossos conteúdos sobre economia de energia, sustentabilidade e vida inteligente
          </p>
        </div>

        {/* Articles Grid */}
        <div className="max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {artigos.map((artigo) => (
            <article 
              key={artigo.id} 
              className="group bg-white shadow-lg rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={artigo.image} 
                  alt={`Imagem ilustrativa sobre ${artigo.title.toLowerCase()}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Categoria Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {artigo.categoria}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {artigo.title}
                </h2>
                
                <p className="text-gray-600 mb-8 text-base leading-relaxed">
                  {artigo.description}
                </p>
                
                <Link 
                  to={artigo.path}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg text-sm"
                  aria-label={`Ler artigo sobre ${artigo.title}`}
                >
                  Ler Artigo
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Quer mais conteúdo?
            </h3>
            <p className="text-gray-600 mb-6">
              Cadastre-se em nossa newsletter e receba as últimas novidades sobre economia de energia
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
              <Footer />

    </div>
  );
}