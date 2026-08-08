# Oryntal AI Nexus

Act as a Principal Frontend Engineer and UX/UI Designer. Build a complete, responsive, and highly polished 2-page web application using React (Next.js preferred) and Tailwind CSS for an AI model marketplace named "Oryntal AI Labs". 

The entire application must feature a fixed, minimalist left-side navigation bar that mimics Pinterest's sleek layout, freeing up the rest of the viewport for dynamic, asymmetrical masonry grids. Use a sophisticated dark-mode aesthetic (e.g., slate-950 background, zinc border accents, with electric purple/neon teal glowing highlights for interactive elements).

Implement the following architecture across two interchangeable page views:

--- GLOBAL LAYOUT: LEFT SIDEBAR NAVIGATION ---
- Fixed to the left viewport, full height, thin profile.
- Contains: Logo at the top, vertical navigation icons with smooth hover text tooltips (Home, Blogs, Profile), and a prominent, rounded "+" or "List Model" button at the bottom.
- Main Content Area: Flex-1, scrollable, with generous padding to let the grid breathe.

--- PAGE 1: HOME (THE MARKETPLACE) ---
1. HERO SECTION: Minimalist typography. Huge, clean header: "Deploy the Future. Handcrafted AI Models." Subtitle: "A curated marketplace for production-ready open-source and fine-tuned AI models." Integrated global search bar at the top center.
2. CATEGORY QUICK-PILLS: A horizontally scrollable row of glassmorphism pill buttons (e.g., "All", "LLMs", "Computer Vision", "Voice & Audio", "Diffusion", "Edge AI"). Clicking a pill filters the grid dynamically.
3. THE MASONRY GRID (Model Feed): A true Pinterest-style, multi-column asymmetrical layout.
   - Each "Model Card" pin must include:
     - A placeholder area for generative abstract art representing the model.
     - Title (e.g., "Oryntal-Llama-3-FineTune") and a clickable Creator Tag (e.g., "@AlexAI").
     - Badges for metrics: Latency (<40ms), Size (7B), and Price/License (Free or Premium).
     - Hover State: Card scales slightly up, deepens shadow, and reveals a "Quick Preview" eye icon and a primary colored "Deploy" button.
4. TRENDING LABS SLIDER: A compact horizontal carousel breaking up the grid halfway down to highlight featured creators with avatar, bio, and total downloads count.

--- PAGE 2: BLOGS (COMMUNITY THOUGHTS) ---
1. HEADER & CONTROLS: Title "Community Thoughts". A segmented control toggle for "Trending Thoughts" vs "Latest Updates". On the opposite side, an accent-colored button: "Share Your Thoughts" that simulates opening a clean Markdown writing portal.
2. THE THOUGHTS FEED GRID: Maintaining the masonry grid layout, but optimized for readable text content cards.
   - Each "Blog Card" pin must include:
     - A moody, high-contrast cover image.
     - Author section: Avatar image, Name, and a small "Follow" button.
     - A compelling 2-sentence typography-focused hook snippet.
     - Footer: "5 min read", tags like "#FineTuning", and a minimal interaction bar showing mock counts for Likes, Comments, and a Bookmark icon.

--- SUBMISSION REQUIREMENTS ---
- Write clean, modular, and fully functional React code using Tailwind CSS for all styling and grid mechanics.
- Include mock data arrays for both the 6 AI Models and 4 Blog posts to fully populate the grids instantly.
- Ensure smooth transitions when switching between the Home view and the Blog view from the left sidebar.


UI and color must be match with logo and site style should be modern and professional.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1a2585a9-aefa-4d5d-bbfd-35fc25b1e78a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
