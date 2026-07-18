# Focus Forge

## Definition

Focus Forge is a small React application built to interrupt the **dopamine anticipation loop** that drives compulsive scrolling, binge-watching, and gaming. It does not block distracting apps or sites. Instead, it asks for one minute (or however long you choose) of doing nothing before you give in to the urge, giving your dopamine level time to settle so the decision to consume becomes a conscious one instead of a reflex.

---

## Why it exists

Dopamine spikes during the **anticipation** of a reward, not during the reward itself. A cue (boredom, a notification, a stressful moment) triggers a craving, the craving drives a routine (opening YouTube, a game, a feed), and the routine is chased for a reward that is often smaller than the anticipation promised. Because the reward is delivered on a variable schedule, the loop is self-reinforcing and very hard to break through willpower alone.

Sitting with the discomfort for even a short, fixed amount of time lets the anticipation spike pass without being fed. Over time this weakens the automatic link between the cue and the routine, which is the actual mechanism behind "dopamine detox" advice. It's not abstinence, but interrupting the cue-to-routine transition on purpose.

---

## User story

As an Internet user who is bored right now, I feel the pull to watch social media videos or play video games. My anticipation of that reward is at its peak, and if I follow it without resistance I will likely lose hours for very little in return. Focus Forge lets me name the specific addiction I'm about to feed, set a short focus timer, even just one minute, and watch a circular countdown while I do nothing else. By the time the timer ends, the urge has usually faded enough that I can return to what actually matters, having broken the consumption loop instead of feeding it.

---

## Features

- **Focus Timer:** a circular, clockwise progress ring (styled after TickTick) with a digital clock face in the center. Set the focus duration in minutes and seconds, pick the addiction you're resisting from a dropdown, and start, pause, or reset the countdown.
- **Addictions:** a simple list of the things you're trying to resist (social media, video games, YouTube, etc.), stored in your browser's local storage. Add new entries at any time; they immediately become available in the Focus Timer dropdown.
- **Useful Videos:** a curated list of Non-Sleep Deep Rest (NSDR) videos parsed from `json/videos.json`. Clicking an item expands an accordion with an embedded YouTube player so you can start a genuinely restorative break instead of a doom-scroll.
- **Light / dark theme:** a toggle in the header switches between light and dark mode; the choice is persisted in local storage and respected on reload.
- **Single-page layout:** all three sections (Focus Timer, Addictions, Useful Videos) live on one page and are switched via a tab-style nav bar, with no routing library involved.

---

## Tech stack

- [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) as the build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) (v4, via `@tailwindcss/vite`) for styling, with blue as the primary accent color
- Browser `localStorage` for persisting the theme and the addictions list - no backend is required

---

## Project structure

```
src/
  components/
    FocusTimer/          # circular progress ring + timer controls
    Addictions/          # addictions list + add form
    Videos/              # useful videos accordion
    Nav.tsx              # section switcher (Focus Timer / Addictions / Useful Videos)
    ThemeToggle.tsx      # light/dark switch
  hooks/
    useLocalStorage.ts   # generic localStorage-backed state
    useTheme.ts          # persisted theme + <html class="dark"> toggling
    useAddictions.ts     # persisted addictions list with add/remove
  types/                 # shared TypeScript types
  App.tsx
  main.tsx
json/
  videos.json            # source list of NSDR videos (also served from public/json)
public/
  json/videos.json       # copy served statically and fetched by the app at runtime
```

---

## Installation

1. Install [Node.js](https://nodejs.org/) 20 or newer.
2. Clone or download this repository and open a terminal in the project folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
Vite will print a local URL (typically `http://localhost:5173`). Open it in your browser.

---

## Available scripts

- `npm run dev`: start the Vite dev server with hot module reloading
- `npm run build`: type-check the project and produce a production build in `dist/`
- `npm run preview`: serve the production build locally
- `npm run lint`: run ESLint over the project
