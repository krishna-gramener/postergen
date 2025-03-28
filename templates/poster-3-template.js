/**
 * Poster-3 template that can adapt to different dimensions
 * @param {number} width - Width of the poster in pixels
 * @param {number} height - Height of the poster in pixels
 * @returns {string} HTML template with the specified dimensions
 */
const poster3Template = (width, height) => {
  // Calculate proportional sizes based on dimensions
  // Using the original poster-3 template as the base reference
  const baseWidth = 750;
  const baseHeight = 1000;
  
  // Scale factor for width and height
  const widthScale = width / baseWidth;
  const heightScale = height / baseHeight;
  
  // Calculate scaled dimensions for all elements
  // Semi-transparent overlay
  const overlayWidth = Math.round(375 * widthScale);
  
  // Top headline
  const topHeadlineLeft = Math.round(75 * widthScale);
  const topHeadlineTop = Math.round(85 * heightScale);
  const topHeadlineWidth = Math.round(250 * widthScale);
  const topHeadlineFontSize = Math.round(36 * Math.min(widthScale, heightScale));
  
  // Bottom headline
  const bottomHeadlineRight = Math.round(75 * widthScale);
  const bottomHeadlineTop = Math.round(570 * heightScale);
  const bottomHeadlineWidth = Math.round(250 * widthScale);
  const bottomHeadlineFontSize = Math.round(36 * Math.min(widthScale, heightScale));
  
  // Body text
  const bodyTextRight = Math.round(75 * widthScale);
  const bodyTextTop = Math.round(670 * heightScale);
  const bodyTextWidth = Math.round(250 * widthScale);
  const bodyTextFontSize = Math.round(14 * Math.min(widthScale, heightScale));
  
  // Call to action
  const ctaRight = Math.round(75 * widthScale);
  const ctaBottom = Math.round(100 * heightScale);
  const ctaWidth = Math.round(250 * widthScale);
  const ctaFontSize = Math.round(14 * Math.min(widthScale, heightScale));
  
  // Card tagline
  const taglineRight = Math.round(75 * widthScale);
  const taglineTop = Math.round(800 * heightScale);
  const taglineWidth = Math.round(250 * widthScale);
  const taglineFontSize = Math.round(16 * Math.min(widthScale, heightScale));
  
  // Logo
  const logoWidth = Math.round(100 * widthScale);
  const logoHeight = Math.round(100 * heightScale);
  const logoLeft = Math.round(75 * widthScale);
  const logoBottom = Math.round(100 * heightScale);
  
  return `<div style="width: ${width}px; height: ${height}px; position: relative; margin: 0 auto; overflow: hidden;">
  <img
    data-name="background"
    data-prompt="A large background image for the poster"
    width="${width}"
    height="${height}"
    style="position: absolute; top: 0; left: 0;"
    src="https://placehold.co/${width}x${height}/f5f5f5/cccccc" />

  <div style="position: absolute; top: 0; right: 0; width: ${overlayWidth}px; height: ${height}px; background-color: rgba(0, 0, 0, 0.25);"></div>

  <div
    data-name="top_headline"
    data-prompt="Top headline text (3-5 words)"
    style="
      position: absolute;
      left: ${topHeadlineLeft}px;
      top: ${topHeadlineTop}px;
      width: ${topHeadlineWidth}px;
      font-size: ${topHeadlineFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      line-height: 1.1;
    ">Top Headline</div>

  <div
    data-name="bottom_headline"
    data-prompt="Bottom headline text (3-5 words)"
    style="
      position: absolute;
      right: ${bottomHeadlineRight}px;
      top: ${bottomHeadlineTop}px;
      width: ${bottomHeadlineWidth}px;
      font-size: ${bottomHeadlineFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      line-height: 1.1;
    ">Bottom Headline</div>

  <div
    data-name="body_text"
    data-prompt="Body text paragraph (30-50 words)"
    style="
      position: absolute;
      right: ${bodyTextRight}px;
      top: ${bodyTextTop}px;
      width: ${bodyTextWidth}px;
      font-size: ${bodyTextFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      color: #ddd;
      line-height: 1.4;
    ">Detailed body text comes here.</div>

  <div
    data-name="call_to_action"
    data-prompt="Call to action text (10-15 words)"
    style="
      position: absolute;
      right: ${ctaRight}px;
      bottom: ${ctaBottom}px;
      width: ${ctaWidth}px;
      font-size: ${ctaFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      color: #ddd;
      line-height: 1.4;
    ">Call to action text</div>

  <div
    data-name="card_tagline"
    data-prompt="Card tagline (3-5 words)"
    style="
      position: absolute;
      right: ${taglineRight}px;
      top: ${taglineTop}px;
      width: ${taglineWidth}px;
      font-size: ${taglineFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
    ">Card Tagline</div>

  <img
    data-type="logo"
    width="${logoWidth}"
    height="${logoHeight}"
    src="https://placehold.co/${logoWidth}x${logoHeight}/f8d7da/dc3545"
    style="position: absolute; left: ${logoLeft}px; bottom: ${logoBottom}px; object-fit: contain;"
  />
</div>`;
};

export default poster3Template;
