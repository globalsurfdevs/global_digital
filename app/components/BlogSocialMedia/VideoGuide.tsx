import React from "react";
import Image, { type StaticImageData } from "next/image";

// Define the shape of a single step
interface Step {
  stepNumber?: number;
  title: string;
  image: StaticImageData;
  tasks: string[];
}

interface StepCardProps {
  step: Step; // The StepCard component should accept a single 'step' object
}

// Sub-component for a single step card
const StepCard: React.FC<StepCardProps> = ({ step }) => {
  return (
    <div className="step-card flex h-full flex-col">
      <Image
        src={step.image}
        alt={step.title}
        className="step-image"
        width={800}
        height={450}
      />
      <div className="step-content flex flex-grow flex-col">
        <h3 className="text-30 mb-3 mt-[30px]">
          {step.stepNumber && `${step.stepNumber}. `}
          {step.title}
        </h3>
        <ul className="flex-grow list-inside lg:max-w-[460px]">
          {step.tasks.map((task, index) => (
            <li
              className="font-regular mb-3 text-font19 leading-[1.6] text-[#77787B]"
              key={index}
            >
              {task}
            </li>
          ))}
        </ul>
        <div className="border-dark mt-[37px] border-b"></div>
      </div>
    </div>
  );
};

interface VideoGuideProps {
  maintitle: string;
  subtitle?: string;
  videoGuideSteps: Step[];
}

// Main component that renders the entire section
const VideoGuide: React.FC<VideoGuideProps> = ({
  maintitle,
  subtitle,
  videoGuideSteps,
}) => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 ">
          <div className="col-span-2 mb-5 xl:mb-0"></div>
          <div className="col-span-5 w-full">
            <h2 className="title-65">{maintitle}</h2>
            <p className="text-30 my-[40px] text-[#77787B]">{subtitle}</p>
            <div className="steps-grid grid grid-cols-1 items-stretch gap-[37px] md:grid-cols-2 lg:grid-cols-3">
              {videoGuideSteps.map((step) => (
                <StepCard key={step.stepNumber} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGuide;
