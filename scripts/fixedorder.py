lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[705] = '    slug: "edtech",\n'
lines[706] = '    nicheName: "EdTech",\n'
lines[707] = '    tagline: "Learning That Adapts to Every Student, Not the Other Way Around",\n'
lines[708] = '    icon: "graduation-cap",\n'
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
