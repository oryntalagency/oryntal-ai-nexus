lines = open('src/data/packages.ts', encoding='utf-8').readlines()
healthcare = '''  {
    slug: "healthcare-wellness",
    nicheName: "Healthcare & Wellness",
    tagline: "Care That Feels Personal, Admin That Feels Invisible",
    icon: "heart-pulse",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
'''
new_lines = lines[:914] + [healthcare] + lines[917:]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(new_lines)
print('ok')
