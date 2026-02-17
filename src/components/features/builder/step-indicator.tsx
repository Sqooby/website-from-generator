'use client'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full bg-white border-b border-stone-100 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress bar + step labels */}
        <div className="flex items-center gap-0">
          {steps.map((title, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isActive = stepNumber === currentStep
            const isLast = index === steps.length - 1

            return (
              <div key={stepNumber} className="flex items-center flex-1 last:flex-none">
                {/* Step */}
                <div className="flex flex-col items-center gap-1.5 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'bg-rose-500 text-white'
                        : isActive
                        ? 'bg-stone-900 text-white ring-4 ring-stone-900/10'
                        : 'bg-stone-100 text-stone-400'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium hidden md:block whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-stone-900'
                        : isCompleted
                        ? 'text-rose-500'
                        : 'text-stone-400'
                    }`}
                  >
                    {title}
                  </span>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="flex-1 h-px mx-3 mb-5 relative bg-stone-200 overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-400 transition-all duration-500"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile: current step name + progress */}
        <div className="flex items-center justify-between mt-3 md:hidden">
          <p className="text-sm font-semibold text-stone-800">
            Krok {currentStep}/{totalSteps}: {steps[currentStep - 1]}
          </p>
          <p className="text-xs text-stone-400">{Math.round(progress)}%</p>
        </div>
        <div className="h-1 bg-stone-100 rounded-full mt-2 md:hidden overflow-hidden">
          <div
            className="h-full bg-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
