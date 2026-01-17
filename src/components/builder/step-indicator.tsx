'use client'

interface Step {
  number: number
  title: string
  completed: boolean
  active: boolean
}

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((title, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? 'bg-rose-500 text-white'
                      : isActive
                      ? 'bg-rose-500 text-white ring-4 ring-rose-100'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className={`text-xs mt-2 text-center hidden md:block ${
                    isActive ? 'text-rose-600 font-medium' : 'text-stone-600'
                  }`}
                >
                  {title}
                </span>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <div
                    className={`h-full transition-all ${
                      isCompleted ? 'bg-rose-500' : 'bg-stone-200'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Step Title */}
      <div className="text-center mt-4 md:hidden">
        <p className="text-sm font-medium text-rose-600">{steps[currentStep - 1]}</p>
      </div>
    </div>
  )
}
