'use client';

import { Badge } from '@/components/ui/badge';
import { Building2, Award } from 'lucide-react';
import Image from 'next/image';

interface Student {
  id: number;
  name: string;
  image: string;
  retainedPrice: string;
  team: string;
}

const Intern: Student[] = [
  {
    id: 1,
    name: 'Rishikesh Wagh',
    image: 'https://ik.imagekit.io/yellocricket2025/RishikeshWagh.heic',
    retainedPrice: '6000',
    team: "Super Seven Warriors",
  },
  {
    id: 2,
    name: 'Srinivasa',
    image: 'https://ik.imagekit.io/yellocricket2025/srini.jpeg',
    retainedPrice: '12000',
    team: "Gravity Gladiators",
  },
  {
    id: 3,
    name: 'Om patil',
    image: 'https://ik.imagekit.io/yellocricket2025/om%20patil%20.jpg',
    retainedPrice: '4000',
    team: "Spartan Warriors",
  },
];

const RetainedPlayers = () => {
  const placedStudents: Student[] = Intern;

  const StudentCard = ({ student }: { student: Student }) => (
    // ✅ YOUR ORIGINAL CARD STYLING - UNCHANGED
    <div className="flex-shrink-0 w-64 sm:w-72 mx-2 sm:mx-4">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-72 sm:h-80">
        <Image
          src={student.image}
          alt={student.name}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <div className="backdrop-blur-sm bg-black/30 rounded-lg p-3 sm:p-4 border border-white/20 space-y-2 sm:space-y-3">
              <div className="text-center space-y-1 sm:space-y-2">
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  {student.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-white/90 text-xs sm:text-sm">
                  <Building2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="font-semibold text-center leading-tight">
                    {student.team}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white transition-colors duration-200 text-xs sm:text-sm px-3 py-2">
                  Retained ₹{student.retainedPrice}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      {/* 🔥 NEW ATTRACTIVE CRICKET BACKGROUND ONLY */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900/50 to-amber-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-2xl">
            Retained Players
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-lg">
            Stars who stayed loyal to their teams
          </p>
        </div>

        {/* Marquee Section */}
        <div className="overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl p-4 sm:p-8">
          <div className="whitespace-nowrap animate-marquee">
            <div className="flex inline-flex">
              {placedStudents.map((student, index) => (
                <StudentCard key={`main-${index}`} student={student} />
              ))}
              {placedStudents.map((student, index) => (
                <StudentCard key={`duplicate-${index}`} student={student} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 40s;
          }
        }
      `}</style>
    </section>
  );
};

export default RetainedPlayers;
