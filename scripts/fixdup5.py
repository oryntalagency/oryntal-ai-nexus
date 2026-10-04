lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[705] = '    slug: "edtech",\n'
lines[706] = '    nicheName: "EdTech",\n'
del lines[707]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
