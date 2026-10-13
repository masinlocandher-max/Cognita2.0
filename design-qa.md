# Cognita landing page design QA

final result: passed

Source: user attachment 7924B622-F074-47F1-9B62-80075D75B23B.jpeg (585 × 1536). Portrait: D3417350-E5B8-45DD-97D0-DC3C57F83AAB.jpeg.
Implementation: http://terminal.local:4173/, desktop 1363 × 936 and mobile iframe 390 × 844 CSS pixels, browser device density 1.
Evidence: /workspace/scratch/cognita-comparison-final.png, /workspace/scratch/cognita-desktop-hero.png, /workspace/scratch/cognita-mobile.png, /workspace/scratch/cognita-mobile-founder.png.
Full-view comparison: reference rendered at 337px wide beside a live 1363px-wide page scaled to 25%; intentional small density difference documented. Native full-page capture timed out, so browser-rendered side-by-side iframe comparison was used. Focused hero and mobile founder captures checked readable text, face, and controls.

## Findings and fixes
- P1: Existing repository logo WebP was corrupt. Homepage uses a new clean raster wordmark matching the supplied reference, leaving the existing brand files intact.
- P2: Mobile founder two-column layout compressed biography and portrait. Changed to stacked full-width portrait and biography below 500px. Post-fix mobile-founder screenshot verifies correction.
- P2: Quote and closing copy crossed detailed scenery. Added translucent ivory text backing. Final side-by-side screenshot verifies readable contrast.

## Fidelity surfaces
- Typography: Georgia editorial display headings and restrained sans-serif body, navy hierarchy, no truncation in checked viewports.
- Layout: section order and multi-column editorial hierarchy follow reference. Additional approved text makes lower sections taller. Mobile reflows to two/one columns, larger founder portrait, accessible menu.
- Color: navy, ivory, gray and gold retained; scenic backgrounds in corresponding sections.
- Images: seven optimized web assets; conceptual generated landscape/learning photos match reference art direction. Supplied portrait preserved by format conversion, no facial edits. Existing raster logo was replaced only on homepage with a clean recreation.
- Content: user institutional copy, development status and unconfirmed availability retained; complementary institutional positioning; policy and CEE routes preserved. No fabricated outcomes, enrollment functionality, accreditation or social handles.

## Interaction and technical checks
- Desktop Our Programs anchor and Founder navigation tested.
- Mobile menu opens, anchor selection closes it (aria-expanded=false); founder image loads.
- Explore Programs navigates to existing /programs and renders its existing heading.
- Contact links use the user-supplied cognitainstituteai@gmail.com mailto destination; no email was sent.
- All visible image assets loaded. No desktop horizontal overflow.
- Browser console: no site-origin application errors observed; browser extension metadata errors excluded.
- npm run check passes build and repository security scan. Development-only learner code remains excluded from production.

## Follow-up polish
P3: Scenic photos are newly generated reference-matched conceptual imagery, not exact source pixels. Desktop reference has no separate mobile design; responsive adaptation uses the same hierarchy.
