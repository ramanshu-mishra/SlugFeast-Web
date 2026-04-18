# Share Card to X - Step by Step Implementation Log

Date: 2026-04-14
Owner: Copilot session

## Goal
Enable a flow where the visual card can be converted into an image and used while sharing to X.

## Important platform limitation
X web intent URLs cannot directly attach an image file by URL alone.

Practical options implemented:
1. Generate PNG image from card visual.
2. Try native file sharing if the browser/device supports file sharing.
3. Otherwise copy image to clipboard when supported.
4. Also download PNG file for manual upload in X composer.
5. Open X composer prefilled with tweet text and coin link.

## Step-by-step changes made
1. Reviewed current ShareCard implementation and existing Share on X button behavior.
2. Attempted dependency-based approach using a DOM-to-image package; installation command was cancelled by user.
3. Switched to a dependency-free Canvas approach.
4. Added image utility functions in shareCard.tsx:
   - loadImage
   - drawRoundedRect
   - generateDisplayCardPng
   - downloadBlob
5. Added share status state machine:
   - idle
   - preparing
   - ready
   - error
6. Updated Share on X handler to:
   - Build tweet text and intent URL.
   - Generate PNG from DisplayCard style.
   - Try navigator.share with files for direct native share.
   - Try copying PNG to clipboard using ClipboardItem.
   - Download PNG as fallback.
   - Open X composer tab with prefilled tweet text.
7. Updated button label while work is running:
   - Preparing Image... while PNG is being built.
8. Added user feedback line under buttons for success/error outcomes.
9. Fixed canvas export parity: added the two horizontal border lines around the "LETS START THE FEAST" caption so generated PNG matches DisplayCard styling.
10. Refactored actions so Share on X no longer auto-downloads PNG. Added a separate Download button (with Lucide Download icon) that exclusively handles PNG download.
11. Further simplified Share on X: removed all image-preparation logic from this button. It now only opens X intent with prefilled text and link.
12. Extracted non-component utility logic from shareCard.tsx into a separate file at apps/client/utility.ts:
   - copyTextToClipboard
   - generateDisplayCardPng
   - downloadBlob
13. Wired ShareCard component to import and use these utilities instead of inline helper implementations.
14. Split the consolidated utility file into one utility per file under the existing apps/client/utility directory:
   - apps/client/utility/copyTextToClipboard.ts
   - apps/client/utility/downloadBlob.ts
   - apps/client/utility/generateDisplayCardPng.ts
15. Updated ShareCard imports to use the new per-file utility modules and removed obsolete apps/client/utility.ts.
16. Added a reusable top toaster component at apps/client/components/toaster.tsx.
17. Wired CardBanner short-address copy button to copy the full token address and show top toast feedback for success/failure/empty address.

## Files changed
- apps/client/components/shareCard.tsx
- apps/client/components/cardBanner.tsx
- apps/client/components/toaster.tsx
- apps/client/SHARE_CARD_IMAGE_X_IMPLEMENTATION_LOG.md
- apps/client/utility/copyTextToClipboard.ts
- apps/client/utility/downloadBlob.ts
- apps/client/utility/generateDisplayCardPng.ts

## Behavior summary after change
1. Share on X is a pure X intent action with prefilled text/link.
2. Download button is the only action that generates and downloads the PNG card image.
3. CardBanner short-address button copies the full token address.
4. A top toaster appears with copy result feedback (success, failure, or missing address).

## Manual validation checklist
1. Open coin page.
2. Open Share modal.
3. Click Share on X and confirm X composer opens with text/link.
4. Click Download and confirm PNG file is downloaded.
5. Click short-address copy button in CardBanner.
6. Confirm top toaster appears.
7. Confirm full token address is copied to clipboard.

## Revert note
If you want everything reverted, say: revert everything from this implementation.
