lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[705], lines[706] = lines[706], lines[705]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
