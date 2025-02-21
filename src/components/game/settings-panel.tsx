'use client'

import * as React from 'react'
import { Dialog } from '@headlessui/react'
import { X, Wand2, FileText } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useGameStore } from '@/store/gameStore'
import { cn } from '@/lib/utils'
import type { Difficulty, WritingStyle } from '@/store/gameStore'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface OptionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isSelected: boolean
  onClick: () => void
}

function OptionCard({ title, description, icon, isSelected, onClick }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-lg text-left transition-colors',
        'border-2 hover:border-secondary',
        isSelected ? 'border-secondary bg-secondary/10' : 'border-muted'
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
    </button>
  )
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme } = useTheme()
  const { difficulty, writingStyle, actions } = useGameStore()

  const difficultyOptions: { value: Difficulty; label: string; description: string }[] = [
    {
      value: 'easy',
      label: 'Easy',
      description: 'Simple sentences with basic editing tasks',
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'More complex sentences and challenging edits',
    },
    {
      value: 'hard',
      label: 'Hard',
      description: 'Advanced writing with strict word limits',
    },
  ]

  const styleOptions: { value: WritingStyle; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'creative',
      label: 'Creative Writing',
      description: 'Fiction, poetry, and descriptive passages',
      icon: <Wand2 className="w-5 h-5 text-secondary" />,
    },
    {
      value: 'non-fiction',
      label: 'Non-Fiction',
      description: 'Academic, business, and technical writing',
      icon: <FileText className="w-5 h-5 text-secondary" />,
    },
  ]

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={cn(
          'w-full max-w-lg rounded-xl p-6 shadow-lg',
          theme === 'dark' ? 'bg-surface text-text' : 'bg-white text-primary'
        )}>
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold">
              Game Settings
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-3">Writing Style</h2>
              <div className="grid gap-3">
                {styleOptions.map((style) => (
                  <OptionCard
                    key={style.value}
                    title={style.label}
                    description={style.description}
                    icon={style.icon}
                    isSelected={writingStyle === style.value}
                    onClick={() => actions.setWritingStyle(style.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">Difficulty Level</h2>
              <div className="grid gap-3">
                {difficultyOptions.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => actions.setDifficulty(level.value)}
                    className={cn(
                      'w-full p-3 rounded-lg text-left',
                      'border-2 transition-colors',
                      difficulty === level.value
                        ? 'border-secondary bg-secondary/10'
                        : 'border-muted hover:border-secondary'
                    )}
                  >
                    <div className="font-medium">{level.label}</div>
                    <div className="text-sm text-muted">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 