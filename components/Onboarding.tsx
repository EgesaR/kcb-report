import { useEffect, useState } from "react";

interface OnboardingStep {
  title: string;
  description: string;
  imageUrl: string;
}

interface OnboardingProps{
  onComplete: () => void;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Welcome to the App!",
    description: "Here's a quick tour to get you started.",
    imageUrl:
      "https://images.unsplash.com/photo-1557683316-973673baf926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHdpc2hlc3xlbnwwfHx8fDE2NzM2OTYxNjE&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    title: "Feature 1",
    description: "This feature allows you to do XYZ easily and quickly.",
    imageUrl:
      "https://mui.com/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Feature 2",
    description: "Learn how to leverage this feature for better productivity.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHByb2R1Y3Rpdml0eXxlbnwwfHx8fDE2NzM2OTYxNjE&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    title: "You're All Set!",
    description: "Enjoy exploring the app and making the most out of it.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDN8fGNlbGVicmF0aW9ufGVufDB8fHx8MTY3MzY5NjE2MQ&ixlib=rb-4.0.3&q=80&w=400",
  },
];

const Onboarding = ({onComplete}:OnboardingProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const preloadImages = () => {
    onboardingSteps.forEach((step) => {
      const img = new Image();
      img.src = step.imageUrl;
    });
  };

  useEffect(() => {
    preloadImages();
  }, []);

  const nextStep = () => {
    if (stepIndex < onboardingSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsVisible(false); // Close the tour on the last step
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const skipTour = () => {
    setIsVisible(false);
  };

  const progressPercentage = ((stepIndex + 1) / onboardingSteps.length) * 100;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-between
                   sm:h-[60%] lg:h-[70%] animate-slide-in transition-opacity duration-500"
      >
        <img
          src={onboardingSteps[stepIndex].imageUrl}
          alt={onboardingSteps[stepIndex].title}
          onError={(e) =>
            (e.currentTarget.src = "https://via.placeholder.com/400")
          }
          className="w-full h-[180px] object-cover rounded-t-lg mb-4 transition-opacity duration-500 ease-in-out"
          style={{ opacity: isVisible ? 1 : 0 }}
        />

        <div className="flex-grow text-center">
          <h2 className="text-xl font-semibold mb-2">
            {onboardingSteps[stepIndex].title}
          </h2>
          <p className="text-gray-600 mb-4">
            {onboardingSteps[stepIndex].description}
          </p>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          {stepIndex > 0 && (
            <button
              onClick={prevStep}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}

          {stepIndex < onboardingSteps.length - 1 && (
            <button
              onClick={skipTour}
              className="text-gray-500 hover:text-gray-700 ml-4"
            >
              Skip
            </button>
          )}

          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ml-auto"
          >
            {stepIndex < onboardingSteps.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes slide-in {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-in {
            animation: slide-in 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Onboarding;
