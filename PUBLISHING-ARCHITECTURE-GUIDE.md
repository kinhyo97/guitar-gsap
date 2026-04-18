# Publishing Architecture Guide

## Purpose

This project is a frontend-only publishing site built with Next.js App Router and GSAP.

## Directory Rules

- `public/`: static assets such as fonts, icons, and images
- `publish/`: exported publishing deliverables or handoff files
- `src/app/`: routes and page composition
- `src/components/common/`: reusable UI primitives
- `src/components/layout/`: site chrome such as header and footer
- `src/components/sections/`: page-specific content blocks
- `src/data/`: static content and navigation data
- `src/hooks/`: client hooks for motion and viewport logic
- `src/lib/`: utilities and GSAP setup helpers
- `src/styles/`: design tokens and utility classes
- `src/types/`: shared TypeScript types

## GSAP Notes

- Keep route files focused on composition.
- Put animation logic inside client components.
- Use `usePrefersReducedMotion` before running motion-heavy timelines.
- Register GSAP plugins through `src/lib/gsap.ts`.
