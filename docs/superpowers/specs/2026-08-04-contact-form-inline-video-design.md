# Contact form and inline Work video design

## Goal

Improve the mobile homepage interaction in two places without changing the existing visual direction.

## Contact interaction

- Keep the current contact hero and `Tell us your story` CTA.
- On activation, reveal an inquiry form in the contact/footer content position shown in the supplied mobile reference and smoothly move it into view.
- Use fields for name, email, company/brand, project type, message, and an explicit submit action.
- Keep the header, language control, navigation, and footer available; do not open an email client or a separate page.
- Provide visible labels, keyboard focus, validation messages, and a submission status region.
- Because the site is static, submission will use the existing contact email workflow unless a form endpoint is already configured. Form data must not be silently discarded.

## Work video interaction

- The media thumbnail is a video control, not a navigation link.
- Activating the play control starts or pauses the video in place and never changes pages.
- `View project` remains the separate navigation path to the case page.
- Preserve `playsinline` for iPhone Safari and expose native controls once playback starts.
- Do not autoplay Work videos with sound. Pause videos when sufficiently out of view to avoid competing playback and unnecessary mobile resource use.

## Error handling and compatibility

- If playback fails, leave the poster visible and make native controls available for a second user gesture.
- Respect reduced-motion preferences for scrolling/transition effects.
- Verify at mobile and desktop breakpoints, including iPhone Safari-sized viewport, keyboard navigation, and no accidental navigation from the media control.

## Scope

Only the homepage contact and selected-work interactions are changed. Case pages, artist pages, content, and the overall visual system remain unchanged.
