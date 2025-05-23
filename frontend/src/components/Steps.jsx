import React from 'react'
import { FaWandMagicSparkles } from "react-icons/fa6";
import { HiLightBulb } from "react-icons/hi";
import { IoMdDownload } from "react-icons/io";


const Steps = () => {
    const steps = [
        {
          title: "Describe Your Vision",
          explanation: "Craft a vivid description of your imagination",
          iconName: HiLightBulb,
          step: 1
        },
        {
          title: "Witness the Magic",
          explanation: "Observe AI transforming words into visual wonder",
          iconName: FaWandMagicSparkles,
          step: 2
        },
        {
          title: "Download & Share",
          explanation: "Claim your masterpiece and spread the inspiration",
          iconName: IoMdDownload,
          step: 3
        }
      ];
    
      return (
        <div className="max-w-4xl mx-auto px-4 md:py-[11vh] py-20">
          <div className="text-center md:mb-[3vw] mb-12">
            <h2 className="md:text-[4vw] text-5xl font-bold text-neutral-200 mb-4">
              Create with Confidence
            </h2>
            <p className="text-md text-neutral-400 bg-neutral-700 inline-flex md:px-6 px-3 py-1 rounded-md">
              "Three simple steps from concept to reality"
            </p>
          </div>
    
          <div className="flex flex-col gap-[4vh] ">
            {steps.map((step) => (
              <div
                key={step.step}
                className="flex items-center p-[2vh] bg-neutral-700 rounded-lg transition-all hover:shadow-xl hover:scale-102 transition-all duration-500 cursor-pointer"
              >
                {/* Icon container */}
                <div className="w-16 h-16 rounded-lg flex items-center justify-center mr-6 bg-neutral-600">
                    <step.iconName size={step.step===2 ? 35 : 40} color='white' className='opacity-50'/>
                </div>
    
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-black mb-2 text-neutral-200">
                    {step.title}
                  </h3>
                  <p className="text-neutral-400 text-lg">
                    {step.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Steps
