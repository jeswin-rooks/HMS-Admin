import React from 'react';
import { Bed, Ban, CheckCircle, Trash2 } from 'lucide-react';

const iconMap = {
  Bed,
  Ban,
  CheckCircle,
  Trash2
};

const StatsOverviewSection = ({ subtitle = 'Hello Name', title = 'Welcome Back', stats = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 w-full max-w-[1360px] mx-auto">
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || Bed;
        const colorStyles = {
          blue: "bg-[#DBEAFE] text-[#1D4ED8]",
          red: "bg-[#FAD7DA] text-[#E63946]",
          green: "bg-[#D4EDDA] text-[#28A745]",
          yellow: "bg-[#FFF3CD] text-[#FFC107]"
        };
        const iconBg = colorStyles[stat.color] || colorStyles.blue;

        return (
          <div key={idx} className="bg-[#EDFFF0] rounded-xl p-6 border border-[#cad8cf] flex flex-col justify-between shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)] h-[166px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#666666] font-medium text-[18px]">{stat.title}</h3>
              <div className={`w-[50px] h-[50px] flex items-center justify-center rounded-full ${iconBg}`}>
                <Icon size={24} />
              </div>
            </div>
            <p className="text-[36px] font-bold text-[#212121] leading-none">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverviewSection;