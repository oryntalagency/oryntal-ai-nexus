lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines.insert(705, '    slug: "edtech",\n')
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
