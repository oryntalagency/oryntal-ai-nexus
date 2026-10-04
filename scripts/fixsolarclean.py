lines = open('src/data/packages.ts', encoding='utf-8').readlines()
new_block = [
  '  {\n',
  '    slug: "solar-energy",\n',
  '    nicheName: "Solar Energy",\n',
  '    tagline: "From First Click to Installed Panels, On Autopilot",\n',
  '    icon: "sun",\n',
  '    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],\n',
  '  },\n'
]
lines[698:705] = new_block
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
