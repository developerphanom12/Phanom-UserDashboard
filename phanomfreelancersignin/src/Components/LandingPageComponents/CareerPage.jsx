import React from 'react'
import CareerCard from './CareerCard';
import { useNavigate } from 'react-router-dom';

function CareerPage() {
  const navigate = useNavigate();
  const careers = [
    {
      title: ['MERN', 'Stack Developer'],
      desc: 'Build fast, scalable web apps with MongoDB, Express, React & Node — perfect for SaaS and startups.',
      img: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['MongoDB', 'Express', 'React', 'Node.js'],
    },
    {
      title: ['MEAN', 'Stack Developer'],
      desc: 'Angular + Node + Express + MongoDB — build enterprise-grade SPAs with desi performance focus.',
      img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Angular', 'Node.js', 'Express', 'MongoDB'],
    },
    {
      title: ['Laravel', 'Developer'],
      desc: 'Craft reliable backend systems and admin panels loved by Indian SMEs and fast-scaling startups.',
      img: 'https://images.pexels.com/photos/3861982/pexels-photo-3861982.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['PHP', 'Laravel', 'MySQL', 'REST APIs'],
    },
    {
      title: ['Flutter', 'Developer'],
      desc: 'Ship beautiful cross-platform apps for Android & iOS with native-like performance and speed.',
      img: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Dart', 'Flutter', 'Firebase', 'State Management'],
    },
    {
      title: ['Android', 'Developer'],
      desc: 'Build performant Android apps for India-first products and scale to millions of users.',
      img: 'https://images.pexels.com/photos/5077049/pexels-photo-5077049.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'RoomDB'],
    },
    {
      title: ['iOS', 'Developer'],
      desc: 'Design and deliver smooth iOS experiences for premium apps and consumer products.',
      img: 'https://images.pexels.com/photos/5717425/pexels-photo-5717425.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Swift', 'UIKit/SwiftUI', 'CoreData', 'Networking'],
    },
    {
      title: ['UI/UX', 'Designer'],
      desc: 'Design interfaces that Indian users love — usable, local-flavor, and conversion-focused.',
      img: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Figma', 'Prototyping', 'User Research', 'Wireframing'],
    },
    {
      title: ['Graphic', 'Designer'],
      desc: 'Create visual identities, banners and ad creatives with punch and cultural fit.',
      img: 'https://images.pexels.com/photos/4464812/pexels-photo-4464812.jpeg?auto=compress&cs=tinysrgb&w=800',
      skills: ['Photoshop', 'Illustrator', 'Branding', 'Poster Design'],
    },

  ];

  return (
    <div className="py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-[Poppins] font-bold text-[#6C5FD4] mb-4">
        Grow your career with India’s top creatives & devs
      </h1>

      <p className="text-gray-600 mb-10 max-w-2xl">
        Passionate, desi talent — from MERN & Flutter to SEO & content creators. Choose a role and take the leap.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
        {careers.map((career, index) => (
          <CareerCard key={index} career={career} />
        ))}
      </div>

      <div className="flex justify-center mt-[45px] mb-[20px]">
        <button
          onClick={() => navigate('/signup')}
          className="bg-[#8E59E2] text-white cursor-pointer rounded-3xl py-2 px-10 font-semibold shadow-md hover:bg-[#7442cc] transition cursor-pointer"
        >
          Become a seller
        </button>
      </div>
    </div>
  )
}

export default CareerPage;
