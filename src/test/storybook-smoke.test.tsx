import type { ComponentType } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { composeStories, setProjectAnnotations } from '@storybook/react-vite'
import previewAnnotations from '../../.storybook/preview'

setProjectAnnotations([previewAnnotations])

type StoryComponent = ComponentType & {
  play?: (context: { canvasElement: HTMLElement }) => Promise<void>
}

type StoriesModule = Parameters<typeof composeStories>[0]

/**
 * Wszystkie pliki `*.stories.tsx` z `src/` — nowy komponent trafia tu sam,
 * bez dopisywania go do listy.
 */
const modules = import.meta.glob<StoriesModule>('../**/*.stories.tsx', { eager: true })

/**
 * Każda historia musi się wyrenderować (i przejść swoje `play`),
 * inaczej konfiguracja Storybooka lub dekoratory się rozjechały.
 */
describe('storybook smoke', () => {
  it('konfiguracja preview ładuje się', () => {
    expect(previewAnnotations.decorators).toBeDefined()
  })

  for (const [path, module] of Object.entries(modules)) {
    const file = path.split('/').pop()!.replace('.stories.tsx', '')
    const stories = composeStories(module) as Record<string, StoryComponent>

    for (const [storyName, Story] of Object.entries(stories)) {
      it(`${file}/${storyName} renderuje się`, async () => {
        const { container } = render(<Story />)
        await Story.play?.({ canvasElement: container })
        expect(container).not.toBeEmptyDOMElement()
      })
    }
  }
})
