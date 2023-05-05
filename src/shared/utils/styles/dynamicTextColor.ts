function getRGB(c: any): number {
    return parseInt(c, 16) || c;
}

function getsRGB(c: string): number {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}

function getLuminance(hexColor: string): number {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  )
}

function getContrast(f: string, b: string): number {
  const L1 = getLuminance(f)
  const L2 = getLuminance(b)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

export function getTextColor(color: string) {
  color = color[0] === '#' ? color : `#${color}`;

  const whiteContrast = getContrast(color, '#ffffff')
  const blackContrast = getContrast(color, '#000000')

  return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}