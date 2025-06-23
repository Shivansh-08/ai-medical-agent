import Image from "next/image";

export type doctorAgent = {
  id: string;
  image: string;
  specialist: string;
  description: string;
};

type Props = {
  doctorAgent: doctorAgent;
  selectedDoctor: { id: string } | null;
  setSelectedDoctor: (doctor: doctorAgent) => void;
};

export default function SuggestedDoctorCard({
  doctorAgent,
  selectedDoctor,
  setSelectedDoctor,
}: Props) {
  const isSelected = selectedDoctor?.id === doctorAgent?.id;
  
  return (
    <div
      className={`flex flex-col items-center border rounded-2xl shadow p-5 
        cursor-pointer transition 
        ${selectedDoctor?.id === doctorAgent?.id ? 'border-blue-500' : ''} 
        hover:border-blue-500`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      {/* Doctor Image */}
      <div className="mb-3">
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          width={80}
          height={80}
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
      </div>
      
      {/* Doctor Name */}
      <h2 className="font-bold text-sm text-center mt-3">
        {doctorAgent.specialist}
      </h2>
      
      {/* Doctor Description */}
      <p className="text-xs text-center line-clamp-2 mt-1">
        {doctorAgent.description}
      </p>
    </div>
  );
}