import React from 'react';
import Image, { type StaticImageData } from 'next/image';

// Define the shape of a single step
interface Step {
  stepNumber: number;
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
    <div className="step-card flex flex-col h-full">
      <Image
        src={step.image}
        alt={step.title}
        className="step-image"
        width={800}
        height={450}
      />
      <div className="step-content flex flex-col flex-grow">
        <h3 className="text-30 mt-[30px] mb-3">
          {step.stepNumber}. {step.title}
        </h3>
        <ul className="lg:max-w-[460px] list-inside flex-grow">
          {step.tasks.map((task, index) => (
            <li
              className="text-font19 text-[#77787B] mb-3 font-regular leading-[1.6]"
              key={index}
            >
              {task}
            </li>
          ))}
        </ul>
        <div className="border-b border-dark mt-[37px]"></div>
      </div>
    </div>
  );
};

interface VideoGuideProps {
  maintitle: string;
  subtitle: string;
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
        <div className="grid grid-cols-1 xl:grid-cols-7">
          <div className="col-span-2 mb-5 xl:mb-0"></div>
          <div className="col-span-5 w-full">
            <h2 className="title-65">{maintitle}</h2>
            <p className="text-30 my-[40px] text-[#77787B]">{subtitle}</p>
            <div className="steps-grid grid grid-cols-1 md:grid-cols-2 gap-[37px] items-stretch">
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
