'use client'

import { useState } from 'react'
import { StepIndicator } from './step-indicator'
import { PreviewFrame } from './preview-frame'
import { TemplateSelection } from './steps/template-selection'
import { BasicInfo } from './steps/basic-info'
import { ContentDetails } from './steps/content-details'
import { ThemeCustomization } from './steps/theme-customization'
import { ReviewPublish } from './steps/review-publish'

const STEPS = ['Template', 'Basic Info', 'Content', 'Theme', 'Publish']

export function WeddingBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    storyTitle: '',
    storyContent: '',
    ceremonyVenue: '',
    ceremonyAddress: '',
    receptionVenue: '',
    receptionAddress: '',
    primaryColor: '#8B7355',
    secondaryColor: '#F5F5DC',
    accentColor: '#D4AF37',
    sections: {
      hero: true,
      countdown: true,
      story: true,
      events: true,
      rsvp: true,
      gallery: false,
      travel: false,
      faq: false,
    },
  })

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleUpdate = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-stone-900">Wedding Website Builder</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Area */}
          <div className="bg-white rounded-lg shadow-sm border border-stone-200 p-8">
            {currentStep === 1 && (
              <TemplateSelection
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelect}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <BasicInfo
                data={{
                  brideName: formData.brideName,
                  groomName: formData.groomName,
                  weddingDate: formData.weddingDate,
                }}
                onUpdate={handleUpdate}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <ContentDetails
                data={{
                  storyTitle: formData.storyTitle,
                  storyContent: formData.storyContent,
                  ceremonyVenue: formData.ceremonyVenue,
                  ceremonyAddress: formData.ceremonyAddress,
                  receptionVenue: formData.receptionVenue,
                  receptionAddress: formData.receptionAddress,
                  sections: formData.sections,
                }}
                onUpdate={handleUpdate}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <ThemeCustomization
                data={{
                  primaryColor: formData.primaryColor,
                  secondaryColor: formData.secondaryColor,
                  accentColor: formData.accentColor,
                }}
                onUpdate={handleUpdate}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 5 && selectedTemplate && (
              <ReviewPublish
                data={{
                  brideName: formData.brideName,
                  groomName: formData.groomName,
                  weddingDate: formData.weddingDate,
                }}
                templateId={selectedTemplate}
                onUpdate={handleUpdate}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Preview Area */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-stone-900 mb-4">Live Preview</h3>
              <div className="h-[600px] overflow-hidden rounded-lg border-2 border-stone-300">
                {selectedTemplate ? (
                  <PreviewFrame
                    templateId={selectedTemplate}
                    content={{
                      ...formData,
                      weddingDate: formData.weddingDate ? new Date(formData.weddingDate) : new Date(),
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-stone-100">
                    <p className="text-stone-500">Select a template to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
