lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[697] = '  },\n'
lines.insert(698, '  {\n')
lines[699] = '    slug: "solar-energy",\n'
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
