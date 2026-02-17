'use client'

import { useState } from 'react'
import type { StoryBlock } from '@/types'
import { StepIndicator } from './step-indicator'
import { PreviewFrame } from './preview-frame'
import { TemplateSelection } from './steps/template-selection'
import { BasicInfo } from './steps/basic-info'
import { ContentDetails } from './steps/content-details'
import { ThemeCustomization } from './steps/theme-customization'
import { ReviewPublish } from './steps/review-publish'

const STEPS = ['Szablon', 'Podstawy', 'Treść', 'Motyw', 'Publikacja']

export type BuilderFormData = {
  brideName: string
  groomName: string
  weddingDate: string
  heroImage: string
  heroTitle: string
  heroSubtitle: string
  storyTitle: string
  storyContent: string
  storyImage: string
  storyLayout: 'text-only' | 'image-left' | 'image-right' | 'image-top'
  storyBlocks?: StoryBlock[]
  ceremonyVenue: string
  ceremonyAddress: string
  receptionVenue: string
  receptionAddress: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  sections: {
    hero: boolean
    countdown: boolean
    story: boolean
    events: boolean
    rsvp: boolean
    gallery: boolean
    travel: boolean
    faq: boolean
  }
}

export function WeddingBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [formData, setFormData] = useState<BuilderFormData>({
    brideName: '',
    groomName: '',
    weddingDate: '',
    heroImage: '',
    heroTitle: '',
    heroSubtitle: '',
    storyTitle: '',
    storyContent: '',
    storyImage: '',
    storyLayout: 'image-right',
    storyBlocks: undefined,
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
  const handleTemplateSelect = (templateId: string) => setSelectedTemplate(templateId)
  const handleUpdate = (data: Partial<BuilderFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const previewContent = {
    ...formData,
    weddingDate: formData.weddingDate ? new Date(formData.weddingDate) : new Date(),
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #f5f0eb 100%)' }}>
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-stone-200/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-semibold text-stone-800 text-sm tracking-wide">Kreator stron weselnych</span>
          </div>

          {selectedTemplate && (
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Podgląd strony
            </button>
          )}
        </div>
      </header>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 max-w-7xl mx-auto">
          {/* Form Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200/80 p-8 min-h-[600px]">
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
                  heroImage: formData.heroImage,
                  heroTitle: formData.heroTitle,
                  heroSubtitle: formData.heroSubtitle,
                  storyTitle: formData.storyTitle,
                  storyContent: formData.storyContent,
                  storyImage: formData.storyImage,
                  storyLayout: formData.storyLayout,
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
                data={formData}
                templateId={selectedTemplate}
                onUpdate={handleUpdate}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Live Preview Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-stone-600">Podgląd na żywo</span>
                {selectedTemplate && (
                  <button
                    onClick={() => setPreviewOpen(true)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Pełny ekran →
                  </button>
                )}
              </div>
              <div className="h-[640px] overflow-hidden rounded-2xl border-2 border-stone-200/80 shadow-lg bg-white">
                {selectedTemplate ? (
                  <div className="w-full h-full overflow-hidden">
                    <PreviewFrame
                      templateId={selectedTemplate}
                      content={previewContent}
                    />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-rose-50/30 gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-stone-500 text-sm text-center px-4">
                      Wybierz szablon,<br />aby zobaczyć podgląd
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Preview Modal */}
      {previewOpen && selectedTemplate && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 bg-stone-900/90">
            <span className="text-white font-medium text-sm">Podgląd strony weselnej</span>
            <button
              onClick={() => setPreviewOpen(false)}
              className="text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Zamknij
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-white">
            <PreviewFrame
              templateId={selectedTemplate}
              content={previewContent}
            />
          </div>
        </div>
      )}
    </div>
  )
}
