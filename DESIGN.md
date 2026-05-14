---
name: Lumi Labs
description: AI Creator Hub for Vietnamese non-tech users. Friendly, warm, simple, and product-demo first.
version: 1.0
last_updated: 2026-05-14

principles:
  - Non-tech users must understand the page in 3 seconds.
  - Every screen should answer: "Tôi vào đây để làm gì tiếp?"
  - Lumi Bot is the guide, not decoration.
  - Wow is welcome only when it makes the product feel easier, warmer, or more real.
  - Avoid dense text, technical jargon, and abstract AI-startup visuals.

voice:
  tone: warm, practical, honest, encouraging
  language: Vietnamese first
  avoid:
    - API, stack, prompt, shipped, OAuth on public-facing copy unless necessary
    - vague phrases like "hành trình AI" without concrete benefit
    - over-explaining before the user can try something

colors:
  background: "#FFF9F3"
  surface: "#FFFFFF"
  surface_warm: "#FFF7EF"
  text_primary: "#17111D"
  text_secondary: "#5F526B"
  text_muted: "#91859E"
  brand: "#7C3AED"
  brand_light: "#A78BFA"
  accent_red: "#FF5A66"
  accent_orange: "#FF9F68"
  accent_pink: "#F472B6"
  border: "#EEE2D9"
  success: "#16A34A"
  warning: "#F59E0B"

gradients:
  primary_cta: "linear-gradient(135deg, #FF5A66 0%, #FF8A5C 44%, #8B5CF6 100%)"
  soft_hero: "radial-gradient(circle at 70% 20%, rgba(167, 139, 250, .22), transparent 36%), radial-gradient(circle at 30% 0%, rgba(255, 154, 111, .22), transparent 32%)"
  card_glow: "linear-gradient(135deg, rgba(255,255,255,.92), rgba(255,247,239,.78))"

typography:
  font_family: "'Outfit', Inter, system-ui, sans-serif"
  hero:
    size_desktop: "clamp(52px, 6.6vw, 86px)"
    size_mobile: "clamp(38px, 13vw, 58px)"
    weight: 900
    line_height: 0.98
  section_title:
    size: "28px"
    weight: 900
  body:
    size: "16px"
    line_height: 1.65
  caption:
    size: "13px"
    line_height: 1.45

spacing:
  page_x_desktop: "clamp(24px, 5vw, 86px)"
  page_x_mobile: "20px"
  section_gap: "28px"
  card_padding: "24px"

radii:
  button: "16px"
  card: "24px"
  panel: "32px"
  pill: "999px"

components:
  header:
    style: "floating warm glass pill"
    must:
      - stay single-line on desktop
      - show logged-in avatar clearly
      - keep mobile compact
  lumi_bot:
    role: "guide"
    usage:
      - loading state
      - login/unlock widget
      - project story entry
      - empty states and help moments
    avoid:
      - oversized boxed overlays
      - cluttering the hero illustration
  login:
    message: "Đăng nhập để xem demo đầy đủ"
    pattern: "one clear CTA, then Google in modal"
    avoid:
      - multiple competing unlock buttons
      - long explanations around login
  project_card:
    style: "clear product card with one outcome, one action"
    required:
      - what it does
      - who it helps
      - try/read action

motion:
  duration_fast: "160ms"
  duration_base: "280ms"
  easing: "cubic-bezier(.2,.8,.2,1)"
  allowed:
    - gentle floating Lumi Bot
    - soft glow on important path
    - button hover lift
    - short loading sequence
  avoid:
    - heavy particles
    - excessive parallax
    - animations that hide the main action
---

# Lumi Labs Design Direction

Lumi Labs is not a traditional tech blog and not a dark futuristic SaaS dashboard. It should feel like a friendly AI lab for Vietnamese people who are curious but not technical yet.

The first impression should be:

> "À, mình không biết code vẫn có thể thử được. Có người dẫn mình từng bước."

## What Must Be Clear

Every important screen needs one simple promise, one obvious action, and one visible helper.

For example:

- Homepage: "Mình build cùng AI mỗi ngày."
- Caption AI: "Nhập ý tưởng, nhận caption ngay."
- Locked demo: "Đăng nhập để xem demo đầy đủ."
- Dashboard: "Những project bạn đang theo dõi."

## Lumi Bot

Lumi Bot is the identity anchor of the whole product. It should feel like a guide walking with the user, especially for non-tech users who may feel nervous.

Use Lumi Bot for:

- Loading: "Mình đang viết bản nháp cho bạn..."
- Login/unlock: "Đăng nhập để Lumi nhớ bạn cho các demo sau."
- Project story: "Mình sẽ chỉ bạn vì sao project này được làm."
- Empty dashboard: "Bạn chưa theo dõi project nào."

Avoid using Lumi Bot as a random sticker. It should always help the user understand the next step.

## Visual Style

Use warm white surfaces, soft purple accents, and a little coral/orange energy for CTA buttons. The page should feel polished, gentle, and slightly magical, but not childish.

Good:

- Soft purple hero art
- Rounded white cards
- Warm background
- One strong gradient CTA
- Small sparkle/glow details

Avoid:

- Dark navy as main theme
- Too many boxes inside boxes
- Too much text
- Random emojis everywhere
- Technical English labels unless the product name requires them

## Non-Tech Rule

If a phrase would make a non-tech office worker pause and ask "cái này là gì?", rewrite it.

Prefer:

- "Tạo caption ngay"
- "Xem demo đầy đủ"
- "Theo dõi project"
- "Nhận thông báo khi có bản mới"

Avoid:

- "Unlock feature"
- "Follow Journey"
- "OAuth"
- "API key"
- "Build log" on the homepage

## Page Structure

Homepage should be mostly a visual gateway:

1. Hero with Lumi Bot and simple promise.
2. Featured project card.
3. Latest article or short story card.
4. Small mission strip.
5. Login/follow widget.

Product pages should be even simpler:

1. What this tool does.
2. Input.
3. One main action.
4. Output.
5. Optional story link.

## Production Polish Checklist

Before pushing UI changes:

- Desktop header does not wrap.
- Mobile header is compact and readable.
- Avatar appears after login.
- Login modal copy is short.
- Caption AI can be used without visual clutter.
- No broken Vietnamese encoding in visible UI.
- CTA hierarchy is obvious.
- Lumi Bot appears where it helps, not where it distracts.
