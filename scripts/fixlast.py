lines = open('src/data/packages.ts', encoding='utf-8').readlines()
# fix structure
lines[696] = '  },\n'
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
