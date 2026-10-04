lines = open('src/data/packages.ts', encoding='utf-8').readlines()
new_block = ['  },\n', '  {\n', '    slug: "edtech",\n', '    nicheName: "EdTech",\n', '    tagline: "Learning That Adapts to Every Student, Not the Other Way Around",\n', '    icon: "graduation-cap",\n', '    tiers: [\n']
lines[704:711] = new_block
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
