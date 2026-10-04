lines = open('src/data/packages.ts', encoding='utf-8').readlines()
lines[704] = '  },\n'
lines.insert(705, '  {\n')
open('src/data/packages.ts', 'w', encoding='utf-8').writelines(lines)
print('ok')
