/**
 * Poster-1 template that can adapt to different dimensions
 * @param {number} width - Width of the poster in pixels
 * @param {number} height - Height of the poster in pixels
 * @returns {string} HTML template with the specified dimensions
 */
const poster1Template = (width, height) => {
  // Calculate proportional sizes based on dimensions
  // Using the 1000x1000 template as the base reference
  const baseWidth = 1000;
  const baseHeight = 1000;
  
  // Scale factor for width and height
  const widthScale = width / baseWidth;
  const heightScale = height / baseHeight;
  
  // Calculate scaled dimensions for all elements
  const chevronTop = Math.round(230 * heightScale);
  const chevronWidth = Math.round(867 * widthScale);
  const chevronHeight = Math.round(180 * heightScale);
  
  const titleLeft = Math.round(100 * widthScale);
  const titleTop = Math.round(250 * heightScale);
  const titleWidth = Math.round(800 * widthScale);
  const titleFontSize = Math.round(64 * Math.min(widthScale, heightScale));
  
  const subtitleLeft = Math.round(100 * widthScale);
  const subtitleTop = Math.round(350 * heightScale);
  const subtitleWidth = Math.round(800 * widthScale);
  const subtitleFontSize = Math.round(32 * Math.min(widthScale, heightScale));
  
  const logoWidth = Math.round(267 * widthScale);
  const logoHeight = Math.round(133 * heightScale);
  const logoRight = Math.round(67 * widthScale);
  const logoTop = Math.round(800 * heightScale);
  
  // Adjust logo position for very short posters
  const adjustedLogoTop = Math.min(logoTop, height - logoHeight - 20);
  
  return `<div style="width: ${width}px; height: ${height}px; position: relative; margin: 0 auto">
  <img
    data-name="background"
    data-prompt="A large background image for the poster"
    width="${width}"
    height="${height}"
    style="position: absolute"
    src="https://placehold.co/${width}x${height}/f8d7da/dc3545"
  />

  <!-- Semi-transparent chevron background -->
  <div
    style="
      position: absolute;
      left: 0px;
      top: ${chevronTop}px;
      width: ${chevronWidth}px;
      height: ${chevronHeight}px;
      background-color: rgba(0, 0, 0, 0.4);
      clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
      z-index: 1;
    "
  ></div>

  <div
    data-name="title"
    data-prompt="Large title of the poster (2-5 words)"
    style="
      position: absolute;
      left: ${titleLeft}px;
      top: ${titleTop}px;
      width: ${titleWidth}px;
      font-size: ${titleFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
      font-weight: bold;
      color: #ffffff;
      z-index: 2;
    "
  >
    Title
  </div>
  <div
    data-name="subtitle"
    data-prompt="Subtitle of the poster (4-8 words)"
    style="
      position: absolute;
      left: ${subtitleLeft}px;
      top: ${subtitleTop}px;
      width: ${subtitleWidth}px;
      font-size: ${subtitleFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
      font-weight: bold;
      color: #ffffff;
      z-index: 2;
    "
  >
    Subtitle
  </div>
  <img
    data-type="logo"
    width="${logoWidth}"
    height="${logoHeight}"
    src="https://placehold.co/${logoWidth}x${logoHeight}/white/black"
    style="position: absolute; right: ${logoRight}px; top: ${adjustedLogoTop}px; object-fit: contain"
  />
</div>`;
};

export default poster1Template;
