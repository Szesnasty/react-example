# React Example

Szkielet startowy bez komponentów: Vite + React 19 + TypeScript, MUI z motywem,
Storybook 10, Vitest + Testing Library, ESLint.

## Skrypty

| Polecenie | Co robi |
| --- | --- |
| `npm run dev` | Serwer deweloperski Vite |
| `npm run build` | `tsc -b` + build produkcyjny |
| `npm run lint` | ESLint |
| `npm test` | Vitest (jednorazowo) |
| `npm run test:watch` | Vitest w trybie watch |
| `npm run storybook` | Storybook na porcie 6006 |
| `npm run build-storybook` | Statyczny build Storybooka |

## Struktura

```
.storybook/     konfiguracja Storybooka (preview z motywem, viewporty MUI)
public/         pliki statyczne serwowane z / (też w Storybooku)
src/
  App.tsx       placeholder aplikacji
  main.tsx      montaż Reacta: ThemeProvider + CssBaseline
  theme.ts      motyw MUI
  index.css     reset
  Welcome.mdx   strona startowa w Storybooku
  test/         setup Vitest + test dymny historii
```

Komponenty dodawaj w `src/components/`. Test dymny zbiera pliki
`*.stories.tsx` automatycznie, więc nie trzeba go aktualizować.
