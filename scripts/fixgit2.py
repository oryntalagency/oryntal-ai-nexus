lines = open('src/data/packages.ts', encoding='utf-8').readlines()
del lines[703]
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
