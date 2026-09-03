# Cognita 2.0 Brand Kit

This directory is the canonical implementation package for the Cognita 2.0 visual identity selected from the light professional brand direction.

## Brand foundation

**Formal name:** The Cognita Institute of Artificial Intelligence  
**Compact lockup:** COGNITA / Institute of AI  
**Brand essence:** Human Intelligence. Amplified.  
**Learning framework:** THINK. APPLY. TRANSFORM.

The system is intentionally light, academic, human, and technology-forward. White and soft gray carry most surfaces. Deep navy provides institutional authority; indigo, violet, and cyan provide controlled digital accents.

## Canonical palette

- Deep Navy — `#071B3D`
- Indigo — `#4F46E5`
- Violet — `#A855F7`
- Cyan — `#06B6D4`
- Soft Gray — `#F3F6FA`
- White — `#FFFFFF`
- Ink — `#0B1634`
- Muted Text — `#5B6780`

## Typography

- Headlines / brand: Montserrat, 600–700
- Body / UI: Inter, 400–600
- Fallback: system sans-serif

## Contents

- `logos/` — scalable SVG logo marks and lockups plus PNG exports
- `mockups/` — editable SVG reference mockups plus PNG exports
- `code/` — CSS tokens, JSON tokens, JavaScript exports, and an HTML preview
- `reference/` — approved visual brand-board reference

## Usage rules

1. Use the full-color mark on white or very light neutral backgrounds as the default.
2. Use the navy or white mono mark when reproduction, contrast, or institutional formality requires it.
3. Do not add glow to the primary institutional logo. Glow can exist only as a digital campaign, launch, video, or hero treatment.
4. Maintain clear space around the mark equal to at least the diameter of the cyan dot.
5. Do not stretch, rotate, bevel, outline, recolor individual pieces arbitrarily, or place the mark over noisy photography without a contrast field.
6. Use the gradient sparingly. Navy and white should dominate long-form, academic, admissions, assessment, and certificate surfaces.
7. Keep the public website approachable and institutional. Student-only app surfaces may use more color and interactivity.

## Implementation

Import `code/cognita-brand.css` once near the root of the frontend, then use the provided custom properties and utility classes. The SVG assets are standalone and can be used directly in React `<img>` tags, CSS backgrounds, metadata, and downloadable institutional materials.

The brand package is intentionally isolated from Cognita's existing assessment, progression, learner-data, and application logic until those surfaces are intentionally restyled.
