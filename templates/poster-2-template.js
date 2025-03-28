/**
 * Poster-2 template that can adapt to different dimensions
 * @param {number} width - Width of the poster in pixels
 * @param {number} height - Height of the poster in pixels
 * @returns {string} HTML template with the specified dimensions
 */
const poster2Template = (width, height) => {
  // Calculate proportional sizes based on dimensions
  // Using the original poster-2 template as the base reference
  const baseWidth = 1200;
  const baseHeight = 675;
  
  // Scale factor for width and height
  const widthScale = width / baseWidth;
  const heightScale = height / baseHeight;
  
  // Calculate scaled dimensions for all elements
  // Product container
  const productWidth = Math.round(150 * widthScale);
  const productHeight = Math.round(200 * heightScale);
  const productBottom = Math.round(50 * heightScale);
  const productRight = Math.round(50 * widthScale);
  
  // Background bar
  const barTop = Math.round(100 * heightScale);
  const barHeight = Math.round(130 * heightScale);
  
  // Headline
  const headlineRight = Math.round(180 * widthScale);
  const headlineTop = Math.round(100 * heightScale);
  const headlineWidth = Math.round(1000 * widthScale);
  const headlineFontSize = Math.round(54 * Math.min(widthScale, heightScale));
  
  // Subheadline
  const subheadlineRight = Math.round(180 * widthScale);
  const subheadlineTop = Math.round(170 * heightScale);
  const subheadlineWidth = Math.round(1000 * widthScale);
  const subheadlineFontSize = Math.round(40 * Math.min(widthScale, heightScale));
  
  // Logo background bar
  const logoBarRight = Math.round(40 * widthScale);
  const logoBarWidth = Math.round(120 * widthScale);
  const logoBarHeight = Math.round(180 * heightScale);
  
  // Logo
  const logoWidth = Math.round(100 * widthScale);
  const logoHeight = Math.round(100 * heightScale);
  const logoRight = Math.round(50 * widthScale);
  const logoTop = Math.round(70 * heightScale);
  
  return `<div style="width: ${width}px; height: ${height}px; position: relative; margin: 0 auto; overflow: hidden; background-color: #87CEEB;">
  <img
    data-name="background"
    data-prompt="A large background image for the poster"
    width="${width}"
    height="${height}"
    style="position: absolute; top: 0; left: 0;"
    src="https://placehold.co/${width}x${height}/87CEEB/FFFFFF" />

  <img
    data-name="product_container"
    data-prompt="A product image"
    width="${productWidth}"
    height="${productHeight}"
    style="position: absolute; bottom: ${productBottom}px; right: ${productRight}px; box-shadow: 2px 2px 10px 4px rgba(255, 255, 255, .2)"
    src="https://placehold.co/${productWidth}x${productHeight}/FFFFFF/CCCCCC" />

  <div style="position: absolute; background-color: rgba(0, 0, 0, 0.3); top: ${barTop}px; width: 100%; height: ${barHeight}px;"></div>
  <div
    data-name="headline"
    data-prompt="Main headline (2-5 words)"
    style="
      position: absolute;
      right: ${headlineRight}px;
      top: ${headlineTop}px;
      width: ${headlineWidth}px;
      font-size: ${headlineFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      font-weight: bold;
      color: #ffffff;
      text-align: right;
    ">Main headline</div>

  <div
    data-name="subheadline"
    data-prompt="Supporting tagline (4-7 words)"
    style="
      position: absolute;
      right: ${subheadlineRight}px;
      top: ${subheadlineTop}px;
      width: ${subheadlineWidth}px;
      font-size: ${subheadlineFontSize}px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Arial, sans-serif;
      font-weight: normal;
      color: #ffffff;
      font-variant: small-caps;
      text-align: right;
    ">Sub-heading</div>

  <div style="position: absolute; background-color: rgba(255, 255, 255, 0.4); right: ${logoBarRight}px; top: 0; width: ${logoBarWidth}px; height: ${logoBarHeight}px;"></div>
  <img
    data-type="logo"
    width="${logoWidth}"
    height="${logoHeight}"
    src="https://placehold.co/${logoWidth}x${logoHeight}/f8d7da/dc3545"
    style="position: absolute; right: ${logoRight}px; top: ${logoTop}px; object-fit: contain;"
  />
</div>`;
};

export default poster2Template;
