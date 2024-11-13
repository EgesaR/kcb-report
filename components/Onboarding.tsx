import { useState } from "react";

interface OnboardingStep {
  title: string;
  description: string;
}

const onboardingSteps: OnboardingStep[] = [
  { title: "Welcome to the App!", description: "Here's a quick tour to get you started." },
  { title: "Feature 1", description: "This feature allows you to do XYZ easily and quickly." },
  { title: "Feature 2", description: "Learn how to leverage this feature for better productivity." },
  { title: "You're All Set!", description: "Enjoy exploring the app and making the most out of it." },
];

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextStep = () => {
    if (stepIndex < onboardingSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsVisible(false); // Close the tour on the last step
    }
  };

  const skipTour = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative">
        <h2 className="text-xl font-semibold mb-2">{onboardingSteps[stepIndex].title}</h2>
        <p className="text-gray-600 mb-4">{onboardingSteps[stepIndex].description}</p>
        
        <div className="flex justify-center space-x-4">
          {stepIndex < onboardingSteps.length - 1 && (
            <button
              onClick={skipTour}
              className="text-gray-500 hover:text-gray-700"
            >
              Skip
            </button>
          )}
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {stepIndex < onboardingSteps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
